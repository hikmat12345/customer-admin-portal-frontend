'use client';

import CreateQueryString from '@/utils/createQueryString';
import Pagination from '@/components/ui/pagination';
import { useEffect } from 'react';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGetAPFDetail, useGetAPFDetailFiles, useGetAPFInvoices } from '@/hooks/useGetAPFAccount';
import APFAccountTableSkeleton from './components/APFAccountTable/APFAccountsTableSkeleton';
import APFAccountTable from './components/APFAccountTable';
import Image from 'next/image';
import APFGeneralInfo from './components/general-information';
import { Separator } from '@/components/ui/separator';
import Fileslist from './components/files-list';
import { makeAnyFileUrlFromBase64 } from '@/utils/utils';
import toast from 'react-hot-toast';
import Error from '@/components/ui/error';

type APFSummaryProps = {
  apfPageId: number;
};
function APFAccountSummaryPage({ apfPageId }: APFSummaryProps) {
  const limit = 7;
  const createQueryString = CreateQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys()) || [];
  const page = searchParams?.get('page') || '1';
  const offset = +page - 1;

  const {
    data: accountPayableFeedData,
    isLoading: ServiceSiteLoading,
    isError: serviceSiteError,
    isFetched: ServiceSiteFetched,
    refetch: refetchServiceSite,
  } = useGetAPFInvoices(apfPageId, offset, limit);

  const { data: apfAccountData, isLoading: apfAccountLoading, isError: apfAccountError } = useGetAPFDetail(apfPageId);
  const { mutate: mutateAPFFiles, isPending } = useGetAPFDetailFiles({
    onSuccess: (data) => {
      toast.success('Attachment downloaded successfully.');
    },
    onError: (error) => {
      console.error('Error:', error);
      toast.error('Failed to download attachment.');
    },
    onSettled: () => {
      toast.loading('Downloading...', { duration: 1000 });
    },
  });

  const {
    veroxosId,
    company,
    fiscalYear,
    fiscalMonth,
    totalInvoices,
    totalAllocation,
    totalValue,
    created,
    invoiceDeliveryDestination,
    accountGroup,
    administrator,
    companyInvoiceDelivery,
    encrpytedFile,
    achFile,
    file,
    fileName,
    nonAchFile,
  } = apfAccountData?.data || {};
  const handlePageChange = async (page: number) => {
    const params = new URLSearchParams();
    if (searchParams) {
      searchParams.forEach((value, key) => {
        params.set(key, value);
      });
    }
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
    await refetchServiceSite();
  };

  useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
  }, [keys.length]);

  const totalPages = accountPayableFeedData?.total / limit;

  if (serviceSiteError) {
    return <Error />;
  }
  const fileOptions = [
    {
      icon: '/svg/blue-black-download.svg',
      alt: 'download file icon',
      color: '#0585a1',
      text: 'Download File',
      show: Boolean(file ? file?.data?.length : false),
      href: makeAnyFileUrlFromBase64(
        file ? Buffer.from(file).toString('base64') : null,
        fileName?.endsWith('.pdf')
          ? 'application/pdf'
          : fileName?.endsWith('.zip')
            ? 'application/zip'
            : fileName?.endsWith('.txt')
              ? 'text/plain'
              : fileName?.endsWith('.csv')
                ? 'text/csv'
                : fileName?.endsWith('.xls')
                  ? 'application/vnd.ms-excel'
                  : fileName?.endsWith('.xlsx')
                    ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    : fileName?.endsWith('.doc')
                      ? 'application/msword'
                      : fileName?.endsWith('.docx')
                        ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        : 'application/octet-stream',
      ),
      download: fileName,
    },
    {
      icon: '/svg/blue-download.svg',
      alt: 'download encripted file icon',
      color: '#00417b',
      text: 'Download Encrypted File',
      show: company?.usePgpEncryptionForApFeed ? Boolean(encrpytedFile ? encrpytedFile?.data?.length : false) : false,
      href: makeAnyFileUrlFromBase64(
        encrpytedFile ? Buffer.from(encrpytedFile).toString('base64') : null,
        'application/octet-stream',
      ),
      download: apfPageId + '.pgp',
    },
    {
      icon: '/svg/pdf-icon.svg',
      alt: 'download encripted file icon',
      color: '#e41323',
      text: 'Download PDF (Zip)',
      show: Boolean(veroxosId),
      onClick: () => mutateAPFFiles({ file: 'file', apfId: apfPageId, fileName: `${apfPageId}.zip` }),
    },
    {
      icon: '/svg/folder-green.svg',
      alt: 'download encripted file icon',
      color: '#219653',
      text: 'Download ACH File',
      show: Boolean(achFile ? achFile?.data?.length : false),
      href: makeAnyFileUrlFromBase64(achFile ? Buffer.from(achFile).toString('base64') : null, 'text/plain'),
      download: 'ACH.txt',
    },
    {
      icon: '/svg/yellow-folder.svg',
      alt: 'download encripted file icon',
      color: '#bc7b1b',
      text: 'Download Non ACH File',
      show: Boolean(nonAchFile ? nonAchFile?.data?.length : false),
      href: makeAnyFileUrlFromBase64(nonAchFile ? Buffer.from(nonAchFile).toString('base64') : null, 'text/plain'),
      download: 'NonACH.txt',
    },
  ];

  return (
    <div className="w-full rounded-lg border border-custom-lightGray bg-custom-white px-7 py-5">
      <div className="flex gap-2 py-2">
        <div className="flex items-center">
          <Image src={'/svg/folder-open-dot.svg'} alt="apf view icon" width={24} height={24} />
          <p className="ml-3 text-[16px] font-normal text-custom-blue">Account Payable Feed View</p>
        </div>
      </div>
      <div className="grid-auto-flow-column mt-6 w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white px-3 pb-2 pt-5">
        <div id="general-information" className="px-4">
          <APFGeneralInfo
            label="General Information"
            isLoading={apfAccountLoading}
            data={{
              veroxosId,
              client: company?.name,
              sentBy:
                !administrator?.firstName && !administrator?.lastName
                  ? '-'
                  : `${administrator?.firstName || ''} ${administrator?.lastName || ''}`,
              accountGroup:
                accountGroup !== undefined && accountGroup !== null ? (accountGroup === 0 ? 'All' : accountGroup) : '-',
              fiscalMonth,
              fiscalYear,
              totalInvoices,
              totalAllocation,
              totalValue,
              deliveryMethod: companyInvoiceDelivery?.name,
              deliveryDestination: invoiceDeliveryDestination,
              sentAt: created,
            }}
          />
          <Fileslist fileOptions={fileOptions} isLoading={apfAccountLoading} />
          <Separator className="separator-bg-1 mt-9 h-[2px]" />
        </div>

        <div className="mt-7 overflow-x-auto rounded-lg border border-custom-lightGray">
          {ServiceSiteLoading && <APFAccountTableSkeleton limit={limit} />}
          {ServiceSiteFetched && <APFAccountTable limit={limit} data={accountPayableFeedData?.invoices} />}
        </div>
      </div>
      {accountPayableFeedData?.total > 8 && accountPayableFeedData?.invoices?.length !== 0 && (
        <div className="">
          <Pagination
            className="flex justify-end pt-4"
            totalPages={Math.ceil(totalPages)}
            currentPage={Number(page)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default APFAccountSummaryPage;
