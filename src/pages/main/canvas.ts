import { queryParam } from "../../router/queryParam";
import { paramNames, years, GraphType, graphTypes } from "./constants";


function validateYear(year: string | null) {
  if (!year) return false;
  if (!/^[12]\d{3}$/.test(year)) return false;

  const intYear = parseInt(year);
  if (intYear < years.MIN) return false;
  if (intYear > years.MAX) return false;

  return true;
}

function getGraphType(): GraphType {
  const defaultValue = 'temperature';
  const paramValue = queryParam(paramNames.GRAPH).get();
  if (!paramValue) return defaultValue;

  return graphTypes.find((validKey) => validKey === paramValue) || defaultValue;
}

function render(elem: HTMLElement) {
  let from = queryParam(paramNames.FROM).get();
  if (!validateYear(from)) {
    from = years.MIN.toString();
  }
  let to = queryParam(paramNames.TO).get();
  if (!validateYear(to)) {
    to = years.MAX.toString();
  }
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
    .forEach(paramName => queryParam(paramName).onChange(() => render(elem)));
}
