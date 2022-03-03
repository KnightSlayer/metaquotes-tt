import { queryParam } from "../../common/queryParam";
import { paramNames } from "./constants";
import { getYearFrom, getYearTo, getGraphType } from "./state";
import { addOnMountCb } from "../../common/onUnmount";

function render(elem: HTMLElement) {
  const from = getYearFrom();
  const to = getYearTo();
  const graph = getGraphType();

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

  Object.values(paramNames)
    .forEach(paramName => {
      const clearCb = queryParam(paramName).onChange(() => render(elem));

      addOnMountCb(elem, clearCb);
    });
}
