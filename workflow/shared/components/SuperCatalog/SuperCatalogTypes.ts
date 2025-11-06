import type { CatalogItemType } from '../../../shared';

export type CatalogStatesType = {
  catalogData: Array<CatalogItemType>;
  selectedValue: Array<string>;
  fixCatalogData: Array<CatalogItemType>;
  selectedColor: string;
  selectMemory: string;
  selectManufacturer: string;
  manufacturerCategories: Array<string>;
  memoryCategories: Array<string>;
  colorCategories: Array<string>;
  error: string;
  isOpen: boolean;
  selectType: string;
  selectedCatalog: Array<CatalogItemType>;
};
