import { queryParam } from "../../common/queryParam";
import { graphTypes, paramNames, CANVAS_WIDTH, CANVAS_HEIGHT, LEFT_INDENTATION, RIGHT_INDENTATION } from "./constants";
import { getYearFrom, getYearTo, getGraphType } from "./state";
import { addOnMountCb } from "../../common/onUnmount";
import GraphWorker from "../../web-workers/graphWorker?worker"
import { mainPath } from "./index";
import { createMildTerminatedWorker } from "../../common/createMildTerminatedWorker";
import { GraphData } from "../../web-workers/graphWorker";

let graphWorker = createMildTerminatedWorker(GraphWorker);

const labelSuffix = {
  [graphTypes.TEMPERATURE]: '°C',
  [graphTypes.PRECIPITATION]: 'мм',
}

type PaintOptions = {
  yLabel?: (v:string) => string
}

const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#FFFFFA";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

const paintGrid = (ctx: CanvasRenderingContext2D, payload: GraphData, options: PaintOptions) => {
  ctx.strokeStyle = '#CCCCCA';
  ctx.lineWidth = 0.5;
  ctx.fillStyle = "black";
  ctx.font = "14px sans";
  ctx.textAlign = "right"
  ctx.textBaseline = 'middle';

  const yLabel = options.yLabel || (v => v);
  payload.y.forEach(({ value, label}) => {
    ctx.fillText(yLabel(label), LEFT_INDENTATION - 5, value);

    ctx.beginPath();
    ctx.moveTo(LEFT_INDENTATION, value);
    ctx.lineTo(CANVAS_WIDTH - RIGHT_INDENTATION, value);
    ctx.stroke();
  });
}

const paintAxes = () => {
  // do I really need it?
}

const paintGraph = (ctx: CanvasRenderingContext2D, payload: GraphData) => {
  const { data } = payload;

  ctx.beginPath();
  ctx.strokeStyle = 'green';
  ctx.moveTo(data[0].x, data[0].y);
  for (let i = 1; i < data.length; i++) {
    ctx.lineTo(data[i].x, data[i].y);
  }
  ctx.stroke();
}

const paint = (canvas: HTMLCanvasElement, payload: GraphData, options: PaintOptions) => {
  console.log('paint payload', payload);
  const ctx = canvas.getContext('2d')!;

  clearCanvas(ctx);
  paintGrid(ctx, payload, options);
  paintAxes();
  paintGraph(ctx, payload);
}

export const initCanvas = (id: string) => {
  const elem = document.getElementById(id)!;
  elem.attributes.removeNamedItem('id');

  elem.innerHTML = `
    <canvas style="border: 1px solid #777; width: ${CANVAS_WIDTH}px; height: ${CANVAS_HEIGHT}px;">
        Ваш браузер не поддерживает canvas
    </canvas>
    <div class="status">
        Loading...
    </div>
  `;

  const canvasElem = elem.querySelector('canvas')!;
  const statusElem = elem.querySelector('.status')!;
  // use devicePixelRatio to fix blurry effect on retina
  canvasElem.width = CANVAS_WIDTH * window.devicePixelRatio;
  canvasElem.height = CANVAS_HEIGHT * window.devicePixelRatio;
  canvasElem.getContext('2d')?.scale(window.devicePixelRatio, window.devicePixelRatio);

  function requestData() {
    if (window.location.pathname !== mainPath) return;

    statusElem.innerHTML = "Loading...";

    const from = getYearFrom();
    const to = getYearTo();
    const graph = getGraphType();

    graphWorker.terminate();
    // я хотел менять from и to местами если from > to (так как это был бы хороший UX)
    // но решил оставить так, чтобы был способ легко генерировать и обрабатывать ошибку
    graphWorker.postMessage({from, to, graph});
  }

  requestData();
  Object.values(paramNames)
    .forEach(paramName => {
      const clearCb = queryParam(paramName).onChange(requestData);

      addOnMountCb(elem, () => clearCb());
    });

  graphWorker.onmessage = (e) => {
    const {error, ...payload} = e.data;

    if (error) {
      statusElem.innerHTML = `Error: ${error}`;
    } else {
      statusElem.innerHTML = "";
      paint(canvasElem, payload, {yLabel: (v) => v + labelSuffix[getGraphType()]});
    }
  }
}
