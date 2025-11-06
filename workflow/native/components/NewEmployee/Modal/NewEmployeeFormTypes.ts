import type { IInputProps } from 'native-base';

import type { RenderDataType } from '../../../../shared';
import type { NewEmployeeDataType } from '../NewEmployeeComponentTypes';

export type NewEmployeeFormModalType = {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  render: RenderDataType;
  onSubmit: (values: NewEmployeeDataType) => void;
};

export type InputProps = IInputProps & {
  error?: string;
  title?: string;
  mandatory: boolean;
  onChangeText?: (value: string) => void;
};

export type DropdownInputType = {
  countries: Record<string, string>;
  selectedDataCenter: string;
  setSelectedDataCentre: (text: string) => void;
};
