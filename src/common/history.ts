const cbs = new Set<Function>();

const onChange = () => {
  cbs.forEach(cb => cb());
}

window.addEventListener('popstate', onChange);

export const history = {
  push(path: string) {
    window.history.pushState({}, "", path);
    onChange();
  },
  subscribe(cb: Function) {
    cbs.add(cb);

    // return unsubscribe callback function
    return () => cbs.delete(cb);
  },
}
