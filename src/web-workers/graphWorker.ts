import { graphTypes, GraphType, possibleSteps, MIN_SEGMENT_HEIGHT, CANVAS_HEIGHT, BOTTOM_INDENTATION, TOP_INDENTATION } from "../pages/main/constants";
import { temperatureService } from "../services/temperatureService";
import { precipitationService } from "../services/precipitationService";
import { commonServiceFactory, Record } from "../services/commonServiceFactory";


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

const getYData = (records: Array<Record>) => {
  const values = records.map((r: {v: number}) => r.v);
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
  });

  // @ts-ignore
  return { bottom, top, step, gap: drawHeight / segmentsCount };
}

onmessage = async function(e) {
  const { from, to, graph }: MessagePayload = e.data;

  try {
    const service = serviceMap[graph];
    const records = await service.get({from, to});
    const y = getYData(records);

    postMessage({records, y});
  } catch (e) {
    console.log('error', e);
    postMessage({error: "Failed to get data"});
  }
}
