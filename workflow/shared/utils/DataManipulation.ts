import _ from 'lodash';
import moment from 'moment';

import type { WorkflowDataType } from '../types';

export type UpdateComponentDataType = {
  groups: Record<string, Array<WorkflowDataType>>;
  componentHideList: Array<WorkflowDataType>;
  defaultRefreshList: Array<WorkflowDataType>;
  groupKeys: string[];
};

function groupBy(list: UpdateComponentListType, key: string): UpdateComponentDataType {
  const sortByGroup: Array<WorkflowDataType> = _.sortBy(list.componentList, [
    function (item: WorkflowDataType) {
      return item.group;
    }
  ]);
  const groups: Record<string, Array<WorkflowDataType>> = sortByGroup.reduce<Record<string, Array<WorkflowDataType>>>(
    function (rv: Record<string, Array<WorkflowDataType>>, x: WorkflowDataType) {
      //@ts-ignore
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    },
    {}
  );

  const groupKeys: string[] = Object.keys(groups);
  groupKeys.forEach((group) => {
    groups[group] = _.sortBy(groups[group], [
      function (item: WorkflowDataType) {
        return Number(item.order);
      }
    ]);
  });
  return { groups, groupKeys, componentHideList: list.componentHideList, defaultRefreshList: list.defaultRefreshList };
}

export type UpdateComponentListType = {
  componentList: Array<WorkflowDataType>;
  componentHideList: Array<WorkflowDataType>;
  defaultRefreshList: Array<WorkflowDataType>;
};

function refreshOnWithDefaultValue(comList: Array<WorkflowDataType>): UpdateComponentListType {
  const componentList: Array<WorkflowDataType> = [];
  const componentHideList: Array<WorkflowDataType> = [];
  const defaultRefreshList: Array<WorkflowDataType> = [];
  _.forEach(comList, (item: WorkflowDataType) => {
    const refreshOn: string[] = _.get(item, 'refreshOn', []);
    const defaultValue: string = _.get(item, 'defaultValue', '');
    const parentType: string = _.get(item, 'type', '');

    if (!_.isEmpty(refreshOn) && !_.isEmpty(defaultValue)) {
      if (_.isEqual(parentType.toLocaleLowerCase(), 'none')) {
        componentHideList.push(item);
      } else {
        componentList.push(item);
        defaultRefreshList.push(item);
      }
    } else {
      componentList.push(item);
    }
  });

  return { componentList, componentHideList, defaultRefreshList };
}

function changeResponse(componentData: Array<WorkflowDataType>): UpdateComponentDataType {
  const componentList = _.cloneDeep(componentData).map((item) => ({ ...item, refreshOn: [] }));
  _.forEach(componentData, (item: WorkflowDataType) => {
    const refreshOn: string[] = _.get(item, 'refreshOn', []);
    _.forEach(refreshOn, (refreshId: string) => {
      const index: number = _.findIndex(componentData, (refreshItem: WorkflowDataType) =>
        _.isEqual(refreshItem.id, refreshId)
      );
      if (index !== -1) {
        const matchItem: WorkflowDataType = componentList[index];
        //@ts-ignore
        componentList[index] = { ...matchItem, refreshOn: [...matchItem.refreshOn, item.id] };
      }
    });
  });
  const list = refreshOnWithDefaultValue(componentList);
  return groupBy(list, 'group');
}

export function updateComponentData(
  data?: Record<string, any>,
  prevData?: Record<string, any>
): UpdateComponentDataType {
  if (!_.isEmpty(data) && (prevData === undefined || prevData === null)) {
    const localData = data || {};
    const componentData: Array<WorkflowDataType> = [];
    for (const [key, value] of Object.entries(localData)) {
      componentData.push({ id: key, ...value });
    }
    return changeResponse(componentData);
  } else if (!_.isEmpty(data) && !_.isEqual(prevData, data)) {
    const localData = data || {};
    const componentData: Array<WorkflowDataType> = [];
    for (const [key, value] of Object.entries(localData)) {
      componentData.push({ id: key, ...value });
    }
    return changeResponse(componentData);
  }
  return { groups: {}, componentHideList: [], defaultRefreshList: [], groupKeys: [] };
}

export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

export function isNotNullOrEmpty(text?: any): boolean {
  return !isNullOrUndefined(text) && text !== '' && !_.isEmpty(text);
}

export function defaultDate(defaultValue: string | undefined): Date {
  return moment(defaultValue === '' ? new Date() : defaultValue).toDate();
}
