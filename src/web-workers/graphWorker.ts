import { graphTypes, GraphType } from "../pages/main/constants";
import { temperatureService } from "../services/temperatureService";
import { precipitationService } from "../services/precipitationService";
import { commonServiceFactory } from "../services/commonServiceFactory";


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

onmessage = async function(e) {
  const { from, to, graph }: MessagePayload = e.data;

  try {
    const service = serviceMap[graph];
    const records = await service.get({from, to});
    const values = records.map((r: {v: number}) => r.v);
    const min = Math.min(...values);
    const max = Math.max(...values);

    postMessage({records, from, to, min, max});
  } catch (e) {
    console.log('error', e);
    postMessage({error: "Failed to get data"});
  }
}
