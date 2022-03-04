import { commonServiceFactory } from "./commonServiceFactory";
import { graphTypes } from "../pages/main/constants";
import precipitation from '../server/precipitation.json'

export const precipitationService = commonServiceFactory({
  entityName: graphTypes.PRECIPITATION,
  fetcher: () => new Promise(r => setTimeout(() => r(precipitation), 500)),
});
