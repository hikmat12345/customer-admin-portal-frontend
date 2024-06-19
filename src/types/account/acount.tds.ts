export type AccountGeneralInfoProps = {
  label?: string;
  isLoading?: boolean;
  data: {
    veroxosId: string;
    accountNumber: string;
    masterAccount: string;
    network: {
      name: string;
      logo: string;
      country: {
        name: string;
        currencyCode: string;
      };
    };
    paymentTerms: string;
    remittanceAddress: string;
    displayName: string;
    clientenVendorID: string;
    accountPayableGroup: string;
    includeApFeed: string;
    rollingContract: boolean;
    companyNetworkStatus: {
      name: string;
    };
  };
};
export type accountServices = {
  number: string;
  service: string;
  serviceType: number;
  serviceDescription: string | null;
  serviceFunctionPurpose: string;
  serviceStatus: number;
  cost: number;
  invoiceDate: string;
}[];

export type InvoiceSummaryTypes = {
  invoiceData: {
    invoiceId: string | number;
    invoiceDate: string;
    country: string;
    fiscalMonthYear: string;
    invoiceDueDate: string;
    previousBalancePaid: number;
    invoiceNumber: string;
    carriedForwardBalance: number;
    adjustments: number;
    taxAndFees: number;
    subTotal: number;
    amountToPay: number;
    total: number;
    invoicePDF: string;
    invoiceType: string;
    apfRequestNumber: string;
    includeInAPF: boolean;
    dateEntered: string;
    status: string;
  };
  vendorData: {
    vendor: string;
    accountNumber: string;
    displayName: string;
    currency: string;
    clientVendorID: string;
    logo: string;
  };
  isLoading: boolean;
};
