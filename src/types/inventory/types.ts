import { ReactNode } from 'react';

export interface Inventory {
  id: number;
  serviceNumber: string;
  live: number;
  created: Date;
  updated: Date;
  serviceType: number;
  costCentre: string;
  companyNetwork: {
    id: number;
    displayName: string;
    network: {
      id: number;
      name: string;
    };
  };
}

export interface InventoryCardData {
  id: number;
  title: string;
  description: string;
  data: ReactNode;
}

export type TableDataProps = {
  data: any;
  loading?: boolean;
  label?: string;
};
export interface CostTableProps {
  data: {
    gl_code_index: number;
    name: string;
    code: string;
  }[];
  width?: string;
  costCenter?: string;
}
export interface PlanTableProps {
  data: {
    cost: number;
    name: string;
    description: string;
  }[];
  width?: string;
}
export type GeneralInfoProps = {
  label?: string;
  isLoading?: boolean;
  data: {
    veroxosId: string;
    serviceNumber: string;
    vendor: string;
    account: string;
    serviceType: string | number;
    serviceDescription: any;
    employee: any;
    purposeOfService: string;
    contractStartDate: string;
    contractEndDate: string;
    spare: string;
    zeroUsageAllowed: string;
    terminationDate: string;
    scheduledTerminationDate: string;
    scheduledSuspensionDate: string;
    notes: string;
    site: { streetLine1: string; streetLine2: string; latitude: number; longitude: number; id: number };
  };
};

export type ServiceTypeBadgeProps = {
  label: string;
  count: number;
  color: string;
  subTypes?: { name: string; service_type: number }[];
};
