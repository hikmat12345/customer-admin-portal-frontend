'use client';

import SearchField from '@/components/ui/search-field';
import VendorAccountsTable from './components/vendorAccountsTable';
import VendorAccountsTableSkeleton from './components/vendorAccountsTable/vendorAccountsTableSkeleton';
import CreateQueryString from '@/utils/createQueryString';
import Pagination from '@/components/ui/pagination';
import SelectComponent from './components/select';
import useGetMenuOptions from './components/select/options';
import { useGetVendorAccounts } from '@/hooks/useGetVendorAccounts';
import { PAGE_SIZE } from '@/utils/constants/constants';
import { useEffect } from 'react';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { sanitizeSearchQuery } from '@/utils/utils';
import ToggleComponent from './components/toggle';
import Error from '@/components/ui/error';

function VendorAccountsPage() {
  const limit = PAGE_SIZE;
  const createQueryString = CreateQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys()) || [];
  const searchQuery = searchParams && searchParams?.get('searchQuery');
  const countryId = searchParams?.get('country') ?? undefined;
  const vendor = searchParams?.get('vendor') ?? undefined;
  const serviceType = searchParams?.get('service_type') ?? undefined;
  const page = searchParams?.get('page') || '1';
  const offset = +page - 1;
  const menuOptions = useGetMenuOptions();
  const showArchived =
    searchParams
      ?.get('show_archived')
      ?.split(',')
      .map((status) => (status === '1' ? 'Archived' : 'Active'))
      .join(',') ?? undefined;

  const {
    data: vendorAccountsData,
    isLoading: vendorAccountsLoading,
    isError: vendorAccountsError,
    isFetched: vendorAccountsFetched,
    refetch: refetchVendorAccounts,
  } = useGetVendorAccounts(
    offset,
    limit,
    searchQuery?.trim() || undefined,
    vendor,
    countryId,
    showArchived,
    serviceType,
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') router.push(`${pathname}?${createQueryString('searchQuery', undefined)}`);
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
    await refetchVendorAccounts();
  };

  useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
  }, [keys.length]);

  useEffect(() => {
    if (!showArchived) {
      router.push(`${pathname}?${createQueryString('show_archived', 0)}`);
    }
  }, []);

  const totalPages = vendorAccountsData?.total / limit;

  if (vendorAccountsError) {
    return <Error />;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-lg border border-custom-lightGray bg-custom-white px-3 pb-2 pt-5">
        <div className="flex h-fit items-center justify-between gap-2">
          <SearchField
            iconWidth={16}
            iconHeight={16}
            defaultValue={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeydown}
            className="ml-2 rounded-none border-b bg-transparent font-normal outline-none focus:border-[#44444480] sm:w-[8.5rem] 2md:min-w-[21.375rem] xl:w-[29.6rem]"
            helpText="Searches network name, company network account number and display name fields."
          />
          <div className="flex md:gap-1 lg:gap-4">
            {menuOptions?.map((menuOption: any, index: number) => (
              <SelectComponent
                key={index}
                menuOption={menuOption}
                filterName={menuOption.value}
                paramName={menuOption.paramName}
                placeholder={menuOption.placeholder}
              />
            ))}
            <ToggleComponent />
          </div>
        </div>
        <div className="mt-2 flex-grow overflow-x-auto">
          {vendorAccountsLoading && <VendorAccountsTableSkeleton limit={limit} />}
          {vendorAccountsFetched && <VendorAccountsTable limit={limit} data={vendorAccountsData?.data} />}
        </div>
      </div>
      {vendorAccountsData?.total > 8 && vendorAccountsData?.data?.length !== 0 && (
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

export default VendorAccountsPage;
