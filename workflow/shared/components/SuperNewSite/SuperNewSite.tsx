import type { WorkflowDataType } from '../../types';
import { SuperComponent } from '../SuperComponent';
import type { NewSiteStatesType } from './SuperNewSiteType';

abstract class SuperNewSite<P extends WorkflowDataType> extends SuperComponent<P, NewSiteStatesType> {
  constructor(props: P) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  public refreshOn(value?: Record<string, any>): void {
    console.log('RefreshOn Method Trigger.', value);
  }

  public isValidate(): boolean {
    return true;
  }

  public isModalOpen(): boolean {
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({ isOpen: false });
    }
    return isOpen;
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

export default SuperNewSite;
