import type { SortOrderType } from '../types';

export const reverseObject = (obj: Record<string, any>): Record<string, any> => {
  let new_obj: Record<string, any> = {};
  let rev_obj: Array<string> = Object.keys(obj).reverse();
  rev_obj.forEach(function (i: string) {
    new_obj[i] = obj[i];
  });
  return new_obj;
};

export const ascendingObjectSort = (list: Record<string, any>): Record<string, any> =>
  Object.keys(list)
    .sort((a, b) => (list[a] > list[b] ? 1 : -1))
    .reduce((a: any, b: any) => {
      a[b] = list[b];
      return a;
    }, {});

export const sortObject = (order: SortOrderType, list: Record<string, any>): Record<string, any> => {
  const listAscendingOrder: Record<string, any> = ascendingObjectSort(list);
  if (order === 'asc') {
    return listAscendingOrder;
  } else {
    return reverseObject(listAscendingOrder);
  }
};
