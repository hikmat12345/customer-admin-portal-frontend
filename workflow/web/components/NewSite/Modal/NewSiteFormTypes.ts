import type { IInputProps } from 'native-base';

import type { RenderDataType } from '../../../../shared';
import type { NewSiteDataType } from '../NewSiteComponentTypes';

export type NewSiteFormModalType = {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  render: RenderDataType;
  onSubmit: (values: NewSiteDataType) => void;
};

export type InputProps = IInputProps & {
  error?: string;
  title?: string;
  mandatory: boolean;
  onChangeText?: (value: string) => void;
};

export type dropdownInputType = {
  countries: Record<string, string>;
  isFocus: boolean;
  selectedCountry: string;
  setIsFocus: (text: boolean) => void;
  setSelectCountry: (text: string) => void;
};
