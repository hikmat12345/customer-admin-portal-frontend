import { useGetSiteInvoiceFile } from "@/hooks/useGetSites";
import { downloadFile } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export function DownloadAbleLink({invoice_id}: {invoice_id: string | number}) {
    const [invoiceId, setInvoiceId] = useState<string>("");
    const [fileType, setFileType] = useState<string>("");
    const {
        data: blobdata,
        isLoading: isBlobLoading,
        error: blobError,
        refetch
    } = useGetSiteInvoiceFile(invoiceId); 

    const fileDownloadFile = (fileId: string | number, fileType: "pdf" | "xls" | "docs") => {
        const makeInvoiceId: string = fileType === "docs" ? `${fileId}_allocation.csv` : fileType === "xls" ? `${fileId}.xlsx` : `${fileId}.pdf`;
        setInvoiceId(makeInvoiceId);
        setFileType(fileType);
    };
  
   useEffect(() => {
        if (invoiceId && fileType) {
            refetch();
        }
    }, [invoiceId, fileType, refetch]);
    useEffect(() => {
        if (!isBlobLoading && !blobError && blobdata &&fileType) {
            downloadFile(fileType, blobdata, invoiceId);
        }
    } , [blobdata, isBlobLoading, blobError, fileType, invoiceId])

    return (
        <div className="  flex justify-around items-center">    
            <button onClick={ () => fileDownloadFile(invoice_id, "pdf")}>
                <Image className="w-[18.28px] h-6 " src="/svg/pdf-icon.svg" alt="pdf" width={20} height={20} />
            </button>
            <button onClick={ () => fileDownloadFile(invoice_id, "xls")}>
                <Image className="w-[18.28px] h-6 " src="/svg/excel-icon.svg" alt="excel" width={20} height={20} />
            </button>
            <button onClick={ () => fileDownloadFile(invoice_id, "docs")}>
                <Image className="w-[18.28px] h-6 " src="/svg/word-icon.svg" alt="word" width={20} height={20} />
            </button> 
         </div>
    )
}