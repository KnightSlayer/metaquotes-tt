import { myUuid } from "../../utils";
import { initCanvas } from "./canvas";
import { initButton } from "./button";

const canvasElemId = myUuid();
const temperatureBtnId = myUuid();
const precipitationBtnId = myUuid();


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
          <select></select>
          <select></select>
        </div>

        <div id="${canvasElemId}">

        </div>
<!--        <canvas></canvas>-->
      </div>
    </div>
  `

  initCanvas(canvasElemId);
  initButton(temperatureBtnId, 'temperature');
  initButton(precipitationBtnId, 'precipitation');
}

export const mainPath = '/';
