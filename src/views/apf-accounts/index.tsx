'use client';

import CreateQueryString from '@/utils/createQueryString';
import Pagination from '@/components/ui/pagination';
import SelectComponent from './components/select';
import useGetMenuOptions from './components/select/options';
import { PAGE_SIZE } from '@/utils/constants/constants';
import { useEffect } from 'react';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGetAPFAccount } from '@/hooks/useGetAPFAccount';
import APFAccountTableSkeleton from './components/APFAccountTable/APFAccountsTableSkeleton';
import APFAccountTable from './components/APFAccountTable';
import { sanitizeSearchQuery } from '@/utils/utils';
import Error from '@/components/ui/error';

function APFAccountPage() {
  const limit = PAGE_SIZE;
  const createQueryString = CreateQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys()) || [];
  const searchQuery = searchParams && searchParams?.get('searchQuery');
  const fiscalMonth = searchParams && searchParams?.get('fiscalMonth');
  const accountGroup = searchParams && searchParams?.get('accountGroup');
  const fiscalYear = searchParams && searchParams?.get('fiscalYear');
  const page = searchParams?.get('page') || '1';
  const offset = +page - 1;

  const {
    data: accountPayableFeedData,
    isLoading: ServiceSiteLoading,
    isError: serviceSiteError,
    isFetched: ServiceSiteFetched,
    refetch: refetchServiceSite,
  } = useGetAPFAccount(
    offset,
    limit,
    searchQuery?.trim() || undefined,
    typeof fiscalMonth !== 'undefined' && fiscalMonth !== null ? fiscalMonth : undefined,
    typeof accountGroup !== 'undefined' && accountGroup !== null ? accountGroup : undefined,
    typeof fiscalYear !== 'undefined' && fiscalYear !== null ? fiscalYear : undefined,
  );

  const menuOptions = useGetMenuOptions();

  const handleSearchField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length === 0) {
      router.push(`${pathname}?${createQueryString('searchQuery', undefined)}`);
    } else {
      router.push(`${pathname}?${createQueryString('searchQuery', value)}`);
    }
  };

  const handleSearchKeydown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      let { value } = event.target;
      value = sanitizeSearchQuery(value);
      if (value.length === 0) {
        router.push(`${pathname}?${createQueryString('searchQuery', undefined)}`);
      } else {
        router.push(`${pathname}?${createQueryString('searchQuery', value)}`);
      }
    }
  };

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

  return (
    <>
      <div className="grid-auto-flow-column mt-6 grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white px-3 pb-2 pt-5">
        <div className="flex justify-end md:gap-1 lg:gap-4">
          {menuOptions?.map((menuOption: any, index: number) => (
            <SelectComponent
              key={index}
              menuOption={menuOption}
              filterName={menuOption.value}
              paramName={menuOption.paramName}
              placeholder={menuOption.placeholder}
            />
          ))}
        </div>
        <div className="mt-2 overflow-x-auto">
          {ServiceSiteLoading && <APFAccountTableSkeleton limit={limit} />}
          {ServiceSiteFetched && <APFAccountTable limit={limit} data={accountPayableFeedData?.data} />}
        </div>
      </div>
      {accountPayableFeedData?.total > 8 && accountPayableFeedData?.data?.length !== 0 && (
        <div className="">
          <Pagination
            className="flex justify-end pt-4"
            totalPages={Math.ceil(totalPages)}
            currentPage={Number(page)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}

export default APFAccountPage;
