import type { USAddressItemType } from '../../../native';

export type USAddressStatesType = {
  streetLine1: string;
  streetLine2: string;
  city: string;
  zip: string;
  isFocus: boolean;
  state: string;
  streetLine1Error: string;
  cityError: string;
  stateError: string;
  token: string;
  streetLine1Data: Array<USAddressItemType>;
  loading: boolean;
  value: string;
  isOpen?: boolean;
};
