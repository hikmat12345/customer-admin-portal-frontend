"use client";
import GeneralInfoSkeletons from "@/components/ui/summary-skeletons";
import { useGetSiteInvoiceFile } from "@/hooks/useGetSites";
import { InvoiceSummaryTypes } from "@/types/account/acount.tds";
import { downloadFile } from "@/utils/utils";
import { Button } from "@veroxos/design-system/dist/ui/Button/button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function InvoiceSummary({
    invoiceData,
    vendorData,
    isLoading = false,
}: InvoiceSummaryTypes) { 

    const [invoiceId, setInvoiceId] = useState<string>("");
    const [fileType, setFileType] = useState<string>("");
    const [showInBrowser, setShowInBrowser] = useState<boolean>(false); 
    const [isPdfFileLoading, setIsPdfFileLoading] = useState<boolean>(false);
    const [isXlsFileLoading, setIsXlsFileLoading] = useState<boolean>(false);
    const promisedSetInvoice = (state: any) => {
            return new Promise((resolve) => {
                setInvoiceId(state);
                resolve(state);
            });
        }

     const {
        data: blobdata,
        isLoading: isBlobLoading,
        error: blobError,
        refetch
    } = useGetSiteInvoiceFile(invoiceId); 

    const fileDownloadFile = async (fileId:string | number, fileType:"pdf"|"xls"|"docs") => {
        if (fileType === "pdf") {
            setIsPdfFileLoading(true);
        } else if (fileType === "xls") {
            setIsXlsFileLoading(true);
        }
        const makeInvoiceId :string = fileType== "docs" ? `${fileId}_allocation.csv`: fileType== "xls" ? `${fileId}.xlsx`: `${fileId}.pdf`;
            await promisedSetInvoice(makeInvoiceId);
              setFileType(fileType);
               refetch(); 
    } 
    useEffect(() => {
        if (!isBlobLoading && !blobError && blobdata &&fileType) {
            if (fileType === "pdf") {
                setIsPdfFileLoading(false);
            } else if (fileType === "xls") {
                setIsXlsFileLoading(false);
            }
            downloadFile(fileType, blobdata, invoiceId, showInBrowser);
        }

    } , [blobdata, isBlobLoading, blobError, fileType, invoiceId])

    return (
        <div>

            {isLoading ? (
                 <GeneralInfoSkeletons/> 
            ) : (
                <>
                    <div className="flex max-lg:block gap-[19px] pb-6">
                        <div className="w-[55%] max-lg:w-[100%] max-lg:mt-5 flex flex-wrap">
                            <div className='w-[50%]  !pr-[60px]'>
                                <div className='text-custom-blue lg:text-[20px] xl:text-[22px] font-[700] pb-1'>Invoice Summary</div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Invoice Date</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.invoiceDate ? invoiceData.invoiceDate : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Fiscal Month / Year</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.fiscalMonthYear ? invoiceData.fiscalMonthYear : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Previous Balance Paid</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.previousBalancePaid ? invoiceData.previousBalancePaid : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Carried Forward Balance</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.carriedForwardBalance ? invoiceData.carriedForwardBalance : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Tax & Fees</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.taxAndFees ? invoiceData.taxAndFees : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Amount to Pay</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.amountToPay ? invoiceData.amountToPay : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Invoice (PDF)</div>
                                    <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%] text-custom-blue cursor-pointer">
                                        <button className="underline decoration-2" onClick={() =>{setShowInBrowser(true); fileDownloadFile(invoiceData?.invoiceId, "pdf")}}>View</button>
                                    </div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">APF Request #</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.apfRequestNumber ? invoiceData.apfRequestNumber : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Date Entered</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.dateEntered ? invoiceData.dateEntered : "-"}</div>
                                </div>
                            </div>

                            <div className='w-[50%] mt-9 pr-[60px]'>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Country</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.country ? invoiceData.country : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Invoice Due Date</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.invoiceDueDate ? invoiceData.invoiceDueDate : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Invoice Number</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.invoiceNumber ? invoiceData.invoiceNumber : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Adjustments</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.adjustments ? invoiceData.adjustments : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Sub Total</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.subTotal ? invoiceData.subTotal : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Total</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.total ? invoiceData.total : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Invoice Type</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.invoiceType ? invoiceData.invoiceType : "-"}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Include in APF</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.includeInAPF ? 'Yes' : 'No'}</div>
                                </div>
                                <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Status</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{invoiceData.status ? invoiceData.status : "-"}</div>
                                </div>
                            </div>
                        </div> 
                         <div className="w-[1px] bg-custom-aluminum h-[30vh] lg:block"></div>
                           <div className="w-[45%] max-lg:w-[100%] max-lg:mt-5 pl-[50px]">
                            <div className='text-custom-blue lg:text-[20px] xl:text-[22px] font-[700] pb-1  '>Vendor</div>
                            <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Vendor</div>
                                <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{vendorData.vendor ? vendorData.vendor : "-"}</div>
                            </div>
                            <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Account no.</div>
                                <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{vendorData.accountNumber ? vendorData.accountNumber : "-"}</div>
                            </div>

                            <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Display Name</div>
                                <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{vendorData.displayName ? vendorData.displayName : "-"}</div>
                            </div>

                            <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Currency</div>
                                <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{vendorData.currency ? vendorData.currency : "-"}</div>
                            </div>

                            <div className="flex gap-2 lg:py-1 xl:py:1.5">
                                <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Client Vendor ID</div>
                                <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[45%]">{vendorData.clientVendorID ? vendorData.clientVendorID : "-"}</div>
                            </div>

                            <div className="flex gap-2 justify-center lg:py-1 xl:py:1.5 w-full">
                                <Image src={process.env.NEXT_PUBLIC_ASSETS_LOGO_PATH +vendorData.logo} width={500} height={500} alt="Invoice Summary Logo" className="w-[133px]  mt-[10px]" />
                            </div>
                        </div> 
                    </div>
                    <div className="flex justify-start gap-5 mb-4">
                         <Button loading={isXlsFileLoading} type="submit" className="animate-in bg-transparent border-none flex items-center px-4 py-2 text-[#219653]  rounded hover:text-[#21965492]" onClick={() => fileDownloadFile(invoiceData?.invoiceId, "xls")}>
                            <Image src="/svg/excel-icon.svg" width={20} height={20} alt="Download Invoice Summary" className="mr-2" />
                            <span className="underline decoration-2 lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Download Invoice Summary </span>
                        </Button>
                        <Button loading={isPdfFileLoading} type="submit" className="animate-in bg-transparent border-none flex items-center px-4 py-2 text-[#E41323]  rounded hover:text-[#e4132499]" onClick={() => fileDownloadFile(invoiceData?.invoiceId, "pdf")}>
                            <Image src="/svg/pdf-icon.svg" width={20} height={20} alt="Download PDF" className="mr-2" />
                            <span className="underline decoration-2 lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[55%]">Download PDF</span>
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

