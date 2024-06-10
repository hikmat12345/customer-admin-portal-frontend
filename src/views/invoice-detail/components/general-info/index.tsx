'use client';

import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import { useGetSiteInvoiceFile } from '@/hooks/useGetSites';
import { InvoiceSummaryTypes } from '@/types/account/acount.tds';
import { downloadFile } from '@/utils/utils';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function InvoiceSummary({ invoiceData, vendorData, isLoading = false }: InvoiceSummaryTypes) {
  const [invoiceId, setInvoiceId] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [showInBrowser, setShowInBrowser] = useState<boolean>(false);
  const [isPdfFileLoading, setIsPdfFileLoading] = useState<boolean>(false);
  const [isXlsFileLoading, setIsXlsFileLoading] = useState<boolean>(false);
  const promisedSetInvoice = (state: any) =>
    new Promise((resolve) => {
      setInvoiceId(state);
      resolve(state);
    });

  const { data: blobdata, isLoading: isBlobLoading, error: blobError, refetch } = useGetSiteInvoiceFile(invoiceId);

  const fileDownloadFile = async (fileId: string | number, fileType: 'pdf' | 'xls' | 'docs') => {
    if (fileType === 'pdf') {
      setIsPdfFileLoading(true);
    } else if (fileType === 'xls') {
      setIsXlsFileLoading(true);
    }
    const makeInvoiceId: string =
      fileType == 'docs' ? `${fileId}_allocation.csv` : fileType == 'xls' ? `${fileId}.xlsx` : `${fileId}.pdf`;
    await promisedSetInvoice(makeInvoiceId);
    setFileType(fileType);
    refetch();
  };
  useEffect(() => {
    if (!isBlobLoading && !blobError && blobdata && fileType) {
      if (fileType === 'pdf') {
        setIsPdfFileLoading(false);
      } else if (fileType === 'xls') {
        setIsXlsFileLoading(false);
      }
      downloadFile(fileType, blobdata, invoiceId, showInBrowser);
    }
  }, [blobdata, isBlobLoading, blobError, fileType, invoiceId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <>
          <div className="flex gap-[19px] pb-6 max-lg:block">
            <div className="flex w-[55%] flex-wrap max-lg:mt-5 max-lg:w-[100%]">
              <div className="w-[50%] !pr-[60px]">
                <div className="pb-1 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">Invoice Summary</div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Invoice Date
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.invoiceDate ? invoiceData.invoiceDate : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Fiscal Month / Year
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.fiscalMonthYear ? invoiceData.fiscalMonthYear : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Previous Balance Paid
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.previousBalancePaid ? invoiceData.previousBalancePaid : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Carried Forward Balance
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.carriedForwardBalance ? invoiceData.carriedForwardBalance : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Tax & Fees
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.taxAndFees ? invoiceData.taxAndFees : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Amount to Pay
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.amountToPay ? invoiceData.amountToPay : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Invoice (PDF)
                  </div>
                  <div className="w-[45%] cursor-pointer text-left text-custom-blue lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    <button
                      className="underline decoration-2"
                      onClick={() => {
                        setShowInBrowser(true);
                        fileDownloadFile(invoiceData?.invoiceId, 'pdf');
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    APF Request #
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.apfRequestNumber ? invoiceData.apfRequestNumber : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Date Entered
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.dateEntered ? invoiceData.dateEntered : '-'}
                  </div>
                </div>
              </div>

              <div className="mt-9 w-[50%] pr-[60px]">
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Country
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.country ? invoiceData.country : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Invoice Due Date
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.invoiceDueDate ? invoiceData.invoiceDueDate : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Invoice Number
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.invoiceNumber ? invoiceData.invoiceNumber : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Adjustments
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.adjustments ? invoiceData.adjustments : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Sub Total
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.subTotal ? invoiceData.subTotal : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Total
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.total ? invoiceData.total : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Invoice Type
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.invoiceType ? invoiceData.invoiceType : '-'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Include in APF
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.includeInAPF ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="xl:py:1.5 flex gap-2 lg:py-1">
                  <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                    Status
                  </div>
                  <div className="w-[45%] lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                    {invoiceData.status ? invoiceData.status : '-'}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[30vh] w-[1px] bg-custom-aluminum lg:block" />
            <div className="w-[45%] pl-[50px] max-lg:mt-5 max-lg:w-[100%]">
              <div className="pb-1 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">Vendor</div>
              <div className="xl:py:1.5 flex gap-2 lg:py-1">
                <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">Vendor</div>
                <div className="w-[45%] text-left lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                  {vendorData.vendor ? vendorData.vendor : '-'}
                </div>
              </div>
              <div className="xl:py:1.5 flex gap-2 lg:py-1">
                <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                  Account no.
                </div>
                <div className="w-[45%] text-left lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                  {vendorData.accountNumber ? vendorData.accountNumber : '-'}
                </div>
              </div>

              <div className="xl:py:1.5 flex gap-2 lg:py-1">
                <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                  Display Name
                </div>
                <div className="w-[45%] text-left lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                  {vendorData.displayName ? vendorData.displayName : '-'}
                </div>
              </div>

              <div className="xl:py:1.5 flex gap-2 lg:py-1">
                <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                  Currency
                </div>
                <div className="w-[45%] text-left lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                  {vendorData.currency ? vendorData.currency : '-'}
                </div>
              </div>

              <div className="xl:py:1.5 flex gap-2 lg:py-1">
                <div className="w-[55%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                  Client Vendor ID
                </div>
                <div className="w-[45%] text-left lg:text-[12px] lg:leading-6 xl:text-[14px] xl:leading-7">
                  {vendorData.clientVendorID ? vendorData.clientVendorID : '-'}
                </div>
              </div>

              <div className="xl:py:1.5 flex w-full justify-center gap-2 lg:py-1">
                <Image
                  src={process.env.NEXT_PUBLIC_ASSETS_LOGO_PATH + vendorData.logo}
                  width={500}
                  height={500}
                  alt="Invoice Summary Logo"
                  className="mt-[10px] w-[133px]"
                />
              </div>
            </div>
          </div>
          <div className="mb-4 flex justify-start gap-5">
            <Button
              loading={isXlsFileLoading}
              type="submit"
              className="flex items-center rounded border-none bg-transparent px-4 py-2 text-[#219653] animate-in hover:text-[#21965492]"
              onClick={() => fileDownloadFile(invoiceData?.invoiceId, 'xls')}
            >
              <Image src="/svg/excel-icon.svg" width={20} height={20} alt="Download Invoice Summary" className="mr-2" />
              <span className="w-[55%] font-[600] underline decoration-2 lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                Download Invoice Summary{' '}
              </span>
            </Button>
            <Button
              loading={isPdfFileLoading}
              type="submit"
              className="flex items-center rounded border-none bg-transparent px-4 py-2 text-[#E41323] animate-in hover:text-[#e4132499]"
              onClick={() => fileDownloadFile(invoiceData?.invoiceId, 'pdf')}
            >
              <Image src="/svg/pdf-icon.svg" width={20} height={20} alt="Download PDF" className="mr-2" />
              <span className="w-[55%] font-[600] underline decoration-2 lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                Download PDF
              </span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
