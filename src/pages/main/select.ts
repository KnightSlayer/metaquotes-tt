import { years } from "./constants";
import { getYearTo } from "./state";
import { queryParam } from "../../common/queryParam";
import { addOnMountCb } from "../../common/onUnmount";



type Props = {
  onChange: (v: string) => void,
  sync: ReturnType<typeof queryParam>['sync'],
}

export const initSelect = (id: string, {sync, onChange}: Props) => {
  const elem = document.getElementById(id)! as HTMLSelectElement;
  elem.attributes.removeNamedItem('id');

  for (let i = years.MIN; i <= years.MAX; i++)  {
    const option = document.createElement('option');
    option.innerHTML = i.toString();
    option.value = i.toString();
    elem.append(option);
  }

  const clearCb = sync((newValue) => {
    elem.value = getYearTo(newValue);
  });
  addOnMountCb(elem, clearCb);

  elem.onchange = (e) => {
    const target = e.target as HTMLSelectElement;
    onChange(target.value);
  }
}
