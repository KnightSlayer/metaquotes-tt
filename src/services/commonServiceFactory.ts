import { addEntries, getDb, isStoreEmpty, getRange } from "../common/indexedDbHelpers";

export type Record = {
  t: string,
  v: number,
}

type Arg = {
  entityName: string;
  fetcher: () => Promise<Record[]>,
}

export function commonServiceFactory({entityName, fetcher}: Arg) {
  return {
    async get({from, to}: {from: string, to: string}): Promise<Array<Record>> {
      const db = await getDb();
      const isEmpty = await isStoreEmpty({db, storeName: entityName});

      if (isEmpty) {
        const entities = await fetcher();
        await addEntries({db, storeName: entityName, entities});
      }

      return await getRange({db, from, to, storeName: entityName});
    }
  }
}
