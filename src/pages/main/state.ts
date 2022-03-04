import { GraphType, graphTypes, paramNames, years } from "./constants";
import { queryParam } from "../../common/queryParam";

const getYear = (year: string | null, defaultValue: string) => {
  if (!year) return defaultValue;
  if (!/^[12]\d{3}$/.test(year)) return defaultValue;

  const intYear = parseInt(year);
  if (intYear < years.MIN) return defaultValue;
  if (intYear > years.MAX) return defaultValue;

  return year;
}
export const getYearFrom = (paramValue = queryParam(paramNames.FROM).get()) => getYear(paramValue, years.MIN.toString());
export const getYearTo = (paramValue = queryParam(paramNames.TO).get()) => getYear(paramValue, years.MAX.toString());

export const getGraphType = (paramValue = queryParam(paramNames.GRAPH).get()): GraphType => {
  const defaultValue = 'temperature';
  if (!paramValue) return defaultValue;

  return Object.values(graphTypes).find((validKey) => validKey === paramValue) || defaultValue;
}
