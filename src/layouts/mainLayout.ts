import { history } from "../router/history";
import { myUuid } from "../utils";

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
        <a href="/">Main</a>
        <a href="/about">About</a>
      </nav>
    </header>

    <main id="${slotRenderMap.main}"></main>

    <footer>
      <a href="https://t.me/eabgaryan" target="_blank"> Contact me in telegram </a>
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
