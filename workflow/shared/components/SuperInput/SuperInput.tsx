import _ from 'lodash';
import * as Yup from 'yup';

import { getCatalogApiCall, Strings } from '../../../shared';
import { ComponentType } from '../../constants';
import type { WorkflowDataType } from '../../types';
import { isNotNullOrEmpty } from '../../utils';
import { SuperComponent } from '../SuperComponent';
import type { InputStatesType } from './SuperInputType';

class SuperInput<P extends WorkflowDataType> extends SuperComponent<P, InputStatesType> {
  constructor(props: P) {
    super(props);
    this.state = {
      value: props.answer?.value || props.render?.value || '',
      error: props.error || ''
    };
  }

  componentDidMount(): void {
    const { answer, handleRefreshOn, refreshOn, id } = this.props;
    if (answer) {
      handleRefreshOn(refreshOn, { itemId: id, value: answer });
    }
  }

  public async refreshOn(value: Record<string, any>): Promise<void> {
    const { id, workflowId, token } = this.props;
    if (value) {
      const { itemId, itemValue } = value;
      // TODO: Set the response when api changes complete
      getCatalogApiCall({ targetBlock: id, data: { [itemId]: itemValue } }, token, workflowId).then(() => {});
    }
  }

  public isValidate(): boolean {
    const { type, mandatory } = this.props;
    const { value } = this.state;
    const valid = Yup.string().required().isValidSync(value);
    const validEmail = Yup.string().required().email().isValidSync(value);
    const isValidate = mandatory || isNotNullOrEmpty(value);
    const emailFlag = _.toLower(type) === _.toLower(ComponentType.email) && isValidate ? validEmail : true;
    const flag = isValidate ? valid : true;
    if (!flag) {
      this.setState({ error: Strings.required });
    } else if (!emailFlag) {
      this.setState({ error: Strings.emailValidation });
    } else {
      this.setState({ error: '' });
    }
    return flag;
  }

  public isModalOpen(): boolean {
    return false;
  }

  public getValue(): Record<string, any> {
    const { id } = this.props;
    const { value } = this.state;

    return { [id]: { value } };
  }
  public getViewData(): Record<string, any> {
    const { id, title } = this.props;
    const { value } = this.state;

    return { [id]: { title: title, displayValue: value } };
  }

  public setValue(value: Record<string, any>): void {
    console.log('SetValue Method Trigger.', value);
  }
}

export default SuperInput;
