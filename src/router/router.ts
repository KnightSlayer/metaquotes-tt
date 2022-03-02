import { renderMainLayout } from "../layouts/mainLayout";
import { renderMain, mainPath } from "../pages/index";
import { renderAbout, aboutPath } from "../pages/about";
import { render404 } from "../pages/404";
import { history } from "./history";

export const renderRouter = (elem: HTMLElement) => {
  reredner(elem);

  return history.subscribe(() => reredner(elem));
}

const pathPageMap = {
  [mainPath]: renderMain,
  [aboutPath]: renderAbout,
}

const reredner = (elem: HTMLElement) => {
  // @ts-ignore
  const renderMain = pathPageMap[window.location.pathname] || render404;

  renderMainLayout(elem, {
    main: renderMain,
  });
}
