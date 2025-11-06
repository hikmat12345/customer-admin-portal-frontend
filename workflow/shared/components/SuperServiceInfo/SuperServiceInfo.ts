import { getCatalogApiCall } from '../../services';
import type { WorkflowDataType } from '../../types';
import { SuperComponent } from '../SuperComponent';
import type { ServiceInfoStatesType } from './SuperServiceInfoType';

class SuperServiceInfo<P extends WorkflowDataType> extends SuperComponent<P, ServiceInfoStatesType> {
  constructor(props: P) {
    super(props);
    this.state = { showServiceDetail: false, serviceInfoData: {} };
  }

  public async refreshOn(value?: Record<string, any>): Promise<void> {
    const { id, workflowId, token } = this.props;
    if (value) {
      const { itemId, value: itemValue } = value;
      getCatalogApiCall({ targetBlock: id, data: { [itemId]: itemValue } }, token, workflowId).then((response: any) => {
        const { data = {} } = response;
        this.setState({ serviceInfoData: data });
      });
    }
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

export default SuperServiceInfo;
