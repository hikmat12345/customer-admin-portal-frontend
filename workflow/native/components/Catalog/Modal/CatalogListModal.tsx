import { FlatList, Text, View } from 'native-base';
import { type FC, useState } from 'react';
import React from 'react';
import { useCallback } from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { Pressable, TouchableOpacity } from 'react-native';
import BottomModal, { ModalContent, ModalFooter } from 'react-native-modals';
import { ScrollView } from 'react-native-virtualized-view';

import type { CatalogItemType } from '../../../../shared';
import { Colors, Strings } from '../../../../shared';
import { moderateScale } from '../../../theme';
import type {
  CatalogCategoryType,
  CatalogListModalType,
  CatalogListType,
  RenderCatalogCategoryItemType,
  RenderCatalogCategoryType,
  RenderCategoryListType
} from '../CatalogTypes';
import NoCatalogFound from '../NoCatalogFound';
import RenderCatalogItem from '../RenderCatalogItem';
import catalogListModalStyle from './CatalogListModalStyle';

const RenderCatalogCategoryItem: FC<RenderCatalogCategoryItemType> = ({
  name,
  selectedValue,
  keyOfSelectValue,
  onSelectAndUnSelectValue,
  index
}: RenderCatalogCategoryItemType) => (
  <View
    px={4}
    key={index}
    justifyContent={'center'}
    borderWidth={1}
    height={moderateScale(30)}
    mr={moderateScale(6)}
    borderRadius={moderateScale(8)}
    borderColor={Colors.borderGray}
    backgroundColor={selectedValue === name ? Colors.lightPrimary : Colors.borderGray}
  >
    <Pressable
      onPress={() => {
        onSelectAndUnSelectValue(selectedValue, name, keyOfSelectValue);
      }}
    >
      <Text>{name}</Text>
    </Pressable>
  </View>
);

const RenderCategoryList: FC<RenderCategoryListType> = ({
  data,
  selectedValue,
  keyOfSelectValue,
  onSelectAndUnSelectValue
}: RenderCategoryListType) => {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item, index }: ListRenderItemInfo<string>) => {
        return (
          <RenderCatalogCategoryItem
            index={index}
            onSelectAndUnSelectValue={onSelectAndUnSelectValue}
            name={item}
            selectedValue={selectedValue}
            keyOfSelectValue={keyOfSelectValue}
          />
        );
      }}
      //listKey={Math.random().toString()}
      keyExtractor={(item: string) => item.toString()}
    />
  );
};

const RenderCatalogCategory: FC<RenderCatalogCategoryType> = ({
  title,
  data,
  selectedValue,
  keyOfSelectValue,
  onSelectAndUnSelectValue
}: RenderCatalogCategoryType) => {
  return (
    <View flexDirection={'row'} height={moderateScale(42)} alignItems={'center'}>
      <Text px={4} style={catalogListModalStyle.textStyle}>
        {title}
      </Text>
      <RenderCategoryList
        data={data}
        selectedValue={selectedValue}
        keyOfSelectValue={keyOfSelectValue}
        onSelectAndUnSelectValue={onSelectAndUnSelectValue}
      />
    </View>
  );
};

const CatalogCategory: FC<CatalogCategoryType> = ({
  colorCategories,
  selectedColor,
  onSelectAndUnSelectValue,
  manufacturerCategories,
  selectManufacturer,
  memoryCategories,
  selectMemory,
  selectType
}) => (
  <View
    borderRadius={moderateScale(8)}
    borderColor={Colors.borderGray}
    borderWidth={1}
    backgroundColor={Colors.cardBackground}
    mb={2}
  >
    <RenderCatalogCategory
      title={Strings.color}
      data={colorCategories ?? []}
      selectedValue={selectedColor}
      keyOfSelectValue={'selectedColor'}
      onSelectAndUnSelectValue={onSelectAndUnSelectValue}
    />
    <View borderWidth={1} borderColor={Colors.borderGray} />
    <RenderCatalogCategory
      title={Strings.brand}
      data={manufacturerCategories ?? []}
      selectedValue={selectManufacturer}
      keyOfSelectValue={'selectManufacturer'}
      onSelectAndUnSelectValue={onSelectAndUnSelectValue}
    />
    <View borderWidth={1} borderColor={Colors.borderGray} />
    <RenderCatalogCategory
      title={Strings.size}
      data={memoryCategories ?? []}
      selectedValue={selectMemory}
      keyOfSelectValue={'selectMemory'}
      onSelectAndUnSelectValue={onSelectAndUnSelectValue}
    />
    <View borderWidth={1} borderColor={Colors.borderGray} />
    <RenderCatalogCategory
      title={Strings.type}
      data={[Strings.allDevices, Strings.selectedDevices]}
      selectedValue={selectType}
      keyOfSelectValue={'selectType'}
      onSelectAndUnSelectValue={onSelectAndUnSelectValue}
    />
  </View>
);

