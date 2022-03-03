import './button.css'
import { GraphType, paramNames } from "./constants";
import { queryParam } from "../../common/queryParam";
import { getGraphType } from "./state";
import { addOnMountCb } from "../../common/onUnmount";

export const initButton = (id: string, graph: GraphType ) => {
  const button = document.getElementById(id)!;
  button.attributes.removeNamedItem('id');
  button.onclick = () => queryParam(paramNames.GRAPH).set(graph);
  button.classList.add('button');

  const clearCb = queryParam(paramNames.GRAPH).sync((value) => {
    if (getGraphType(value) === graph) {
      button.classList.add('--active');
    } else {
      button.classList.remove('--active');
    }
  });

  addOnMountCb(button, clearCb);
}
