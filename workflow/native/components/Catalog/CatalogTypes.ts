import type { ImageProps } from 'react-native';

import type { CatalogItemType, WorkflowDataType } from '../../../shared';

export type CatalogItemCardType = {
  selectedValue: Array<string>;
  item: CatalogItemType;
  onCheckUncheckCatalog?: (id: number) => void;
  index: number;
  manufacturerCategories?: Array<string>;
  memoryCategories?: Array<string>;
  colorCategories?: Array<string>;
  onClickSelectPlaceholder: () => void;
};

export type RenderCatalogCategory = {
  selectManufacturer: string;
  selectedColor: string;
  selectMemory: string;
  onSelectAndUnSelectValue: (newValue: string, value: string, key: string) => void;
};
export type CatalogListModalType = {
  allowMultiple?: boolean;
  isOpen: boolean;
  catalogData: Array<CatalogItemType>;
  selectedValue: Array<string>;
  onClose?: () => void;
  manufacturerCategories?: Array<string>;
  memoryCategories?: Array<string>;
  colorCategories?: Array<string>;
  selectedColor: string;
  selectManufacturer: string;
  selectMemory: string;
  onSelectAndUnSelectValue: (newValue: string, value: string, key: string) => void;
  onCancel: () => void;
  title: string;
  typeCategory: Array<string>;
  selectType: string;
  onSubmit: (data: Array<string>) => void;
  fixCatalogData?: Array<CatalogItemType>;
};

export type RenderCategoryItemType = {
  item: CatalogItemType;
  index: number;
};

export type RenderCategoryListType = {
  data: Array<string>;
  selectedValue: string;
  keyOfSelectValue: string;
  onSelectAndUnSelectValue: (newValue: string, value: string, key: string) => void;
};
export type RenderCatalogItemType = {
  item: CatalogItemType;
  index: number;
  selectedValue: Array<string>;
  onCheckUncheckCatalog: (id: number) => void;
};

export type RenderCatalogCategoryType = { title: string } & RenderCategoryListType;

export type CatalogPropsType = ImageProps & WorkflowDataType;
export type SelectPlaceholderType = {
  onClickSelectPlaceholder: () => void;
};

export type RenderCatalogCategoryItemType = {
  index: number;
  selectedValue: string;
  keyOfSelectValue: string;
  onSelectAndUnSelectValue: (newValue: string, value: string, key: string) => void;
  name: string;
};

export type CatalogCategoryType = {
  colorCategories?: Array<string>;
  selectedColor: string;
  onSelectAndUnSelectValue: (newValue: string, value: string, key: string) => void;
  manufacturerCategories?: Array<string>;
  selectManufacturer: string;
  memoryCategories: Array<string>;
  selectMemory: string;
  typeCategory: Array<string>;
  selectType: string;
};

export type CatalogListType = {
  catalogData: Array<CatalogItemType>;
  selectedValue: Array<string>;
  onCheckUncheckCatalog: (id: number) => void;
};
