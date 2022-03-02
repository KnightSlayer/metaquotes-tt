export const renderMain = (elem: HTMLElement) => {
  elem.innerHTML = `
    <h2>Архив метеослужбы</h2>

    <div>
      <div>
        <button> Температура </button>
        <button> Осадки </button>
      </div>

      <div>
        <div>
          <select></select>
          <select></select>
        </div>

        <canvas></canvas>
      </div>
    </div>
  `
}

export const mainPath = '/';
