"use client";
import { useGetSiteInvoiceFile } from "@/hooks/useGetSites";
import { InvoiceSummaryTypes } from "@/types/account/acount.tds";
import { downloadFile } from "@/utils/utils";
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
    const {
        data: blobdata,
        isLoading: isBlobLoading,
        error: blobError,
        refetch
    } = useGetSiteInvoiceFile(invoiceId); 

    const fileDownloadFile = async (fileId:string | number, fileType:"pdf"|"xls"|"docs") => {
        const makeInvoiceId :string = fileType== "docs" ? `${fileId}_allocation.csv`: fileType== "xls" ? `${fileId}.xlsx`: `${fileId}.pdf`;
              setInvoiceId(makeInvoiceId);
              setFileType(fileType);
              refetch(); 
    } 
    useEffect(() => {
        if (!isBlobLoading && !blobError && blobdata &&fileType) {
            downloadFile(fileType, blobdata, invoiceId, showInBrowser);
        }
    } , [blobdata, isBlobLoading, blobError, fileType, invoiceId])

    return (
        <div>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="flex max-lg:block gap-[19px] pb-6">
                        <div className="w-[55%] max-lg:w-[100%] max-lg:mt-5 flex flex-wrap">
                            <div className='w-[50%]  !pr-[60px]'>
                                <div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pb-1'>Invoice Summary</div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Invoice Date</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.invoiceDate ? invoiceData.invoiceDate : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Fiscal Month / Year</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.fiscalMonthYear ? invoiceData.fiscalMonthYear : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Previous Balance Paid</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.previousBalancePaid ? invoiceData.previousBalancePaid : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Carried Forward Balance</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.carriedForwardBalance ? invoiceData.carriedForwardBalance : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Tax & Fees</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.taxAndFees ? invoiceData.taxAndFees : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Amount to Pay</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.amountToPay ? invoiceData.amountToPay : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Invoice (PDF)</div>
                                    <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 text-[#1D46F3] cursor-pointer">
                                        <button className="underline decoration-2" onClick={() =>{setShowInBrowser(true); fileDownloadFile(invoiceData?.invoiceId, "pdf")}}>View</button>
                                    </div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">APF Request #</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.apfRequestNumber ? invoiceData.apfRequestNumber : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Date Entered</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.dateEntered ? invoiceData.dateEntered : "-"}</div>
                                </div>
                            </div>

                            <div className='w-[50%] mt-9 pr-[60px]'>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Country</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.country ? invoiceData.country : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Invoice Due Date</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.invoiceDueDate ? invoiceData.invoiceDueDate : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Invoice Number</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.invoiceNumber ? invoiceData.invoiceNumber : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Adjustments</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.adjustments ? invoiceData.adjustments : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Sub Total</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.subTotal ? invoiceData.subTotal : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Total</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.total ? invoiceData.total : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Invoice Type</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.invoiceType ? invoiceData.invoiceType : "-"}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Include in APF</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.includeInAPF ? 'Yes' : 'No'}</div>
                                </div>
                                <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                    <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Status</div>
                                    <div className="lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{invoiceData.status ? invoiceData.status : "-"}</div>
                                </div>
                            </div>
                        </div> 
                         <div className="w-[1px] bg-[#D6D6D6] h-[30vh] lg:block"></div>
                           <div className="w-[45%] max-lg:w-[100%] max-lg:mt-5 pl-[50px]">
                            <div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pb-1  '>Invoice Summary</div>
                            <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Vendor</div>
                                <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{vendorData.vendor ? vendorData.vendor : "-"}</div>
                            </div>
                            <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Account no.</div>
                                <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{vendorData.accountNumber ? vendorData.accountNumber : "-"}</div>
                            </div>

                            <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Display Name</div>
                                <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{vendorData.displayName ? vendorData.displayName : "-"}</div>
                            </div>

                            <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Currency</div>
                                <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{vendorData.currency ? vendorData.currency : "-"}</div>
                            </div>

                            <div className="flex gap-2 justify-between lg:py-1 xl:py:1.5">
                                <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Client Vendor ID</div>
                                <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{vendorData.clientVendorID ? vendorData.clientVendorID : "-"}</div>
                            </div>

                            <div className="flex gap-2 justify-center lg:py-1 xl:py:1.5 w-full">
                                <Image src={vendorData.logo} width={500} height={500} alt="Invoice Summary Logo" className="w-[233px]  mt-[10px]" />
                            </div>
                        </div> 
                    </div>
                    <div className="flex justify-start gap-5 mb-4">
                        <button className="flex items-center px-4 py-2 text-[#219653]  rounded hover:text-[#21965492]" onClick={() => fileDownloadFile(invoiceData?.invoiceId, "xls")}>
                            <Image src="/svg/excel-icon.svg" width={20} height={20} alt="Download Invoice Summary" className="mr-2" />
                            <span className="underline decoration-2 lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Download Invoice Summary </span>
                        </button>
                        <button className="flex items-center px-4 py-2 text-[#E41323]  rounded hover:text-[#e4132499]" onClick={() => fileDownloadFile(invoiceData?.invoiceId, "pdf")}>
                            <Image src="/svg/pdf-icon.svg" width={20} height={20} alt="Download PDF" className="mr-2" />
                            <span className="underline decoration-2 lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Download PDF</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