const CatalogList: FC<CatalogListType> = ({ catalogData, selectedValue, onCheckUncheckCatalog }: CatalogListType) => (
  <View style={catalogListModalStyle.flatList}>
    {catalogData.length ? (
      <ScrollView>
        <View onStartShouldSetResponder={(): boolean => true}>
          <FlatList
            data={catalogData}
            numColumns={2}
            columnWrapperStyle={catalogListModalStyle.columnWrapperStyle}
            horizontal={false}
            ItemSeparatorComponent={() => <View style={catalogListModalStyle.ItemSeparatorComponentStyle} />}
            contentContainerStyle={catalogListModalStyle.contentContainerStyle}
            renderItem={({ item, index }: ListRenderItemInfo<CatalogItemType>) => (
              <RenderCatalogItem
                item={item}
                index={index}
                selectedValue={selectedValue}
                onCheckUncheckCatalog={(id: number) => onCheckUncheckCatalog(id)}
              />
            )}
            //listKey={Math.random().toString()}
            keyExtractor={({ id }: CatalogItemType) => id.toString()}
          />
        </View>
      </ScrollView>
    ) : (
      <View my={2}>
        <NoCatalogFound />
      </View>
    )}
  </View>
);

const CatalogListModal: FC<CatalogListModalType> = ({
  isOpen,
  catalogData,
  selectedValue,
  manufacturerCategories,
  colorCategories,
  memoryCategories,
  selectManufacturer,
  selectMemory,
  selectedColor,
  onSelectAndUnSelectValue,
  onCancel,
  title,
  selectType,
  allowMultiple,
  onSubmit
}: CatalogListModalType) => {
  const [selectedCatalog, setSelectedCatalog] = useState<Array<string>>([...selectedValue]);
  const selectUnselectCatalog = useCallback(
    (id: number) => {
      if (id && selectedCatalog.includes(id.toString())) {
        const selectedValues = selectedCatalog.filter((item: string) => item !== id.toString());
        setSelectedCatalog([...selectedValues]);
      } else {
        if (allowMultiple) {
          selectedCatalog.push(id.toString());
          setSelectedCatalog([...selectedCatalog]);
        } else {
          setSelectedCatalog([id.toString()]);
        }
      }
    },
    [allowMultiple, selectedCatalog]
  );

  return (
    <BottomModal
      visible={isOpen}
      height={0.9}
      rounded={false}
      width={1}
      style={catalogListModalStyle.bottomModal}
      modalStyle={catalogListModalStyle.modalStyle}
      footer={
        <ModalFooter bordered={false} style={catalogListModalStyle.footerContainer}>
          <View
            flexDirection={'row'}
            style={catalogListModalStyle.footerMainView}
            justifyContent={'space-between'}
            mb={4}
          >
            <TouchableOpacity
              style={catalogListModalStyle.buttonView}
              onPress={() => {
                onSubmit(selectedCatalog);
              }}
            >
              <Text color={Colors.white} fontSize={moderateScale(15)} style={catalogListModalStyle.textStyle}>
                {Strings.submit}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancel}
              style={[catalogListModalStyle.buttonView, catalogListModalStyle.cancelButtonView]}
            >
              <Text fontSize={moderateScale(15)} style={catalogListModalStyle.textStyle} color={Colors.primary}>
                {Strings.cancel}
              </Text>
            </TouchableOpacity>
          </View>
        </ModalFooter>
      }
    >
      <ModalContent style={catalogListModalStyle.modalContent}>
        <View onStartShouldSetResponder={(): boolean => true}>
          <View style={catalogListModalStyle.indicatorView}>
            <View style={catalogListModalStyle.indicatorStyle} />
          </View>
          <View alignItems={'center'} justifyContent={'center'}>
            <Text numberOfLines={2} style={catalogListModalStyle.textStyle} fontSize={moderateScale(15)}>
              {title}
            </Text>
          </View>
          <View borderWidth={1} borderColor={Colors.borderGray} mt={moderateScale(11)} mb={moderateScale(15)} />
          <CatalogCategory
            onSelectAndUnSelectValue={onSelectAndUnSelectValue}
            colorCategories={colorCategories ?? []}
            selectedColor={selectedColor}
            manufacturerCategories={manufacturerCategories ?? []}
            selectManufacturer={selectManufacturer}
            memoryCategories={memoryCategories ?? []}
            selectMemory={selectMemory}
            selectType={selectType}
            typeCategory={[Strings.allDevices, Strings.selectedDevices]}
          />
          <CatalogList
            catalogData={catalogData}
            selectedValue={selectedCatalog}
            onCheckUncheckCatalog={(id: number) => selectUnselectCatalog(id)}
          />
        </View>
      </ModalContent>
    </BottomModal>
  );
};

export default CatalogListModal;
