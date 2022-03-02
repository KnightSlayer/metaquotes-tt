import { GraphType, paramNames } from "./constants";
import { queryParam } from "../../router/queryParam";

export const initButton = (id: string, graph: GraphType ) => {
  const button = document.getElementById(id)!;
  button.attributes.removeNamedItem('id');
  button.onclick = () => queryParam(paramNames.GRAPH).set(graph);
}
