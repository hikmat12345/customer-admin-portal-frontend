'use client';
import React from 'react';
import {
  useGetInvoiceActivityLog,
  useGetInvoiceSummary,
  useGetPaymentInfo,
  useGetRemittanceAddress,
  useGetVendorInfo,
} from '@/hooks/useGetInvoices';
import { Separator } from '@radix-ui/react-dropdown-menu';
import InvoiceRemittanceAddress from './components/invoice-remittance-address';
import InvoicePaymentInfo from './components/Invoice-payment-info';
import InvoiceSummary from './components/general-info';
import TableData from '@/components/ui/summary-tables/table';
import ScrollTabs from '@/components/ui/scroll-tabs';
import { format, parseISO } from 'date-fns';
import { DATE_TIME_FORMAT } from '@/utils/constants/constants';

type InvoiceSummaryPageProps = {
  invoiceId: number;
};
const InvoiceSummaryPage = ({ invoiceId }: InvoiceSummaryPageProps) => {
  const invoice_id = invoiceId;
  const { data: invoiceSummaryData, isLoading: isInvoiceSummaryLoading } = useGetInvoiceSummary(Number(invoice_id));
  const { data: invoiceActivityLogData, isLoading: isInvoiceActivityLogLoading } = useGetInvoiceActivityLog(
    Number(invoice_id),
  );
  const invoiceActivityLog = invoiceActivityLogData?.map((activity: any) => ({
    stage: activity.description,
    who: activity.administrator.firstName + ' ' + activity.administrator.lastName,
    when: format(parseISO(activity.created), DATE_TIME_FORMAT),
  }));
  const { data: remittanceAddressData, isLoading: isRemittanceAddressLoading } = useGetRemittanceAddress(
    Number(invoice_id),
  );
  const { data: vendorInfoData, isLoading: isVendorInfoLoading } = useGetVendorInfo(Number(invoice_id));
  const { data: paymentInfoData, isLoading: isPaymentInfoLoading } = useGetPaymentInfo(Number(invoice_id));

  const {
    invoiceId: id,
    invoiceDate,
    country,
    fiscalMonthYear,
    dueDate,
    balancePaid,
    invoiceNumber,
    carriedForwardBalance,
    adjustments,
    taxAndFees,
    subTotal,
    amountToPay,
    total,
    invoicePDF,
    invoiceType,
    apfRequestNumber,
    includeInAP,
    createdDate,
    status,
  } = invoiceSummaryData || {};
  const vendorInfo = {
    vendor: vendorInfoData?.invoice?.companyNetwork?.network?.name,
    accountNumber: vendorInfoData?.invoice?.companyNetwork?.accountNumber,
    displayName: vendorInfoData?.invoice?.companyNetwork?.displayName,
    currency: vendorInfoData?.invoice?.companyNetwork?.network?.country?.currencyCode,
    clientVendorID: vendorInfoData?.invoice?.companyNetwork?.sapVendorNumber,
    logo: vendorInfoData?.invoice?.companyNetwork?.network?.logo,
  };

  const listOfTabs = [];
  if (invoiceActivityLog?.length > 0) {
    listOfTabs.push('invoice-activity-log');
  }
  return (
    <div className="w-full rounded-lg border border-custom-lightGray bg-custom-white px-7 py-4">
      <ScrollTabs tabs={['general-information', 'invoice-payment-information', ...listOfTabs]} rightText={id}>
        <div id="general-information">
          <InvoiceSummary
            invoiceData={{
              invoiceId: id,
              invoiceDate: invoiceDate,
              country: country,
              fiscalMonthYear: fiscalMonthYear,
              invoiceDueDate: dueDate,
              previousBalancePaid: balancePaid,
              invoiceNumber: invoiceNumber,
              carriedForwardBalance: carriedForwardBalance,
              adjustments: adjustments,
              taxAndFees: taxAndFees,
              subTotal: subTotal,
              amountToPay: amountToPay,
              total: total,
              invoicePDF: invoicePDF,
              invoiceType: invoiceType,
              apfRequestNumber: apfRequestNumber,
              includeInAPF: includeInAP,
              dateEntered: createdDate,
              status: status,
            }}
            vendorData={vendorInfo}
            isLoading={isInvoiceSummaryLoading}
          />
          <Separator className="h-[1.0px] bg-[#5d5b5b61]" />
        </div>

        <div id="invoice-payment-information">
          <div className="flex gap-[19px] pb-6 max-lg:block">
            <div className="w-[55%] max-lg:mt-5 max-lg:w-[100%]">
              <InvoicePaymentInfo paymentData={paymentInfoData} isLoading={isPaymentInfoLoading} />
            </div>
            <div className="w-[45%] max-lg:mt-5 max-lg:w-[100%]">
              <InvoiceRemittanceAddress
                remittanceData={remittanceAddressData?.data}
                isLoading={isRemittanceAddressLoading}
              />
            </div>
          </div>
          <Separator className="h-[1.0px] bg-[#5d5b5b61]" />
        </div>

        {invoiceActivityLog?.length > 0 && isInvoiceActivityLogLoading == false && (
          <div id="invoice-activity-log">
            <TableData label="Invoice Activity Log" data={invoiceActivityLog} loading={isInvoiceActivityLogLoading} />
          </div>
        )}
      </ScrollTabs>
    </div>
  );
};

export default InvoiceSummaryPage;
