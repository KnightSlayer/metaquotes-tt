import {
  graphTypes,
  GraphType,
  possibleSteps,
  MIN_SEGMENT_HEIGHT,
  CANVAS_HEIGHT,
  BOTTOM_INDENTATION,
  TOP_INDENTATION,
  LEFT_INDENTATION,
  RIGHT_INDENTATION,
  CANVAS_WIDTH,
  MIN_X_STEP,
  X_THRESHOLDS_COUNT,
} from "../pages/main/constants";
import { temperatureService } from "../services/temperatureService";
import { precipitationService } from "../services/precipitationService";
import { commonServiceFactory } from "../services/commonServiceFactory";
import { splitArrayIntoChunks } from "../common/splitArrayIntoChunks";

const monthMap = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
}

type ServiceMap = {
  [key in GraphType]: ReturnType<typeof commonServiceFactory>;
};
const serviceMap: ServiceMap = {
  [graphTypes.TEMPERATURE]: temperatureService,
  [graphTypes.PRECIPITATION]: precipitationService,
}

type MessagePayload = {
  from: string;
  to: string;
  graph: GraphType;
}

type GraphDataPiece = {
  value: number,
  label: string,
  x: number,
  y: number,
}

export type GraphData = {
  data: Array<GraphDataPiece>,
  x: Array<{
    value: number,
    label: string,
  }>,
  y: Array<{
    value: number,
    label: string,
  }>,
}

// this method also mutates records by adding `y` property to each record
const getYData = (records: Array<GraphDataPiece>) => {
  const values = records.map((r) => r.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  let bottom: number;
  let top: number;
  let segmentsCount: number;


  const drawHeight = CANVAS_HEIGHT - BOTTOM_INDENTATION - TOP_INDENTATION;
  const maxSegmentsCount = drawHeight / MIN_SEGMENT_HEIGHT;
  const step = possibleSteps.find(th => {
    bottom = Math.floor(minValue / th) * th;
    top = Math.ceil(maxValue / th) * th;
    segmentsCount = (top - bottom) / th;
    return segmentsCount <= maxSegmentsCount;
  })!;

  // @ts-ignore
  const gap = drawHeight / segmentsCount;

  const pixelsInUnit = gap / step;

  records.forEach(data => {
    data.y = CANVAS_HEIGHT - BOTTOM_INDENTATION - (data.value - bottom) * pixelsInUnit;
  })

  const y: GraphData["y"] = [];
  // @ts-ignore
  let value = bottom;
  let yValue = CANVAS_HEIGHT - BOTTOM_INDENTATION;
  // @ts-ignore
  while (value <= top) {
    y.push({
      value: yValue,
      label: value.toString(),
    });
    value += step;
    yValue -= gap;
  }
  return y;
}
const getXData = (records: Array<GraphDataPiece>) => {
  const drawWidth = CANVAS_WIDTH - LEFT_INDENTATION - RIGHT_INDENTATION;

  const pixelsInUnit = drawWidth / (records.length - 1); // records.length > 1 always
  records.forEach((data, index) => {
    data.x = LEFT_INDENTATION + index * pixelsInUnit;
  });

  let xData: GraphData["x"] = [];
  for (let i = 0; i <= X_THRESHOLDS_COUNT; i++) {
    const index = Math.round(i * (records.length - 1) / X_THRESHOLDS_COUNT);
    const { x, label } = records[index];
    const [year, month] = label.split('-');


    xData.push({
      value: x,
      // @ts-ignore
      label: `${monthMap[month]} ${year}`,
    })
  }

  return xData;
}

// const findAbsMaxIndex = (arr: Array<number>): number => {
//   let index = -1;
//   let localMax = -1;
//
//   for (let i = 0; i < arr.length; i++ ) {
//     const abs = Math.abs(arr[i]);
//     if (abs > localMax) {
//       localMax = abs;
//       index = i;
//     }
//   }
//
//   return index;
// }

onmessage = async function(e) {
  const { from, to, graph }: MessagePayload = e.data;

  try {
    const service = serviceMap[graph];
    const records = await service.get({from, to});

    // из-за того, что отобразить точку на графике для каждого дня просто не хватит пикселей,
    // мне придётся убрать часть данных. я вижу несколько способов:
    // 1) из N подряд идущих дней оставить информацию только по первому
    // 2) объединять информацию из N подряд идущих дней взяв среднее арифметическое значение
    // 3) брать самое большое по модулю значение из каждой группы дней
    // 4) добавить горизонтальный скролл
    // второй вариант на первый взгляд кажется более информативным, но тогда будет
    // происходить сильное сглаживание графика, так что это наверное плохой вариант
    // я поэкспериментировал с первыми 3мя вариантами и самым правильным визуально выглядел первый
    // хотя каждый вариант со своими недостатками
    const drawWidth = CANVAS_WIDTH - LEFT_INDENTATION - RIGHT_INDENTATION;
    const maxXStepsCount = Math.floor(drawWidth / MIN_X_STEP) + 1;
    let daysInStep = 1;
    while (records.length / daysInStep > maxXStepsCount) {
      daysInStep++;
    }
    const data = splitArrayIntoChunks(records, daysInStep)
      .map(dataGroup => ({
        value: dataGroup[0].v,
        label: dataGroup[0].t,
        x: 0, // set later in getXData method
        y: 0, // set later in getYData method
      }));
    const y = getYData(data);
    const x = getXData(data);
    console.log('data', data);

    const message: GraphData = {data, y, x};

    postMessage(message);
  } catch (e) {
    console.log('error', e);
    postMessage({error: "Failed to get data"});
  }
}
