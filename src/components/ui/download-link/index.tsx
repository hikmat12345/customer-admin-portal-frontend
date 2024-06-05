import { useGetSiteInvoiceFile } from "@/hooks/useGetSites";
import { downloadFile } from "@/utils/utils";
import { Button } from "@veroxos/design-system/dist/ui/Button/button";
import Image from "next/image";
import { useEffect, useState } from "react";

export function DownloadAbleLink({ invoice_id, index }: { invoice_id: string | number, index: number }) {
    const [invoiceId, setInvoiceId] = useState<string>("");
    const [fileType, setFileType] = useState<string>("");
    const [isPdfFileLoading, setIsPdfFileLoading] = useState<boolean | string>(false);
    const [isExcelFileLoading, setIsExcelFileLoading] = useState<boolean | string>(false);
    const [isDocsFileLoading, setIsDocsFileLoading] = useState<boolean | string>(false);
    const promisedSetState = (state: any) => {
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

    const fileDownloadFile = (fileId: string | number, fileType: "pdf" | "xls" | "docs", index: number) => {
        if (fileType == "pdf") {
            setIsPdfFileLoading(`pdf-${index}`)
        } else if (fileType == "xls") {
            setIsExcelFileLoading(`xls-${index}`)
        } else if (fileType == "docs") {
            setIsDocsFileLoading(`docs-${index}`)
        }
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
        if (!isBlobLoading && !blobError && blobdata && fileType) {
            if (fileType == "pdf") {
                setIsPdfFileLoading(false)
            } else if (fileType == "xls") {
                setIsExcelFileLoading(false)
            } else if (fileType == "docs") {
                setIsDocsFileLoading(false)
            }
            downloadFile(fileType, blobdata, invoiceId);
        }
    }, [blobdata, isBlobLoading, blobError, fileType, invoiceId])

    return (
        <div className="  flex justify-around items-center">

            <Button loading={`pdf-${index}` == isPdfFileLoading ? true : false} className="text-black animate-in bg-transparent border-none" onClick={() => fileDownloadFile(invoice_id, "pdf", index)}>
                <Image className="w-[18.28px] h-6 " src="/svg/pdf-icon.svg" alt="pdf" width={20} height={20} />
            </Button>

            <Button loading={`xls-${index}` == isExcelFileLoading ? true : false} className="text-black animate-in bg-transparent border-none" onClick={() => fileDownloadFile(invoice_id, "xls", index)}>
                <Image className="w-[18.28px] h-6 " src="/svg/excel-icon.svg" alt="excel" width={20} height={20} />
            </Button>
            <Button loading={`docs-${index}` == isDocsFileLoading ? true : false} className="text-black animate-in bg-transparent border-none" onClick={() => fileDownloadFile(invoice_id, "docs", index)}>
                <Image className="w-[18.28px] h-6 " src="/svg/word-icon.svg" alt="word" width={20} height={20} />
            </Button>
        </div>
    )
}