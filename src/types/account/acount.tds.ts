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
              currencyCode: string
            }
        },
        paymentTerms: string,
        remittanceAddress: string,
        displayName: string,
        clientenVendorID: string,
        accountPayableGroup: string,
        includeApFeed: string,
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