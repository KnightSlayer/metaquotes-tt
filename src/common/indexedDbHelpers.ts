import { graphTypes } from "../pages/main/constants";

const DB_NAME = "metaquotes-tt";

let db: any;
export const getDb = async (): Promise<any> => {
  const request = indexedDB.open(DB_NAME, 1);

  request.onupgradeneeded = (event: any) => {
    const db = event.target.result;

    db
      .createObjectStore(graphTypes.TEMPERATURE, { keyPath: "t" })
      // .createIndex('date_idx', 't');

    db
      .createObjectStore(graphTypes.PRECIPITATION, { keyPath: "t" })
      // .createIndex('date_idx', 't');
  };

  return new Promise((resolve, reject) => {
    if (db) resolve(db);

    request.onerror = (event) => {
      alert("This application need access to IndexedDB. Why didn't you allow the web app to use IndexedDB?!");
      reject(event);
    }

    request.onsuccess = (event: any) => {
      db = event.target.result;

      db.onversionchange = function () {
        db.close();
        alert("The database is out of date, please reload the page.")
      };
      db.onerror = (event: any) => {
        // Generic error handler for all errors targeted at this database's requests!
        console.error("Database error: " + event.target.errorCode);
      };

      resolve(db);
    };
  })
}

type IsStoreEmptyArg = {db: any, storeName: string};
export const isStoreEmpty = async ({db, storeName}: IsStoreEmptyArg): Promise<boolean> => {
  const transaction = db.transaction(storeName);
  const store = transaction.objectStore(storeName);
  const entry = await new Promise(resolve => {
    const request = store.get('1881-01-01');
    request.onerror = () => resolve(null);
    request.onsuccess = () => resolve(request.result);
  })

  return !entry;
}

type AddEntriesArg = IsStoreEmptyArg & {entities: Array<unknown>};
export const addEntries = ({db, storeName, entities}: AddEntriesArg) => {
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  entities.forEach(entity => store.add(entity));

  return new Promise((resolve, reject) => {
    transaction.oncomplete = resolve;
    transaction.onerror = reject;
  })
}

type GetRangeArg = IsStoreEmptyArg & {from: string, to: string};
export const getRange = async ({db, storeName, from, to}: GetRangeArg) => {
  const transaction = db.transaction(storeName);
  const store = transaction.objectStore(storeName);
  const request =store.getAll(IDBKeyRange.bound(from, (1 + +to).toString(), true, true));
  await new Promise((resolve, reject) => {
    transaction.oncomplete = resolve;
    transaction.onerror = reject;
  });
  return request.result;
}
