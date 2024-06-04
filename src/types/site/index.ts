export type TableDataProps = {
    data : any,
    loading?: boolean
    label?: string,
    currency?: string | null
  }
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

export type SiteGeneralInfoProps = {
    label?: string,
    isLoading?: boolean,
    data: {
        veroxosId: string,
        siteCode: string,
        name: string,
        buildingName: string,
        streetLine1: string,
        streetLine2: string,
        city: string,
        stateCounty: string,
        postZipCode: string,
        country: {
            name: string
        },
        contactName: string,
        contactEmail: string,
        longitude: number,
        latitude: number,
        status: string
    }
} 