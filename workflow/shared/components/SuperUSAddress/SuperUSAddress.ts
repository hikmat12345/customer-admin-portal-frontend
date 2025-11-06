import * as Yup from 'yup';

import { fetchLocation, isNotNullOrEmpty, Strings } from '../../../shared';
import type { WorkflowDataType } from '../../types';
import type { USAddressItemType } from '.././../../native';
import { SuperComponent } from '../SuperComponent';
import type { USAddressStatesType } from './SuperUSAddressTypes';

abstract class SuperUSAddress<P extends WorkflowDataType> extends SuperComponent<P, USAddressStatesType> {
  constructor(props: P) {
    super(props);
    this.state = {
      streetLine1: '',
      streetLine2: props?.answer?.value?.streetLine2 ?? '',
      city: props?.answer?.value?.city ?? '',
      zip: props?.answer?.value?.zip ?? '',
      isFocus: false,
      state: props?.answer?.value?.state ?? '',
      streetLine1Error: '',
      cityError: '',
      stateError: '',
      token: '',
      streetLine1Data: [],
      loading: false,
      value: props?.answer?.searchValue ?? ''
    };
  }

  componentDidMount(): void {
    const { answer, token, id, workflowId, defaultValue } = this.props;
    if (answer) {
      this.setState({ loading: true });
      fetchLocation(token, 'POST', { targetBlock: id, data: { [id]: answer?.searchValue } }, workflowId).then(
        (response: any) => {
          let streetLine1Data: Array<USAddressItemType> = [];
          if (response?.data?.suggestions) {
            streetLine1Data = response?.data?.suggestions?.map((item: Record<string, string>, index: number) => {
              return { ...item, id: index.toString() };
            });
          }
          this.setState(
            {
              streetLine1Data: streetLine1Data ?? [],
              streetLine1: answer?.value?.streetLine1,
              loading: false
            },
            () => this.forceUpdate()
          );
        }
      );
    }
    if (defaultValue) {
      const [streetLine1, streetLine2, city, zip, state] = defaultValue.split(',');
      this.setState({
        streetLine1,
        streetLine2,
        city,
        zip,
        state
      });
    }
  }

  public refreshOn(value?: Record<string, any>): void {
    console.log('RefreshOn Method Trigger.', value);
  }

  public isValidate(): boolean {
    const { mandatory } = this.props;
    const { streetLine1, state, city } = this.state;
    const streetLine1Valid = Yup.string().required().isValidSync(streetLine1);
    const stateValid = Yup.string().required().isValidSync(state);
    const cityValid = Yup.string().required().isValidSync(city);

    const isValidateStreetLine1 = mandatory || isNotNullOrEmpty(streetLine1);
    const isValidateStateValid = mandatory || isNotNullOrEmpty(state);
    const isValidateCity = mandatory || isNotNullOrEmpty(city);

    const streetLine1Flag = isValidateStreetLine1 ? streetLine1Valid : true;
    const cityFlag = isValidateCity ? cityValid : true;
    const stateFlag = isValidateStateValid ? stateValid : true;
    const flag = streetLine1Flag && cityFlag && stateFlag;

    this.setState({
      streetLine1Error: !streetLine1Flag ? Strings.required : '',
      cityError: !cityFlag ? Strings.required : '',
      stateError: !stateFlag ? Strings.required : ''
    });

    return flag;
  }

  public isModalOpen(): boolean {
    return false;
  }

  public getValue(): Record<string, any> {
    const { id } = this.props;
    const { streetLine1, streetLine2, city, zip, state, value } = this.state;

    return { [id]: { value: { streetLine1, streetLine2, city, zip, state }, searchValue: value } };
  }

  public getViewData(): Record<string, any> {
    const { id, title } = this.props;
    const { streetLine1, streetLine2, city, zip, state } = this.state;

    return {
      [id]: {
        title: title,
        displayValue: `${streetLine1},${streetLine2 ? streetLine2 + ',' : ''}${city},${zip},${state}`
      }
    };
  }

  public setValue(value: Record<string, any>): void {
    console.log('SetValue Method Trigger.', value);
  }
}

export default SuperUSAddress;
