export const dropDownData = (itemData: any): Array<any> =>
  Object.keys(itemData).map((key: string, index: number) => {
    return { key: index, label: itemData[key], value: key };
  });

export const USAddressDropDownData = (itemData: Array<string>): Array<any> =>
  itemData?.map((value: string, index: number) => {
    return { key: index, value };
  });

export const MONTH_DAY_AND_YEAR = 'PPP'; // date format : June 5th, 2024
