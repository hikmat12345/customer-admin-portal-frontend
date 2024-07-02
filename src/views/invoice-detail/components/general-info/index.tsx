'use client';

import React, { useEffect, useState } from 'react';
import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import { useGetSiteInvoiceFile } from '@/hooks/useGetSites';
import { InvoiceSummaryTypes } from '@/types/account/acount';
import formatDate, { downloadFile, moneyFormatter } from '@/utils/utils';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import Image from 'next/image';
import TooltipText from '@/components/ui/textbox';
import VImage from '@/components/ui/image';
import { format, parse } from 'date-fns';
import { DATE_FORMAT, MONTH_YEAR_FORMAT, MONTH_YEAR_FORMAT_SLASH } from '@/utils/constants/constants';

export default function InvoiceSummary({ invoiceData, vendorData, isLoading = false }: InvoiceSummaryTypes) {
  const [invoiceId, setInvoiceId] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
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

  const promisedSetInvoiceNumber = (state: any) => {
    return new Promise((resolve) => {
      setInvoiceNumber(state);
      resolve(state);
    });
  };

  const { data: blobdata, isLoading: isBlobLoading, error: blobError, refetch } = useGetSiteInvoiceFile(invoiceId);

  const fileDownloadFile = async (
    fileId: number,
    fileType: 'pdf' | 'xls' | 'docs',
    invoiceNumber: string,
    isViewPdf?: boolean,
  ) => {
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
    await promisedSetInvoiceNumber(invoiceNumber);
    setFileType(fileType);
    refetch();
  };
  // Parse the input string to a Date object
  const monthAndYear = invoiceData.fiscalMonthYear?.split('/');
  const parsedDate =
    invoiceData.fiscalMonthYear && monthAndYear[0]?.trim() !== 'null' && monthAndYear[1]?.trim() !== 'null'
      ? format(parse(invoiceData.fiscalMonthYear, MONTH_YEAR_FORMAT_SLASH, new Date()), MONTH_YEAR_FORMAT)
      : ' - ';

  useEffect(() => {
    if (!isBlobLoading && !blobError && blobdata && fileType) {
      if (fileType === 'pdf') {
        setIsPdfFileLoading(false);
        setIsShowInBrowserLoading(false);
      } else if (fileType === 'xls') {
        setIsXlsFileLoading(false);
      }
      downloadFile(fileType, blobdata, invoiceId, showInBrowser, invoiceNumber);
    }
  }, [blobdata, isBlobLoading, blobError, fileType, invoiceId]);

  const staticData = [
    {
      label: 'Invoice Date',
      value: invoiceData.invoiceDate ? formatDate(invoiceData.invoiceDate, DATE_FORMAT) : '-',
    },
    { label: 'Fiscal Month / Year', value: parsedDate },
    { label: 'Previous Balance Paid', value: moneyFormatter(invoiceData.previousBalancePaid, vendorData.currency) },
    { label: 'Carried Forward Balance', value: moneyFormatter(invoiceData.carriedForwardBalance, vendorData.currency) },
    { label: 'Tax & Fees', value: moneyFormatter(invoiceData.taxAndFees, vendorData.currency) },
    { label: 'Amount to Pay', value: moneyFormatter(invoiceData.amountToPay, vendorData.currency) },
    { label: 'Invoice (PDF)', value: invoiceData.invoiceId, isPdf: true },
    { label: 'APF Request #', value: invoiceData.apfRequestNumber },
    {
      label: 'Date Entered',
      value: invoiceData.dateEntered ? formatDate(invoiceData.dateEntered, DATE_FORMAT) : '-',
    },
    { label: 'Country', value: invoiceData.country },
    {
      label: 'Invoice Due Date',
      value: invoiceData?.invoiceDueDate ? formatDate(invoiceData.invoiceDueDate, DATE_FORMAT) : '-',
    },
    {
      label: 'Invoice Number',
      value: (
        <TooltipText
          text={invoiceData.invoiceNumber ? invoiceData.invoiceNumber : '-'}
          maxLength={10}
          className="text-[0.875rem] text-[#575757]"
        />
      ),
    },
    { label: 'Adjustments', value: moneyFormatter(invoiceData.adjustments, vendorData.currency) },
    { label: 'Sub Total', value: moneyFormatter(invoiceData.subTotal, vendorData.currency) },
    { label: 'Total', value: moneyFormatter(invoiceData.total, vendorData.currency) },
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
          <div className="text-nowrap lg:block lg:gap-x-[2rem] xl:flex 2xl:gap-x-[3.75rem] max-lg:block">
            <div className="gap-4 sm:block lg:flex lg:w-[100%] xl:w-[58%]">
              <div className="relative flex justify-between sm:w-[100%] lg:w-[50%] lg:gap-x-[2rem] 2xl:gap-x-[3.75rem]">
                <div className="absolute text-[1.375rem] font-[700] text-[#1D46F3]">Invoice Summary</div>
                <div className="pt-14 sm:w-full lg:w-[55%] 2xl:w-[60%]">
                  {staticData.slice(0, 9).map((item, index) => (
                    <div key={index} className="text-[0.875rem] font-[600] leading-7 text-[#000]">
                      {item.label}
                    </div>
                  ))}
                </div>
                <div className="pt-14 sm:w-full lg:w-[45%] 2xl:w-[40%]">
                  {staticData.slice(0, 9).map((item, index) => (
                    <div key={index}>
                      {typeof item.value !== 'undefined' ? (
                        typeof item.value === 'boolean' ? (
                          <div>{item.value ? item.value : ' - '}</div>
                        ) : item.isPdf ? (
                          <div className="cursor-pointer">
                            <Button
                              loading={isShowInBrowserLoading}
                              className="h-0 !bg-transparent py-0 pl-0 text-[0.875rem] leading-7 text-custom-blue underline decoration-2"
                              onClick={() => {
                                setShowInBrowser(true);
                                fileDownloadFile(Number(item.value), 'pdf', invoiceData.invoiceNumber, true);
                              }}
                            >
                              View
                            </Button>
                          </div>
                        ) : typeof item.value == 'string' ? (
                          <TooltipText
                            text={item.value ? item.value?.trim() : ' - '}
                            maxLength={25}
                            className="text-[0.875rem] leading-7 text-[#575757]"
                          />
                        ) : (
                          <div>{item.value ? item.value : ' - '}</div>
                        )
                      ) : (
                        <div className="text-[0.875rem] leading-7 text-[#575757]">-</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center pr-3 sm:mt-5 sm:w-[100%] lg:mt-0 lg:w-[50%] lg:gap-x-[2rem] lg:pt-14 2xl:gap-x-[3.75rem]">
                <div className="sm:w-full lg:w-[55%] 2xl:w-[60%]">
                  {staticData.slice(9).map((item, index) => (
                    <div key={index} className="text-[0.875rem] font-[600] leading-7 text-[#000]">
                      {item.label}
                    </div>
                  ))}
                </div>
                <div className="sm:w-full lg:w-[45%] 2xl:w-[40%]">
                  {staticData.slice(9).map((item, index) => (
                    <div key={index}>
                      {typeof item.value !== 'undefined' ? (
                        typeof item.value === 'boolean' ? (
                          <div>{item.value ? item.value : ' - '}</div>
                        ) : typeof item.value == 'string' ? (
                          <TooltipText
                            text={item.value?.trim() ? item.value : ' - '}
                            maxLength={25}
                            className="text-[0.875rem] leading-7 text-[#575757]"
                          />
                        ) : (
                          <div>{item.value ? item.value : ' - '}</div>
                        )
                      ) : (
                        <div className="text-[0.875rem] leading-7 text-[#575757]">-</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-custom-aluminum lg:mx-auto lg:my-5 lg:block lg:h-[1px] lg:w-[60%] xl:my-0 xl:h-[18em] xl:w-[1px]"></div>
            <div className="block sm:mt-5 lg:mt-0 lg:w-[50%] xl:m-auto xl:w-[41%]">
              <div className="text-[1.375rem] font-[700] text-[#1D46F3]">Vendor</div>
              <div className="flex w-full pt-6 lg:gap-x-[2rem] xl:gap-x-0">
                <div className="sm:w-full lg:w-[55%] xl:w-[40%]">
                  {vendorStaticData.map((item, index) => (
                    <div key={index} className="text-[0.875rem] font-[600] leading-7 text-[#000]">
                      {item.label}
                    </div>
                  ))}
                </div>
                <div className="sm:w-full lg:w-[45%] xl:w-[60%]">
                  {vendorStaticData.map((item, index) => (
                    <div key={index}>
                      {typeof item.value !== 'undefined' ? (
                        typeof item.value === 'boolean' ? (
                          <div>{item.value ? item.value : ' - '}</div>
                        ) : (
                          <TooltipText
                            text={item.value?.trim() ? item.value : ' - '}
                            maxLength={30}
                            className="text-[0.875rem] leading-7 text-[#575757]"
                          />
                        )
                      ) : (
                        <div>-</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <VImage
                  src={process.env.NEXT_PUBLIC_ASSETS_LOGO_PATH + vendorData.logo}
                  alt="Invoice Summary Logo"
                  width={500}
                  height={500}
                  className="h-[190px] w-[230px] object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 mt-[-2.188rem] flex gap-5">
            <Button
              loading={isXlsFileLoading}
              type="submit"
              className="flex items-center rounded border-none bg-transparent px-0 py-2 text-[#219653] animate-in hover:text-[#21965492]"
              onClick={() => fileDownloadFile(Number(invoiceData?.invoiceId), 'xls', invoiceData.invoiceNumber)}
            >
              <Image src="/svg/excel-icon.svg" width={20} height={20} alt="Download Invoice Summary" className="mr-2" />
              <span className="w-[55%] text-[1rem] font-[600] underline decoration-2 lg:leading-7 xl:leading-7">
                Download Invoice Summary{' '}
              </span>
            </Button>
            <Button
              loading={isPdfFileLoading}
              type="submit"
              className="ml-[10px] flex items-center rounded border-none bg-transparent px-4 py-2 text-[#E41323] animate-in hover:text-[#e4132499]"
              onClick={() => fileDownloadFile(Number(invoiceData?.invoiceId), 'pdf', invoiceData.invoiceNumber)}
            >
              <Image src="/svg/pdf-icon.svg" width={20} height={20} alt="Download PDF" className="mr-2" />
              <span className="w-[55%] text-[1rem] font-[600] underline decoration-2 lg:leading-7 xl:leading-7">
                Download PDF
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
