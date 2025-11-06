import _ from 'lodash';
import * as Yup from 'yup';

import { getCatalogApiCall, ServiceInfoSetTimeOutMilliseconds, Strings } from '../../../shared';
import type { WorkflowDataType } from '../../types';
import { isNotNullOrEmpty } from '../../utils';
import { SuperComponent } from '../SuperComponent';
import type { DropdownStatesType } from './SuperDropdownType';

class SuperDropdown<P extends WorkflowDataType> extends SuperComponent<P, DropdownStatesType> {
  constructor(props: P) {
    super(props);
    this.state = {
      isFocus: false,
      value: props.answer?.selectedValue ?? '',
      labelValue: props.answer?.labelValue ?? '',
      error: props.error || '',
      multiSelectValue: props.answer?.selectedValue ?? [],
      multiSelectLabelValue: props.answer?.labelValue ?? [],
      data: {}
    };
  }

  filterListData = (data: Record<string, string>) => {
    let listData: Record<string, string> = {};
    Object.keys(data).map((key: string) => {
      if (!_.isEmpty(data[key])) {
        listData = Object.assign({}, listData, { [key]: data[key] });
      }
    });
    this.setState({ data: listData });
  };

  componentDidMount(): void {
    const { answer, handleRefreshOn, refreshOn, id, token, workflowId, render, defaultValue } = this.props;
    if (refreshOn.length) {
      if (answer) {
        setTimeout(() => {
          handleRefreshOn(refreshOn, { itemId: id, value: answer?.selectedValue });
        }, ServiceInfoSetTimeOutMilliseconds);
      }
      if (refreshOn.includes(id)) {
        getCatalogApiCall({ targetBlock: id, data: { [id]: '' } }, token, workflowId).then((response: any) => {
          const { data } = response;
          if (data) {
            this.filterListData(data.items);
          }
        });
      }
    }

    if (render?.allowMultiple && !_.isEmpty(defaultValue)) {
      const defaultValueData: Array<string> = defaultValue?.split(',') ?? [];
      const selectedValues: Array<string> = _.map(defaultValueData, (key: string) => _.get(render.items ?? {}, key));
      this.setState({ multiSelectLabelValue: selectedValues, multiSelectValue: selectedValues });
    }
  }

  public async refreshOn(value?: Record<string, any>): Promise<void> {
    const { id, workflowId, token } = this.props;
    if (value) {
      const { itemId, value: itemValue } = value;
      getCatalogApiCall({ targetBlock: id, data: { [itemId]: itemValue } }, token, workflowId).then((response: any) => {
        const { data } = response;
        if (data) {
          this.filterListData(data.items);
        }
      });
    }
  }

  public isValidate(): boolean {
    const { mandatory } = this.props;
    const { value } = this.state;
    const valid = Yup.string().required().isValidSync(value);
    const isValidate = mandatory || isNotNullOrEmpty(value);
    const flag = isValidate ? valid : true;
    if (!flag) {
      this.setState({ error: Strings.required });
    } else {
      this.setState({ error: '' });
    }
    return flag;
  }

  public isModalOpen(): boolean {
    return false;
  }

  public getValue(): Record<string, any> {
    const { id, render } = this.props;
    const { value, multiSelectValue } = this.state;
    return {
      [id]: {
        value: render?.allowMultiple ? multiSelectValue.toString() : value,
        selectedValue: render?.allowMultiple ? multiSelectValue : value
      }
    };
  }

  public getViewData(): Record<string, any> {
    const { id, render, title } = this.props;
    const { labelValue, multiSelectLabelValue } = this.state;
    return {
      [id]: {
        title: title,
        displayValue: render?.allowMultiple ? multiSelectLabelValue : labelValue
      }
    };
  }

  public setValue(value: Record<string, any>): void {
    console.log('SetValue Method Trigger.', value);
  }
}

export default SuperDropdown;
