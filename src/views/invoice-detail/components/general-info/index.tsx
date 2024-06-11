'use client';

import React, { useEffect, useState } from 'react';
import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import { useGetSiteInvoiceFile } from '@/hooks/useGetSites';
import { InvoiceSummaryTypes } from '@/types/account/acount.tds';
import  formatDate, { downloadFile } from '@/utils/utils';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import Image from 'next/image';
import TooltipText from '@/components/ui/textbox';
import VImage from '@/components/ui/image';

export default function InvoiceSummary({ invoiceData, vendorData, isLoading = false }: InvoiceSummaryTypes) {
  const [invoiceId, setInvoiceId] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [showInBrowser, setShowInBrowser] = useState<boolean>(false);
  const [isPdfFileLoading, setIsPdfFileLoading] = useState<boolean>(false);
  const [isXlsFileLoading, setIsXlsFileLoading] = useState<boolean>(false);
  const [isShowInBrowserLoading, setIsShowInBrowserLoading] = useState<boolean>(false);
  const promisedSetInvoice = (state: any) => {
    return new Promise((resolve) => {
      setInvoiceId(state);
      resolve(state);
    });
  };

  const { data: blobdata, isLoading: isBlobLoading, error: blobError, refetch } = useGetSiteInvoiceFile(invoiceId);
 
  const fileDownloadFile = async (fileId: string | number, fileType: 'pdf' | 'xls' | 'docs', isViewPdf?: boolean) => {
    if (isViewPdf && fileType === 'pdf') {
      setIsShowInBrowserLoading(true);
    } else if (fileType === 'pdf') {
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
  }, [blobdata, isBlobLoading, blobError, fileType, invoiceId]);

  const staticData = [
    {
      label: 'Invoice Date',
      value: invoiceData.invoiceDate ? formatDate(invoiceData.invoiceDate, 'MMM dd, yyyy') : '-',
    },
    { label: 'Fiscal Month / Year', value: invoiceData.fiscalMonthYear },
    { label: 'Previous Balance Paid', value: invoiceData.previousBalancePaid },
    { label: 'Carried Forward Balance', value: invoiceData.carriedForwardBalance },
    { label: 'Tax & Fees', value: invoiceData.taxAndFees },
    { label: 'Amount to Pay', value: invoiceData.amountToPay },
    { label: 'Invoice (PDF)', value: invoiceData.invoiceId, isPdf: true },
    { label: 'APF Request #', value: invoiceData.apfRequestNumber },
    {
      label: 'Date Entered',
      value: invoiceData.dateEntered ? formatDate(invoiceData.dateEntered, 'MMM dd, yyyy') : '-',
    },
    { label: 'Country', value: invoiceData.country },
    {
      label: 'Invoice Due Date',
      value: invoiceData?.invoiceDueDate ? formatDate(invoiceData.invoiceDueDate, 'MMM dd, yyyy') : '-',
    },
    { label: 'Invoice Number', value: invoiceData.invoiceNumber },
    { label: 'Adjustments', value: invoiceData.adjustments },
    { label: 'Sub Total', value: invoiceData.subTotal },
    { label: 'Total', value: invoiceData.total },
    { label: 'Invoice Type', value: invoiceData.invoiceType ? invoiceData.invoiceType : '-' },
    { label: 'Include in APF', value: invoiceData.includeInAPF ? 'Yes' : 'No' },
    { label: 'Status', value: invoiceData.status },
  ];
  const vendorStaticData = [
    { label: 'Vendor', value: vendorData.vendor },
    { label: 'Account no.', value: vendorData.accountNumber },
    { label: 'Display Name', value: vendorData.displayName },
    { label: 'Currency', value: vendorData.currency },
    { label: 'Client Vendor ID', value: vendorData.clientVendorID },
  ];
  return (
    <div>
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div>
          <div className="flex pb-6 lg:gap-x-[32px] xl:gap-x-[60px] max-lg:block">
            <div className="flex w-[29%] justify-between lg:gap-x-[32px] xl:gap-x-[60px] max-lg:mt-5 max-lg:w-[100%]">
              <div className="w-[60%]">
                {staticData.slice(0, 9).map((item, index) => (
                  <div key={index} className="font-[600] leading-7 text-[#000] lg:text-[13px] xl:text-[14px]">
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="w-[40%]">
                {staticData.slice(0, 9).map((item, index) => (
                  <div key={index}>
                    {typeof item.value !== 'undefined' ? (
                      typeof item.value === 'boolean' ? (
                        <div>{item.value ? item.value : ' - '}</div>
                      ) : item.isPdf ? (
                        <div className="cursor-pointer text-custom-blue">
                          <Button
                            loading={isShowInBrowserLoading}
                            className="leading-7 underline decoration-2 lg:text-[13px] xl:text-[14px]"
                            onClick={() => {
                              setShowInBrowser(true);
                              fileDownloadFile(item.value, 'pdf', true);
                            }}
                          >
                            View
                          </Button>
                        </div>
                      ) : typeof item.value == 'string' ? (
                        <TooltipText
                          text={item.value ? item.value : ' - '}
                          maxLength={25}
                          className="leading-7 text-[#575757] lg:text-[13px] xl:text-[14px]"
                        />
                      ) : (
                        <div>{item.value ? item.value : ' - '}</div>
                      )
                    ) : (
                      <div>-</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-[29%] justify-center pr-3 lg:gap-x-[32px] xl:gap-x-[60px] max-lg:mt-5 max-lg:w-[100%]">
              <div className="w-[60%]">
                {staticData.slice(9).map((item, index) => (
                  <div key={index} className="font-[600] leading-7 text-[#000] lg:text-[13px] xl:text-[14px]">
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="w-[40%]">
                {staticData.slice(9).map((item, index) => (
                  <div key={index}>
                    {typeof item.value !== 'undefined' ? (
                      typeof item.value === 'boolean' ? (
                        <div>{item.value ? item.value : ' - '}</div>
                      ) : typeof item.value == 'string' ? (
                        <TooltipText
                          text={item.value ? item.value : ' - '}
                          maxLength={25}
                          className="leading-7 text-[#575757] lg:text-[13px] xl:text-[14px]"
                        />
                      ) : (
                        <div>{item.value ? item.value : ' - '}</div>
                      )
                    ) : (
                      <div>-</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[15rem] w-[1px] bg-custom-aluminum lg:block"></div>
            <div className="w-[41%] max-lg:mt-5 block m-auto">
              <div className="flex w-full">
                <div className="w-[40%]">
                  {vendorStaticData.map((item, index) => (
                    <div key={index} className="font-[600] leading-7 text-[#000] lg:text-[13px] xl:text-[14px]">
                      {item.label}
                    </div>
                  ))}
                </div>
                <div className="w-[60%]">
                  {vendorStaticData.map((item, index) => (
                    <div key={index}>
                      {typeof item.value !== 'undefined' ? (
                        typeof item.value === 'boolean' ? (
                          <div>{item.value ? item.value : ' - '}</div>
                        ) : (
                          <TooltipText
                            text={item.value ? item.value : ' - '}
                            maxLength={30}
                            className="leading-7 text-[#575757] lg:text-[13px] xl:text-[14px]"
                          />
                        )
                      ) : (
                        <div>-</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <VImage
                src={process.env.NEXT_PUBLIC_ASSETS_LOGO_PATH + vendorData.logo}
                alt="Invoice Summary Logo"
                width={200}
                height={200}
                className=" w-[390px] h-[108px] object-contain"
              />
            </div>
          </div>

          <div className="mb-4 mt-4 flex gap-5">
            <Button
              loading={isXlsFileLoading}
              type="submit"
              className="flex items-center rounded border-none bg-transparent px-0 py-2 text-[#219653] animate-in hover:text-[#21965492]"
              onClick={() => fileDownloadFile(invoiceData?.invoiceId, 'xls')}
            >
              <Image src="/svg/excel-icon.svg" width={20} height={20} alt="Download Invoice Summary" className="mr-2" />
              <span className="w-[55%] font-[600] underline decoration-2 lg:text-[13px] lg:leading-7 xl:text-[16px] xl:leading-7">
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
              <span className="w-[55%] font-[600] underline decoration-2 lg:text-[13px] lg:leading-7 xl:text-[16px] xl:leading-7">
                Download PDF
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
