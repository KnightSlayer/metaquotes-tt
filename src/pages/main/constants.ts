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



// canvas appearance
export const possibleSteps = [1, 2, 5, 10, 15, 20, 25, 50, 100] as const;
export const MIN_SEGMENT_HEIGHT = 30;
export const CANVAS_WIDTH = 900;
export const CANVAS_HEIGHT = 450;
export const BOTTOM_INDENTATION = 40;
export const TOP_INDENTATION = 15;
export const LEFT_INDENTATION = 35;
