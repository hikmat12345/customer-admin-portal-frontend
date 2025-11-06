import * as Yup from 'yup';

import { DEFAULT_DATE_FORMATE, Strings } from '../../constants';
import type { WorkflowDataType } from '../../types';
import { dateTimeFormat, defaultDate, isNotNullOrEmpty } from '../../utils';
import { SuperComponent } from '../SuperComponent';
import type { DateTimeStatesType } from './SuperDateTimeTypes';

class SuperDateTime<P extends WorkflowDataType> extends SuperComponent<P, DateTimeStatesType> {
  constructor(props: P) {
    super(props);
    this.state = {
      open: false,
      value: defaultDate(props.answer?.value ?? props.defaultValue),
      error: ''
    };
  }

  public refreshOn(value?: Record<string, any>): void {
    console.log('RefreshOn Method Trigger.', value);
  }

  public isValidate(): boolean {
    const { mandatory } = this.props;
    const { value } = this.state;
    const valid = Yup.string().required().isValidSync(value);
    const isValidate = mandatory || isNotNullOrEmpty(value);
    const flag = isValidate ? valid : true;
    this.setState({ error: !flag ? Strings.required : '' });
    return flag;
  }

  public isModalOpen(): boolean {
    return false;
  }

  public getValue(): Record<string, any> {
    const { id, mode, render } = this.props;
    const { value } = this.state;
    return { [id]: { value: dateTimeFormat(mode, value ?? '', render?.dateFormat ?? DEFAULT_DATE_FORMATE) } };
  }

  public getViewData(): Record<string, any> {
    const { id, title, mode, render } = this.props;
    const { value } = this.state;

    return {
      [id]: {
        title: title,
        displayValue: dateTimeFormat(mode, value ?? '', render?.dateFormat ?? DEFAULT_DATE_FORMATE)
      }
    };
  }

  public setValue(value: Record<string, any>): void {
    console.log('SetValue Method Trigger.', value);
  }
}

export default SuperDateTime;
