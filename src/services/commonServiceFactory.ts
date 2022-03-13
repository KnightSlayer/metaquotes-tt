import { addEntries, isStoreEmpty, getRange } from "../common/indexedDbHelpers";
import { GraphType } from "../pages/main/constants";

export type Record = {
  t: string,
  v: number,
}

type Arg = {
  entityName: GraphType;
  fetcher: () => Promise<Record[]>,
}

const getRangeFromAllRecords = ({from, to, allRecords}: {from: string, to: string, allRecords: Record[]}): Record[] => {
  if (to < from) throw new Error('oops');

  const startYear = parseInt(allRecords[0].t);
  const fromInt = parseInt(from);
  const toInt = parseInt(to);
  let fromIndex = (fromInt - startYear) * 365;
  while (true) {
    if (fromIndex === 0) break;
    if (parseInt(allRecords[fromIndex].t) !== fromInt) {
      fromIndex++;
      continue;
    }
    break;
  }
  let toIndex = (toInt - startYear + 1) * 365;
  while (true) {
    if (toIndex === allRecords.length - 1) break;
    if (parseInt(allRecords[toIndex + 1].t) === toInt) {
      toIndex++;
      continue;
    }
    break;
  }

  return allRecords.slice(fromIndex, toIndex + 1);
}

export function commonServiceFactory({entityName, fetcher}: Arg) {
  return {
    async get({from, to}: {from: string, to: string}): Promise<Array<Record>> {
      const isEmpty = await isStoreEmpty({storeName: entityName});

      if (isEmpty) {
        const entities = await fetcher();
        addEntries({storeName: entityName, entities});
        return getRangeFromAllRecords({from, to, allRecords: entities});
      }

      return getRange({from, to, storeName: entityName});
    }
  }
}
