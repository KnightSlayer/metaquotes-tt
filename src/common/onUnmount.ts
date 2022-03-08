// use symbol instead of string as property
// to avoid name collisions
const onUnmountCbs = Symbol();

type HTMLElementWithUnmountCbs = HTMLElement & {
  [onUnmountCbs]?: Array<Function>;
}

export const addOnMountCb = (elem: HTMLElementWithUnmountCbs, cb: Function) => {
  elem.dataset.onUnmount = '';
  if (!elem[onUnmountCbs]) {
    elem[onUnmountCbs] = [];
  }
  elem[onUnmountCbs]?.push(cb);
}

export const onUnmount = (elem: HTMLElement) => {
  elem.querySelectorAll<HTMLElementWithUnmountCbs>('[data-on-unmount]')
    .forEach((elem ) => elem[onUnmountCbs]?.forEach(cb => cb()))
}
