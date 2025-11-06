import _ from 'lodash';
import type { ReactNode } from 'react';
import { Component } from 'react';

import type { WorkflowDataType, WorkflowLayoutPropsType, WorkflowLayoutStateType } from '../../types';
import type { UpdateComponentDataType } from '../../utils';
import { updateComponentData } from '../../utils';

abstract class SuperWorkflowLayout extends Component<WorkflowLayoutPropsType, WorkflowLayoutStateType> {
  _allRefs = {};
  _handleRefreshOnAndDefaultValueTimeout?: NodeJS.Timeout = undefined;

  constructor(props: Readonly<WorkflowLayoutPropsType>) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleRefreshOn = this.handleRefreshOn.bind(this);
    this.handleRefreshOnAndDefaultValue = this.handleRefreshOnAndDefaultValue.bind(this);
    const { groups, componentHideList, defaultRefreshList, groupKeys }: UpdateComponentDataType = updateComponentData(
      props.data,
      undefined
    );
    let groupIndex: number = -1;
    if (groupKeys.length > 0) {
      groupIndex = 0;
    }
    this.state = {
      answerDataByGroup: {},
      componentHideList,
      defaultRefreshList,
      componentDataByGroup: groups,
      groupKeys,
      groupIndex,
      viewDataByGroup: {}
    };
  }

  componentDidUpdate(prevProps: Readonly<WorkflowLayoutPropsType>) {
    const { groups, componentHideList, defaultRefreshList, groupKeys }: UpdateComponentDataType = updateComponentData(
      this.props.data,
      prevProps.data
    );
    if (!_.isEmpty(groups)) {
      let groupIndex: number = -1;
      if (groupKeys.length > 0) {
        groupIndex = 0;
      }
      this.setState({
        componentHideList,
        defaultRefreshList,
        componentDataByGroup: groups,
        groupKeys: groupKeys,
        groupIndex: this.state.groupIndex === -1 ? groupIndex : this.state.groupIndex
      });
    }
  }

  public abstract renderComponent(type: string, props: any): ReactNode | null;

  public renderAllComponent() {
    this._allRefs = {};
    const { workflowId, token } = this.props;
    const { answerDataByGroup, componentDataByGroup, groupKeys, groupIndex } = this.state || {
      answerDataByGroup: {},
      componentDataByGroup: {},
      groupKeys: [],
      groupIndex: -1
    };
    if (!_.isEmpty(componentDataByGroup) && !_.isEmpty(groupKeys) && groupIndex !== -1) {
      const currentGroupKey: string = groupKeys[groupIndex];
      const answer: Record<string, any> = _.get(answerDataByGroup, currentGroupKey) ?? {};

      const componentList = _.filter(
        _.map(_.get(componentDataByGroup, currentGroupKey), (element: WorkflowDataType) => {
          const propsValue = {
            key: element.id,
            // @ts-ignore
            ref: (ref) => (this._allRefs[element.id] = ref),
            ...element,
            workflowId,
            token,
            answer: _.get(answer, element.id),
            handleRefreshOn: this.handleRefreshOn
          };
          return this.renderComponent(element.type, propsValue);
        }),
        (com) => com !== null
      );

      if (this._handleRefreshOnAndDefaultValueTimeout) {
        clearTimeout(this._handleRefreshOnAndDefaultValueTimeout);
      }
      this._handleRefreshOnAndDefaultValueTimeout = setTimeout(this.handleRefreshOnAndDefaultValue, 700);

      return componentList;
    }
    return null;
  }

  public refreshOn(values?: Record<string, any>, id?: string): void {
    if (_.isEmpty(id)) {
      _.forEach(this._allRefs, (value, _key) => {
        // @ts-ignore
        value?.refreshOn?.(values);
      });
    } else {
      _.get(this._allRefs, id ?? '')?.refreshOn?.(values);
    }
  }

  public isValidate(id?: string): boolean {
    // TODO: Set false after resolved vector issue.
    const fallback: boolean = true;
    if (_.isEmpty(id)) {
      const length = Object.keys(this._allRefs).length;
      // @ts-ignore
      return length > 0 ? _.every(this._allRefs, (ref) => ref?.isValidate?.() ?? fallback) : fallback;
    } else {
      return _.get(this._allRefs, id ?? '')?.isValidate?.() ?? fallback;
    }
  }

  public setValue(values: Record<string, any>, id?: string): void {
    if (_.isEmpty(id)) {
      _.forEach(this._allRefs, (value, _key) => {
        // @ts-ignore
        value?.setValue?.(values);
      });
    } else {
      _.get(this._allRefs, id ?? '')?.setValue?.(values);
    }
  }

  public getValue(id?: string): Record<string, any> {
    if (_.isEmpty(id)) {
      // @ts-ignore
      let values: Record<string, any> = {};
      _.forEach(this._allRefs, (value, _key) => {
        // @ts-ignore
        values = Object.assign({}, values, value?.getValue?.() ?? {});
      });
      return values;
    } else {
      return _.get(this._allRefs, id ?? '')?.getValue?.() ?? {};
    }
  }

  public getViewData(id?: string): Record<string, any> {
    if (_.isEmpty(id)) {
      // @ts-ignore
      let values: Record<string, any> = {};
      _.forEach(this._allRefs, (value, _key) => {
        // @ts-ignore
        values = Object.assign({}, values, value?.getViewData?.() ?? {});
      });
      return values;
    } else {
      return _.get(this._allRefs, id ?? '')?.getViewData?.() ?? {};
    }
  }

  public isModalOpen(id?: string): boolean {
    // TODO: Set false after resolved vector issue.
    const fallback: boolean = false;
    if (_.isEmpty(id)) {
      let flag = fallback;
      if (Object.keys(this._allRefs).length > 0) {
        for (const [, value] of Object.entries(this._allRefs)) {
          // @ts-ignore
          if (value?.isModalOpen?.() ?? fallback) {
            flag = true;
            break;
          }
        }
      }
      return flag;
    } else {
      return _.get(this._allRefs, id ?? '')?.isModalOpen?.() ?? fallback;
    }
  }

  public canGoBack(): boolean {
    if (!this.isModalOpen()) {
      const { groupIndex } = this.state;
      if (groupIndex > 0) {
        this.handlePrevious();
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  public handleNext() {
    if (this.isValidate()) {
      const { groupKeys, groupIndex, answerDataByGroup, viewDataByGroup } = this.state;
      const currentGroupKey: string = groupKeys[groupIndex];
      const answerData: Record<string, any> = this.getValue();
      const viewData: Record<string, any> = this.getViewData();
      if (groupIndex + 1 < groupKeys.length) {
        this.setState({
          groupIndex: groupIndex + 1,
          answerDataByGroup: Object.assign(answerDataByGroup, {
            [currentGroupKey]: answerData
          }),
          viewDataByGroup: Object.assign(viewDataByGroup, {
            [currentGroupKey]: viewData
          })
        });
      } else {
        const { onSubmitted } = this.props;
        const { componentHideList } = this.state;
        const finalAnswerData: Record<string, Record<string, any>> = Object.assign(answerDataByGroup, {
          [currentGroupKey]: answerData
        });
        const finalViewDataByGroup: Record<string, Record<string, any>> = Object.assign(viewDataByGroup, {
          [currentGroupKey]: viewData
        });
        // @ts-ignore
        let values: Record<string, any> = {};
        _.forEach(finalAnswerData, (value, _key) => {
          // @ts-ignore
          values = Object.assign({}, values, value);
        });

        let finalViewData: Record<string, any> = {};
        _.forEach(finalViewDataByGroup, (value, _key) => {
          // @ts-ignore
          finalViewData = Object.assign({}, finalViewData, value);
        });

        _.forEach(componentHideList, (item: WorkflowDataType) => {
          values = Object.assign({}, values, { [item.id]: item.defaultValue });
          finalViewData = Object.assign({}, values, { [item.id]: { title: item.id, displayValue: item.defaultValue } });
        });
        onSubmitted?.(values, finalViewData);
      }
    }
  }

  public handlePrevious() {
    const { groupKeys, groupIndex, answerDataByGroup } = this.state;
    if (groupIndex > 0) {
      const currentGroupKey: string = groupKeys[groupIndex];
      const answerData: Record<string, any> = this.getValue();

      this.setState({
        groupIndex: groupIndex - 1,
        answerDataByGroup: Object.assign(answerDataByGroup, {
          [currentGroupKey]: answerData
        })
      });
    }
  }

  private handleRefreshOn(refreshOn: Array<string>, values?: Record<string, any>) {
    refreshOn.forEach((id: string) => {
      this.refreshOn(values, id);
    });
  }

  private handleRefreshOnAndDefaultValue() {
    const { componentHideList, defaultRefreshList } = this.state;
    _.forEach([...componentHideList, ...defaultRefreshList], (item: WorkflowDataType) => {
      this.handleRefreshOn(item.refreshOn, { itemId: item.id, value: item.defaultValue });
    });
  }
}

export default SuperWorkflowLayout;
