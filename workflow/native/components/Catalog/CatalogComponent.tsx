import _ from 'lodash';
import { Stack, Text, View } from 'native-base';
import type { ReactNode } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';

import type { CatalogItemType, WorkflowDataType } from '../../../shared';
import { Colors, Strings, SuperCatalog } from '../../../shared';
import { moderateScale, scale } from '../../theme';
import type { CatalogItemCardType } from './CatalogTypes';
import { CatalogListModal } from './Modal';
import NoCatalogFound from './NoCatalogFound';
import SelectPlaceholder from './SelectPlaceholder';
import { catalogStyle } from './styles';

const CatalogItemCard: FC<CatalogItemCardType> = ({ item, index, onClickSelectPlaceholder }: CatalogItemCardType) => {
  return (
    <View style={catalogStyle.catalogContainer}>
      <TouchableOpacity onPress={onClickSelectPlaceholder} key={index} style={catalogStyle.cardMainView}>
        <View>
          <View style={catalogStyle.imageView}>
            <Image style={catalogStyle.imageStyle} source={{ uri: item?.image }} />
          </View>
          <View my={moderateScale(10)}>
            <View width={150}>
              <Text fontSize={moderateScale(12)} px={2} fontWeight={'700'} textAlign={'center'}>
                {item?.name}
              </Text>
              {item?.outOfStock && (
                <Text pt={1} color={Colors.error} fontSize={moderateScale(16)} textAlign={'center'}>
                  {Strings.outOfStock}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
      <Stack mt={2}>
        <Text fontSize={scale(14)} fontWeight={'700'} mb={scale(2)}>
          {title}
          {mandatory && <Text color={Colors.error}>*</Text>}
        </Text>

        {fixCatalogData?.length ? (
          <>
            <ScrollView contentContainerStyle={catalogStyle.scrollView}>
              {selectedCatalog.map((item: CatalogItemType, index: number) => {
                return (
                  <CatalogItemCard
                    item={item}
                    selectedValue={selectedValue}
                    index={index}
                    onClickSelectPlaceholder={this.onClickSelectPlaceholder}
                  />
                );
              })}
            </ScrollView>
            {selectedCatalog.length === 0 && (
              <SelectPlaceholder onClickSelectPlaceholder={this.onClickSelectPlaceholder} />
            )}
          </>
        ) : (
          <NoCatalogFound />
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
        {error !== '' && <Text color={Colors.error}>{error}</Text>}
      </Stack>
    );
  }
}

export default CatalogComponent;
