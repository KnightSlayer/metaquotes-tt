import { history } from "./history";

function getValue(paramName: string) {
  const urlObj = new URL(document.location.href);

  return urlObj.searchParams.get(paramName);
}

export const queryParam = (paramName: string) => ({
  get: () => getValue(paramName),
  set(value: string) {
    const urlObj = new URL(document.location.href);

    urlObj.searchParams.set(paramName, value);

    history.push(urlObj.href);
  },
  onChange(cb: Function) {
    let previousValue = getValue(paramName);

    return history.subscribe(() => {
      const newValue = getValue(paramName);

      if (newValue === previousValue) return;

      previousValue = newValue;
      cb(newValue);
    });
  },
})
