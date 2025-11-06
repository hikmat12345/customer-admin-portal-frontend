export type DataType = {
  items: Record<string, string>;
  forceDefaultValue: boolean;
  defaultValue: number;
};

export type DropdownStatesType = {
  value: string;
  isFocus: boolean;
  error: string;
  multiSelectValue: Array<string | number>;
  data: Record<string, string>;
  multiSelectLabelValue: Array<string>;
  labelValue: string;
};
