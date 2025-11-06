import type { WorkflowDataType } from '../../types';
import { SuperComponent } from '../SuperComponent';
import type { SpacerStatesType } from './SuperSpacerType';

abstract class SuperSpacer<P extends WorkflowDataType> extends SuperComponent<P, SpacerStatesType> {
  constructor(props: P) {
    super(props);
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
    const { id, defaultValue } = this.props;

    return { [id]: defaultValue ?? '' };
  }
  public getViewData(): Record<string, any> {
    const { id, title } = this.props;

    return { [id]: { title: title, displayValue: '' } };
  }

  public setValue(value: Record<string, any>): void {
    console.log('SetValue Method Trigger.', value);
  }
}

export default SuperSpacer;
