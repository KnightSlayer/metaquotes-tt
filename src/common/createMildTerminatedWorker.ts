// return object with same signature as worker instance
// the difference is that after termination a new instance will be created
export const createMildTerminatedWorker = (RegularWorker: any) => {
  let worker = new RegularWorker();

  return {
    postMessage: (...args: Array<any>) => worker.postMessage(...args),
    set onmessage(cb: ({data}: {data: any}) => void) {
      worker.onmessage = cb;
    },
    terminate: () => {
      const onMessage = worker.onmessage;
      worker.terminate();
      worker = new RegularWorker();
      worker.onmessage = onMessage;
    },
  };
}
