export type AccountGeneralInfoProps = {
    label?: string,
    isLoading?: boolean,
    data: {
        veroxosId: string,
        accountNumber: string,
        masterAccount: string,
        network: {
            name: string,
            logo: string,
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
export type accountServices = {
        number: string;
        service: string;
        serviceType: number;
        serviceDescription: string | null;
        serviceFunctionPurpose: string;
        serviceStatus: number;
        cost: number;
        invoiceDate: string;
    }[]