import { queryParam } from "../../common/queryParam";
import { paramNames } from "./constants";
import { getYearFrom, getYearTo, getGraphType } from "./state";
import { addOnMountCb } from "../../common/onUnmount";
import GraphWorker from "../../web-workers/graphWorker?worker"
import { mainPath } from "./index";
import { createMildTerminatedWorker } from "../../common/createMildTerminatedWorker";
import { Record } from "../../services/commonServiceFactory";

let graphWorker = createMildTerminatedWorker(GraphWorker);

type PaintPayload = {
  records: Record;
  min: number; // min value
  max: number; // max value
}
const paint = (canvas: HTMLCanvasElement, {records, min, max}: PaintPayload) => {
  console.log('paint', canvas, records, min, max);
}

export const initCanvas = (id: string) => {
  const elem = document.getElementById(id)!;
  elem.attributes.removeNamedItem('id');

  elem.innerHTML = `
    <canvas></canvas>
    <div class="status">
        Loading
    </div>
  `;

  const canvasElem = elem.querySelector('canvas')!;
  const statusElem = elem.querySelector('.status')!;

  function requestData() {
    if (window.location.pathname !== mainPath) return;

    statusElem.innerHTML = "Loading...";

    const from = getYearFrom();
    const to = getYearTo();
    const graph = getGraphType();

    graphWorker.terminate();
    // я хотел менять from и to местами если from > to (так как это был бы хороший UX)
    // но решил оставить так, чтобы был способ легко генерировать и обрабатывать ошибку
    graphWorker.postMessage({from, to, graph});
  }

  requestData();
  Object.values(paramNames)
    .forEach(paramName => {
      const clearCb = queryParam(paramName).onChange(requestData);

      addOnMountCb(elem, () => clearCb());
    });

  graphWorker.onmessage = (e) => {
    const {error, records, min, max} = e.data;

    if (error) {
      statusElem.innerHTML = `Error: ${error}`;
    } else {
      statusElem.innerHTML = "";
      paint(canvasElem, {records, min, max});
    }
  }
}
