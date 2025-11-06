import _ from 'lodash';

import { getCatalogApiCall, sortObject, Strings } from '../../../shared';
import type { CatalogItemType, WorkflowDataType } from '../../types';
import { SuperComponent } from '../SuperComponent';
import type { CatalogStatesType } from './SuperCatalogTypes';

class SuperCatalog<P extends WorkflowDataType> extends SuperComponent<P, CatalogStatesType> {
  constructor(props: P) {
    super(props);
    this.state = {
      catalogData: [],
      selectedValue: props.answer?.selectedValue ?? [],
      fixCatalogData: [],
      selectedColor: '',
      selectMemory: '',
      selectManufacturer: '',
      selectType: Strings.allDevices,
      manufacturerCategories: [],
      memoryCategories: [],
      colorCategories: [],
      error: props.error || '',
      isOpen: false,
      selectedCatalog: []
    };
  }

  componentDidMount(): void {
    const { render, defaultValue } = this.props;
    if (!_.isEmpty(defaultValue) && render.allowMultiple) {
      this.setSelectedCatalog(defaultValue?.split(',') ?? []);
    }
  }

  setSelectedCatalog(data: Array<string>) {
    const filterCatalog: Array<CatalogItemType> = [];
    const { fixCatalogData } = this.state;
    data.forEach((id: string) => {
      const index: number = _.findIndex(fixCatalogData, { id: Number(id) });
      filterCatalog.push(fixCatalogData[index]);
    });
    this.setState({ isOpen: false, selectedValue: data, selectedCatalog: filterCatalog });
  }

  onSubmitCatalog = (data: Array<string>) => {
    const { handleRefreshOn, refreshOn, id, answer } = this.props;
    const { selectedValue } = this.state;
    this.setSelectedCatalog(data);
    if (answer) {
      if (refreshOn.length) {
        setTimeout(() => {
          handleRefreshOn(refreshOn, { itemId: id, value: selectedValue.toString() });
        }, 500);
      }
    } else {
      handleRefreshOn(refreshOn, { itemId: id, value: selectedValue.toString() });
    }
  };

  public async refreshOn(value?: Record<string, any>): Promise<void> {
    const { id, workflowId, token, answer } = this.props;
    let manufacturerCount: Record<string, number> = {};
    let memoryCount: Record<string, number> = {};
    let colorCount: Record<string, number> = {};
    if (value) {
      const { itemId, value: itemValue } = value;
      getCatalogApiCall({ targetBlock: id, data: { [itemId]: itemValue } }, token, workflowId).then((response: any) => {
        const { data = [] } = response;
        data.forEach((catalog: CatalogItemType) => {
          const { manufacturer, memory, colour }: CatalogItemType = catalog;
          if (manufacturer !== '') {
            manufacturerCount[manufacturer] = (manufacturerCount[manufacturer] || 0) + 1;
          }
          if (memory !== '') {
            memoryCount[memory] = (memoryCount[memory] || 0) + 1;
          }
          if (colour !== '') {
            colorCount[colour] = (colorCount[colour] || 0) + 1;
          }
        });

        manufacturerCount = sortObject('desc', manufacturerCount);
        memoryCount = sortObject('desc', memoryCount);
        colorCount = sortObject('desc', colorCount);
        this.setState({
          manufacturerCategories: Object.keys(manufacturerCount).slice(0, 3),
          memoryCategories: Object.keys(memoryCount).slice(0, 3),
          colorCategories: Object.keys(colorCount).slice(0, 3),
          catalogData: data,
          fixCatalogData: data
        });

        // use for when go back
        if (answer) {
          this.onSubmitCatalog(answer?.selectedValue);
        }
      });
    }
  }

  public isValidate(): boolean {
    const { mandatory } = this.props;
    const { selectedValue } = this.state;

    const flag = mandatory ? (selectedValue.length ? true : false) : true;
    if (!flag) {
      this.setState({ error: Strings.required });
    } else {
      this.setState({ error: '' });
    }
    return flag;
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
    const { selectedValue } = this.state;

    return { [id]: { value: selectedValue.toString(), selectedValue } };
  }

  public getViewData(): Record<string, any> {
    const { id, title } = this.props;
    const { selectedValue, selectedCatalog } = this.state;
    const displayValue: Array<string> = selectedCatalog
      .filter(function ({ id }: CatalogItemType) {
        return selectedValue.includes(id.toString());
      })
      .map(function ({ name }: CatalogItemType) {
        return name;
      });

    return { [id]: { displayValue: displayValue.toString(), title: title } };
  }

  public setValue(value: Record<string, any>): void {
    console.log('SetValue Method Trigger.', value);
  }
}

export default SuperCatalog;
