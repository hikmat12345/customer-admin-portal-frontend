import type { TAutocompleteDropdownItem } from '../../../../react-native-dropdown';
import * as Yup from 'yup';

import { Strings } from '../../constants';
import { fetchLocation } from '../../services';
import type { WorkflowDataType } from '../../types';
import { isNotNullOrEmpty } from '../../utils';
import { SuperComponent } from '../SuperComponent';
import type { SearchServiceStatesType } from './SuperSearchServiceType';

class SuperSearchService<P extends WorkflowDataType> extends SuperComponent<P, SearchServiceStatesType> {
  constructor(props: P) {
    super(props);
    this.state = {
      isFocus: false,
      value: '',
      error: props.error || '',
      searchService: props?.answer?.searchService ?? 'number',
      filterSitesData: [],
      loading: false,
      searchValue: props?.answer?.searchValue ?? '',
      initialValue: ''
    };
  }

  componentDidMount(): void {
    const { answer, workflowId, token, id } = this.props;
    if (answer) {
      this.setState({ loading: true });
      fetchLocation(
        token,
        'POST',
        { targetBlock: id, data: { [id]: { query: answer?.searchValue, searchType: answer?.searchService } } },
        workflowId
      ).then((response: any) => {
        const { data } = response;
        let searchServices: Array<TAutocompleteDropdownItem> = [];
        if (data?.suggestions && data?.suggestions.length > 0) {
          const {
            data: { suggestions }
          } = response;
          searchServices = suggestions.map((item: TAutocompleteDropdownItem, index: number) =>
            Object.assign({}, item, { line1: item.value, value: item.data, data: item.value, id: index.toString() })
          );
        }
        this.setState({
          filterSitesData: searchServices,
          loading: false,
          value: answer?.value,
          initialValue: answer?.value
        });
      });
    }
  }

  public refreshOn(value?: Record<string, any>): void {
    console.log('RefreshOn Method Trigger.', value);
  }

  public isValidate(): boolean {
    const { value } = this.state;
    const { mandatory } = this.props;
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
    const { id } = this.props;
    const { value, searchService, searchValue } = this.state;
    return { [id]: { value: Number(value), searchService, searchValue } };
  }
  public getViewData(): Record<string, any> {
    const { value, filterSitesData } = this.state;
    const { id, title } = this.props;

    const index: number = filterSitesData.findIndex((item) => item.value === value);
    return { [id]: { title: title, displayValue: filterSitesData[index].data } };
  }

  public setValue(value: Record<string, any>): void {
    console.log('SetValue Method Trigger.', value);
  }
}

export default SuperSearchService;
