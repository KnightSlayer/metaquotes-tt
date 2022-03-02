import { queryParam } from "../../router/queryParam";
import { paramNames } from "./constants";
import { getYearFrom, getYearTo, getGraphType } from "./state";

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

  // todo: clear somewhere
  Object.values(paramNames)
    .forEach(paramName => queryParam(paramName).onChange(() => render(elem)));
}
