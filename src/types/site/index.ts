export type TableDataProps = {
  data: any;
  loading?: boolean;
  label?: string | JSX.Element;
  currency?: string | null;
  tableClass?: string;
};
export interface CostTableProps {
  data: {
    glCodeIndex: number;
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
  currencyCode?: string;
}

export type SiteGeneralInfoProps = {
  label?: string;
  isLoading?: boolean;
  data: {
    veroxosId: string;
    siteCode: string;
    name: string;
    buildingName: string;
    streetLine1: string;
    streetLine2: string;
    city: string;
    stateCounty: string;
    postZipCode: string;
    country: {
      name: string;
    };
    contactName: string;
    contactEmail: string;
    longitude: number;
    latitude: number;
    status: number;
  };
};
