import React, { ReactNode } from 'react';
import _ from 'lodash';
import { CatalogItemType, Strings, SuperCatalog, WorkflowDataType } from '../../../shared';
import { CatalogListModal } from './Modal/CatalogListModal';
import { CatalogItemCardType } from './CatalogTypes';

const CatalogItemCard = ({ item, index, onClickSelectPlaceholder }:CatalogItemCardType) => {
  return (
    <div>
      <div onClick={onClickSelectPlaceholder} key={index}>
        <div>
          <div>
            <img  src={item?.image} alt={item?.name} />
          </div>
          <div style={{ marginTop: '10px' }}>
            <div style={{ width: '150px' }}>
              <p style={{ fontSize: '12px', padding: '0 8px', fontWeight: '700', textAlign: 'center' }}>
                {item?.name}
              </p>
              {item?.outOfStock && (
                <p style={{ paddingTop: '4px', color: 'red', fontSize: '16px', textAlign: 'center' }}>
                  Out of Stock
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

class CatalogComponent extends SuperCatalog<WorkflowDataType> {
   onFilterByCurrency = (selectedCurrency: string) => {
    const { fixCatalogData } = this.state;
    this.setState({ catalogData: fixCatalogData.filter((item) => item.currency === selectedCurrency) });
  };
  onSelectAndUnSelectValue = (previousValue: string, newValue: string, key: string) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        [key]: previousValue === newValue ? (key === 'selectType' ? Strings.allDevices : '') : newValue
      }),
      () => this.onFilter()
    );
  };

  onFilter = () => {
    const { selectManufacturer, selectMemory, selectedColor, fixCatalogData, selectType, selectedValue } = this.state;

    let filterCategory: Array<CatalogItemType> = fixCatalogData;
    if (selectedColor !== '') {
      filterCategory = filterCategory.filter((item) => _.lowerCase(item.colour) === _.lowerCase(selectedColor));
    }
    if (selectManufacturer !== '') {
      filterCategory = filterCategory.filter(
        (item: CatalogItemType) => _.lowerCase(item.manufacturer) === _.lowerCase(selectManufacturer)
      );
    }
    if (selectMemory !== '') {
      filterCategory = filterCategory.filter((item) => _.lowerCase(item.memory) === _.lowerCase(selectMemory));
    }
    if (_.lowerCase(selectType) !== _.lowerCase(Strings.allDevices)) {
      filterCategory = filterCategory.filter((item) => selectedValue.includes(_.toString(item?.id)));
    }
    this.setState({ catalogData: filterCategory });
  };

 onClickSelectPlaceholder = () => {
    this.setState({ isOpen: true });
  };

  onCancel = () => {
    this.setState({ isOpen: false });
  };

 render(): ReactNode {
    const {
      title,
      mandatory,
      render: { allowMultiple }
    } = this.props;

    const {
      manufacturerCategories,
      memoryCategories,
      colorCategories,
      catalogData,
      selectedValue,
      selectManufacturer,
      selectMemory,
      selectedColor,
      error,
      isOpen,
      fixCatalogData,
      selectType,
      selectedCatalog
    } = this.state;

  return (
    <div style={{ marginTop: '20px' }}>
      <p style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>
        {title}
        {mandatory && <span style={{ color: 'red' }}>*</span>}
      </p>

      {fixCatalogData?.length ? (
        <>
          <div>
            {selectedCatalog.map((item, index) => (
              <CatalogItemCard
                item={item}
                selectedValue={selectedValue}
                index={index}
                onClickSelectPlaceholder={this.onClickSelectPlaceholder}
              />
            ))}
          </div>
          {selectedCatalog.length === 0 && (
            <div onClick={this.onClickSelectPlaceholder} style={{ cursor: 'pointer' }}>
              Select Placeholder
            </div>
          )}
        </>
      ) : (
        <p>No Catalog Found</p>
      )}

       {isOpen && (
          <CatalogListModal
            allowMultiple={allowMultiple}
            onClose={() => this.setState({ isOpen: false })}
            isOpen={isOpen}
            catalogData={catalogData}
            selectedValue={selectedValue}
            manufacturerCategories={manufacturerCategories}
            memoryCategories={memoryCategories}
            colorCategories={colorCategories}
            selectedColor={selectedColor}
            selectManufacturer={selectManufacturer}
            selectMemory={selectMemory}
            onCancel={this.onCancel}
            title={title}
            fixCatalogData={fixCatalogData}
            onSelectAndUnSelectValue={this.onSelectAndUnSelectValue}
            typeCategory={[Strings.allDevices, Strings.selectedDevices]}
            selectType={selectType}
            onSubmit={this.onSubmitCatalog}
          />
        )}
      
      {error !== '' && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
};

export default CatalogComponent;
