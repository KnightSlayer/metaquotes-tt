import { commonServiceFactory } from "./commonServiceFactory";
import { graphTypes } from "../pages/main/constants";
import temperature from '../server/temperature.json'

export const temperatureService = commonServiceFactory({
  entityName: graphTypes.TEMPERATURE,
  fetcher: () => new Promise(r => setTimeout(() => r(temperature), 500)),
});
