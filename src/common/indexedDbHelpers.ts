import { GraphType, graphTypes } from "../pages/main/constants";

const DB_NAME = "metaquotes-tt";

type DataType = {
  [key in GraphType]: {
    store: any,
    status: 'unknown' | 'new' | 'in_progress' | 'ready',
  }
}
const data: DataType = {
  [graphTypes.TEMPERATURE]: {
    store: null,
    status: 'unknown',
  },
  [graphTypes.PRECIPITATION]: {
    store: null,
    status: 'unknown',
  },
}
let dbPromise: Promise<IDBDatabase> | null;
export const getDb = async (): Promise<IDBDatabase> => {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onupgradeneeded = (event: any) => {
        const db: IDBDatabase = event.target.result;

        db
          .createObjectStore(graphTypes.TEMPERATURE, {keyPath: "t"})
          // .createIndex('date_idx', 't');

        db
          .createObjectStore(graphTypes.PRECIPITATION, {keyPath: "t"})
          // .createIndex('date_idx', 't');

        data.temperature.status = 'new';
        data.precipitation.status = 'new';
      };

      request.onerror = (event) => {
        alert("This application need access to IndexedDB. Why didn't you allow the web app to use IndexedDB?!");
        reject(event);
        dbPromise = null;
      }

      request.onsuccess = (event: any) => {
        const db: IDBDatabase = event.target.result;

        db.onversionchange = function () {
          db.close();
          alert("The database is out of date, please reload the page.")
        };
        db.onerror = (event: any) => {
          // Generic error handler for all errors targeted at this database's requests
          console.error("Database error: " + event.target.errorCode);
        };

        resolve(db);
      };
    })
  }

  return dbPromise;
}

const setStoreStatus = async (storeName: GraphType) => {
  const db = await getDb();

  const transaction = db.transaction(storeName);
  const store = transaction.objectStore(storeName);
  const entry = await new Promise(resolve => {
    const request = store.get('1881-01-01');
    request.onerror = () => resolve(null);
    request.onsuccess = () => resolve(request.result);
  })

  data[storeName].status = entry ? 'ready' : 'new';
}

type IsStoreEmptyArg = {storeName: GraphType};
export const isStoreEmpty = async ({storeName}: IsStoreEmptyArg): Promise<boolean> => {
  if (data[storeName].status === 'unknown') {
    await setStoreStatus(storeName);
  }
  return data[storeName].status !== 'ready';
}

type AddEntriesArg = IsStoreEmptyArg & {entities: Array<unknown>};
export const addEntries = async ({storeName, entities}: AddEntriesArg) => {
  if (data[storeName].status !== 'new') return;

  const db = await getDb();
  data[storeName].status = 'in_progress';
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  entities.forEach(entity => store.add(entity));

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      data[storeName].status = 'ready';
      resolve(null);
    };
    transaction.onerror = (err: any) => {
      data[storeName].status = 'new';
      reject(err);
    };
  })
}

type GetRangeArg = IsStoreEmptyArg & {from: string, to: string};
export const getRange = async ({storeName, from, to}: GetRangeArg) => {
  const db = await getDb();
  const transaction = db.transaction(storeName);
  const store = transaction.objectStore(storeName);
  const request =store.getAll(IDBKeyRange.bound(from, (1 + +to).toString(), true, true));
  await new Promise((resolve, reject) => {
    transaction.oncomplete = resolve;
    transaction.onerror = reject;
  });
  return request.result;
}
