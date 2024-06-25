import { useGetSiteInvoiceFile } from '@/hooks/useGetSites';
import { downloadFile } from '@/utils/utils';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function DownloadAbleLink({ invoice_id, index, invoiceNumber }: { invoice_id: string | number; index: number, invoiceNumber: string }) {
  const [invoiceId, setInvoiceId] = useState<string>('');
  const [invoiceNumberState, setInvoiceNumberState] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [isPdfFileLoading, setIsPdfFileLoading] = useState<boolean | string>(false);
  const [isExcelFileLoading, setIsExcelFileLoading] = useState<boolean | string>(false);
  const [isDocsFileLoading, setIsDocsFileLoading] = useState<boolean | string>(false);
  const promisedSetInvoiceNumber = (state: any) => {
    return new Promise((resolve) => {
      setInvoiceNumberState(state);
      resolve(state);
    });
  };

  const { data: blobdata, isLoading: isBlobLoading, error: blobError, refetch } = useGetSiteInvoiceFile(invoiceId);

  const fileDownloadFile = async (fileId: string | number, fileType: 'pdf' | 'xls' | 'docs', index: number, invoiceNumber?: string) => {
    if (fileType == 'pdf') {
      setIsPdfFileLoading(`pdf-${index}`);
    } else if (fileType == 'xls') {
      setIsExcelFileLoading(`xls-${index}`);
    } else if (fileType == 'docs') {
      setIsDocsFileLoading(`docs-${index}`);
    }
    const makeInvoiceId: string =
      fileType === 'docs' ? `${fileId}_allocation.csv` : fileType === 'xls' ? `${fileId}.xlsx` : `${fileId}.pdf`;
    setInvoiceId(makeInvoiceId);
   await promisedSetInvoiceNumber(invoiceNumber);
    setFileType(fileType);
  };

  useEffect(() => {
    if (invoiceId && fileType) {
      refetch();
    }
  }, [invoiceId, fileType, refetch]);
  useEffect(() => {
    if (!isBlobLoading && !blobError && blobdata && fileType) {
      if (fileType == 'pdf') {
        setIsPdfFileLoading(false);
      } else if (fileType == 'xls') {
        setIsExcelFileLoading(false);
      } else if (fileType == 'docs') {
        setIsDocsFileLoading(false);
      }
            
      downloadFile(fileType, blobdata, invoiceId,false, invoiceNumberState);
    }
  }, [blobdata, isBlobLoading, blobError, fileType, invoiceId]);

  return (
    <div className="flex w-full items-center">
      {`pdf-${index}` == isPdfFileLoading ? (
        <Loader className="ml-6 mr-2 h-6 w-[24.28px] animate-spin" />
      ) : (
        <Button
          className="border-none bg-transparent text-black"
          onClick={() => fileDownloadFile(invoice_id, 'pdf', index, invoiceNumber)}
        >
          <Image className="h-10 w-[24.28px]" src="/svg/pdf-icon.svg" alt="pdf" width={60} height={60} />
        </Button>
      )}
      {`xls-${index}` == isExcelFileLoading ? (
        <Loader className="ml-6 mr-2 h-6 w-[24.28px] animate-spin" />
      ) : (
        <Button
          className="border-none bg-transparent p-0 !px-1 py-2 text-black"
          onClick={() => fileDownloadFile(invoice_id, 'xls', index, invoiceNumber)}
        >
          <Image className="h-10 w-[24.28px]" src="/svg/excel-icon.svg" alt="excel" width={60} height={60} />
        </Button>
      )}
      {/* I need this commented code later   */}
      {/* <Button loading={`docs-${index}` == isDocsFileLoading ? true : false} className="text-black animate-in bg-transparent border-none" onClick={() => fileDownloadFile(invoice_id, "docs", index)}>
                <Image className="w-[18.28px] h-6 " src="/svg/word-icon.svg" alt="word" width={20} height={20} />
            </Button> */}
    </div>
  );
}
