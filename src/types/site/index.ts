export type TableDataProps = {
    data : any,
    loading?: boolean
    label?: string,
    currynecy?: string
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
export type EmployeeGeneralInfoProps = {
    data: {
        veroxosId: string,
        firstName: string,
        email: string,
        status: string | number,
        site: {
            streetLine1: string
            name?: string
            address?: string
        }
        manage_id: string,
        client_employee_id: string,
        last_name: string,
        job_title: string,
        employee_level: string,
        cost_center: string,
        vip_executive: string,
    },
    isLoading?: boolean,
    label?: string
 
} 
export type AccountGeneralInfoProps = {
    label?: string,
    isLoading?: boolean,
    data: {
        veroxosId: string,
        accountNumber: string,
        masterAccount: string,
        network: {
            name: string,
            country: {
              name: string,
                currency_code: string
            }
        },
        paymentTerms: string,
        remittanceAddress: string,
        displayName: string,
        clientenVendorID: string,
        apf_group: string,
        Include_In_The_Accounts_Payable_Feed: string,
        rollingContract: boolean,
        companyNetworkStatus: {
            name: string
        }
    }
}