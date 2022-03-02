import { history } from "./history";

function getValue(paramName: string) {
  const urlObj = new URL(document.location.href);

  return urlObj.searchParams.get(paramName);
}

type Cb = (v: string | null) => void;

function onChangeValue(paramName: string, cb: Function) {
  let previousValue = getValue(paramName);

  return history.subscribe(() => {
    const newValue = getValue(paramName);

    if (newValue === previousValue) return;

    previousValue = newValue;
    cb(newValue);
  });

}

export const queryParam = (paramName: string) => ({
  get: () => getValue(paramName),
  set(value: string) {
    const urlObj = new URL(document.location.href);

    urlObj.searchParams.set(paramName, value);

    history.push(urlObj.href);
  },
  onChange: (cb: Cb) => onChangeValue(paramName, cb),
  // same as onChange but also call cb immediately with current value;
  sync: (cb: Cb) => {
    cb(getValue(paramName));
    return onChangeValue(paramName, cb);
  }
})
