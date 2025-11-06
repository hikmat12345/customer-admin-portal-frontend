import type { DropDownDataType, DropDownItemType, StateDataType } from '../components';

export const dropDownData = (itemData: DropDownItemType): Array<DropDownDataType> =>
  Object.keys(itemData).map((key: string, index: number) => {
    return { key: index, label: itemData[key], value: key };
  });

export const USAddressDropDownData = (itemData: Array<string>): Array<StateDataType> =>
  itemData?.map((value: string, index: number) => {
    return { key: index, value };
  });
