export const graphTypes = {
  PRECIPITATION: 'precipitation',
  TEMPERATURE: 'temperature',
} as const;
type Keys = keyof typeof graphTypes;
export type GraphType = typeof graphTypes[Keys];

export const paramNames = Object.freeze({
  FROM: 'from',
  TO: 'to',
  GRAPH: 'graph',
});

export const years = Object.freeze({
  MIN: 1881,
  MAX: 2006,
});
