import type { WorkflowLayoutWebType } from '../../types';
import { SuperComponent } from '../SuperComponent';
import type { LabelStatesType } from './SuperLabelType';

class SuperLabel<P extends WorkflowLayoutWebType> extends SuperComponent<P, LabelStatesType> {
  constructor(props: P) {
    super(props);
    this.state = {
      value: props.value || '',
      error: props.error || ''
    };
  }

  public refreshOn(value?: Record<string, any>): void {
    console.log('RefreshOn Method Trigger.', value);
  }

  public isValidate(): boolean {
    return true;
  }

  public isModalOpen(): boolean {
    return false;
  }

  public getValue(): Record<string, any> {
    const { id } = this.props;

    return { [id]: '' };
  }

  public getViewData(): Record<string, any> {
    const { id, title } = this.props;

    return { [id]: { title: title, displayValue: '' } };
  }

  public setValue(value: Record<string, any>): void {
    console.log('SetValue Method Trigger.', value);
  }
}

export default SuperLabel;
