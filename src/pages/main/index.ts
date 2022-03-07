import { myUuid } from "../../utils";
import { initCanvas } from "./canvas";
import { initButton } from "./button";
import { initSelect } from "./select";
import { queryParam } from "../../common/queryParam";
import { paramNames } from "./constants";
import { getYearFrom, getYearTo } from "./state";

const canvasElemId = myUuid();
const temperatureBtnId = myUuid();
const precipitationBtnId = myUuid();
const fromSelectId = myUuid();
const toSelectId = myUuid();


export const renderMain = (elem: HTMLElement) => {
  elem.innerHTML = `
    <h2>Архив метеослужбы</h2>

    <div>
      <div>
        <button id="${temperatureBtnId}"> Температура </button>
        <button id="${precipitationBtnId}"> Осадки </button>
      </div>

      <div>
        <div>
          <select id="${fromSelectId}"></select>
          <select id="${toSelectId}"></select>
        </div>

        <div id="${canvasElemId}">

        </div>
      </div>
    </div>
  `

  initCanvas(canvasElemId);
  initButton(temperatureBtnId, 'temperature');
  initButton(precipitationBtnId, 'precipitation');
  initSelect(fromSelectId, {
    sync: (cb) => queryParam(paramNames.FROM).sync((value) => {
      return cb(getYearFrom(value))
    }),
    onChange: queryParam(paramNames.FROM).set,
  });
  initSelect(toSelectId, {
    sync: (cb) => queryParam(paramNames.TO).sync((value) => {
      return cb(getYearTo(value))
    }),
    onChange: queryParam(paramNames.TO).set,
  });
}

export const mainPath = '/';
