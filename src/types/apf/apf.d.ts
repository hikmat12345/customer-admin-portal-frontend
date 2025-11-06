export type APFGeneralInfoProps = {
  data: {
    veroxosId: string;
    client: string;
    sentBy: string;
    accountGroup: string;
    fiscalMonth: string;
    fiscalYear: string;
    totalInvoices: number;
    totalAllocation: number;
    totalValue: number;
    deliveryMethod: string;
    deliveryDestination: string;
    sentAt: Date;
  };
  isLoading?: boolean;
  label?: string;
};
