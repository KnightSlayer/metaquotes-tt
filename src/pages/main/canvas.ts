import { queryParam } from "../../common/queryParam";
import { paramNames } from "./constants";
import { getYearFrom, getYearTo, getGraphType } from "./state";
import { addOnMountCb } from "../../common/onUnmount";
import GraphWorker from "../../web-workers/graphWorker?worker"
import { mainPath } from "./index";
import { createMildTerminatedWorker } from "../../common/createMildTerminatedWorker";

let graphWorker = createMildTerminatedWorker(GraphWorker);

function render(elem: HTMLElement) {
  if (window.location.pathname !== mainPath) return;

  const from = getYearFrom();
  const to = getYearTo();
  const graph = getGraphType();

  graphWorker.terminate();
  graphWorker.postMessage({from, to, graph});

  elem.innerHTML = `
    <div> ${graph} </div>
    <div>
        From: ${from} - To: ${to}
    </div>
  `;
}

export const initCanvas = (id: string) => {
  const elem = document.getElementById(id)!;
  elem.attributes.removeNamedItem('id');

  render(elem);

  graphWorker.onmessage = (e) => {
    console.log('resp', e.data);
  }

  Object.values(paramNames)
    .forEach(paramName => {
      const clearCb = queryParam(paramName).onChange(() => render(elem));

      addOnMountCb(elem, () => clearCb());
    });
}
