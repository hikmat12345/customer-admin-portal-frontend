export type StylingType = Partial<{
  textHexColour: string;
  backgroundHex: string;
  titleHexColour: string;
  borderColorHex: string;
}>;

export type RenderDataType = Partial<{
  value: string;
  placeholder: string;
  styling: StylingType;
  groups: boolean;
  placeHolder: string;

  // For spacer component
  heightPX: string;

  // for dropdown component
  allowMultiple: boolean;
  items: Record<string, string>;

  // paragraph component
  textHexColour: string;
  textFontSize: number;
  backgroundHex: string;
  titleHexColour: string;
  titleFontSize: number;
  borderHex: string;
  text: string;

  // date and time component
  dateFormat: string;

  // USAddress component
  showAttentionTo: boolean;
  states: Array<string>;

  multipleLine: boolean;

  // html component
  html: string;

  // line component
  marginTop: string;
  marginBelow: string;
  width: string;
  type: string;
  color: string;

  // new site
  countries: Record<string, string>;
  siteNameRequired: string;
  buildingNameRequired: string;
  streetLine1Required: string;
  streetLine2Required: string;
  cityRequired: string;
  postCodeRequired: string;
  stateRequired: string;
  latitudeRequired: string;
  longitudeRequired: string;
  contactNumberRequired: string;
  contactEmailRequired: string;
  contactNameRequired: string;
  siteCodeRequired: string;

  // new employee component
  firstNameRequired: string;
  lastNameRequired: string;
  emailRequired: string;
  employeeIdRequired: string;
  dataCentre: Record<string, string>;
}>;

type ExtraPropsType = {
  answer?: any;
  workflowId: number;
  token: string;
  handleRefreshOn: (refreshOn: Array<string>, values?: Record<string, any>) => void;
};

export type WorkflowDataType = {
  id: string;
  type: string;
  parentType: string;
  title: string;
  order: string;
  group: string;
  mandatory: boolean;
  isRefresh: boolean;
  refreshOn: Array<string>;
  render: RenderDataType;
  labelProps?: Record<string, any>;
  errorProps?: Record<string, any>;
  errorColor?: string;
  error: string;
  styling: StylingType;
  mode?: string;
  value?: string;
  defaultValue?: string;
} & ExtraPropsType;

export type WorkflowLayoutPropsType = Partial<{
  workflowId: number;
  token: string;
  data: Record<string, any>;
  onSubmitted: (value: Record<string, any>, viewData: Record<string, any>) => void;
}>;

export type WorkflowLayoutStateType = {
  groupIndex: number;
  groupKeys: string[];
  componentDataByGroup?: Record<string, Array<WorkflowDataType>>;
  answerDataByGroup: Record<string, Record<string, any>>;
  componentHideList: Array<WorkflowDataType>;
  defaultRefreshList: Array<WorkflowDataType>;
  viewDataByGroup: Record<string, Record<string, any>>;
};

export type CatalogItemType = {
  id: number;
  outOfStock: boolean;
  colour: string;
  memory: string;
  type: string;
  name: string;
  manufacturer: string;
  price: string;
  currency: string;
  image: string;
};

export type CatalogApiResponseType = {
  data?: Array<CatalogItemType>;
  message: string;
  status: number;
};

export type SortOrderType = 'asc' | 'desc';
