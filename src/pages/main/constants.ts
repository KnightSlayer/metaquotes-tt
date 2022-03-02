export const graphTypes = ['precipitation', 'temperature'] as const;
export type GraphType = typeof graphTypes[number];

export const paramNames = Object.freeze({
  FROM: 'from',
  TO: 'to',
  GRAPH: 'graph',
});

export const years = Object.freeze({
  MIN: 1881,
  MAX: 2006,
});
