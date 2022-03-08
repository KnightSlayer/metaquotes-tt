import { history } from "../common/history";
import { myUuid } from "../utils";
import telegramLogo from '../telegram_logo.png';

type Render = ((elem: HTMLElement) => void) | undefined;
type SlotName = "main" | "footer";
type Slots = Partial<Record<SlotName, Render>>;

function makeSpaLinks() {
  document.querySelectorAll('a:not([target])').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;

      history.push(target.href);
    })
  })
}

export const renderMainLayout = (elem: HTMLElement, slots: Slots) => {
  const slotRenderMap: Record<SlotName, string> = {
    main: myUuid(),
    footer: myUuid(),
  }

  // Semantic HTML
  elem.innerHTML = `
    <header>
      <h1> This is Edgar Abgaryan's test task </h1>
      <nav>
        <a href="/">Главная</a>
        &nbsp;
        &nbsp;
        &nbsp;
        <a href="/about">О задаче</a>
      </nav>
    </header>

    <main id="${slotRenderMap.main}"></main>

    <footer>
      <a href="https://t.me/eabgaryan" target="_blank">
        Contact me in telegram
        <img src=${telegramLogo} alt="telegram logo" />
      </a>
      <div id="${slotRenderMap.footer}"></div>
    </footer>
  `;

  // insert slots from arguments;
  Object.entries(slotRenderMap).forEach(([slotName, elemId]) => {
    const slotElem = document.getElementById(elemId) as HTMLElement;
    slotElem.attributes.removeNamedItem('id');
    // @ts-ignore
    const render = slots[slotName] as Render;

    if (render) {
      render(slotElem);
    } else {
      slotElem.remove();
    }
  });

  // as far as we want SPA behavior, we prevent page reloading on navigation link click (if JS enabled)
  makeSpaLinks();
}
