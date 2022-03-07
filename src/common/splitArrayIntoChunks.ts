export const splitArrayIntoChunks = <T>(array: Array<T>, chunkSize: number) => {
  return array.reduce((resultArray: Array<Array<T>>, item, index) => {
    const chunkIndex = Math.floor(index/chunkSize)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray
  }, []);
}
