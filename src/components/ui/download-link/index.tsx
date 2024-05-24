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

    const fileDownloadFile = async (fileType:"pdf"|"xls"|"docs") => {
        const makeInvoiceId :string = fileType== "docs" ? `${invoice_id}_allocation.csv`: fileType== "xls" ? `${invoice_id}.xlsx`: `${invoice_id}.pdf`;
       await setInvoiceId(makeInvoiceId);
       await setFileType(fileType);
       await refetch(); 
    } 
    useEffect(() => {
        if (!isBlobLoading && !blobError && blobdata &&fileType) {
            downloadFile(fileType, blobdata, invoiceId);
        }
    } , [blobdata, isBlobLoading, blobError])

    return (
        <div className="  flex justify-around items-center">    
            <button onClick={ () => fileDownloadFile("pdf")}>
                <Image className="w-[18.28px] h-6 " src="/svg/pdf-icon.svg" alt="pdf" width={20} height={20} />
            </button>
            <button onClick={ () => fileDownloadFile("xls")}>
                <Image className="w-[18.28px] h-6 " src="/svg/excel-icon.svg" alt="excel" width={20} height={20} />
            </button>
            <button onClick={ () => fileDownloadFile("docs")}>
                <Image className="w-[18.28px] h-6 " src="/svg/word-icon.svg" alt="word" width={20} height={20} />
            </button> 
         </div>
    )
}