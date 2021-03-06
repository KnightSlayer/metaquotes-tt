import { renderMainLayout } from "../layouts/mainLayout";
import { renderMain, mainPath } from "../pages/main";
import { renderAbout, aboutPath } from "../pages/about";
import { render404 } from "../pages/404";
import { history } from "../common/history";
import { onUnmount } from "../common/onUnmount";

export const renderRouter = (elem: HTMLElement) => {
  reredner(elem);

  return history.subscribe(() => reredner(elem));
}

const pathPageMap = {
  [mainPath]: renderMain,
  [aboutPath]: renderAbout,
}

let previousPathname: string;
const reredner = (elem: HTMLElement) => {
  if (previousPathname === window.location.pathname) return;
  onUnmount(elem);
  previousPathname = window.location.pathname;

  // @ts-ignore
  const renderMain = pathPageMap[window.location.pathname] || render404;

  renderMainLayout(elem, {
    main: renderMain,
  });
}
