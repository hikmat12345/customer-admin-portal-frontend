 import type {  WorkflowLayoutWebType } from '../../../shared';

    // WorkflowDataType
    // and add more like isOpen etc 
export type USAddressStatesType =  WorkflowLayoutWebType & {
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
    streetLine1Data: any;
    loading: boolean;
    value: string;
    isOpen: boolean;
 };
    // USAddressItemType
    // and add more like id etc