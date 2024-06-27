'use client';

import SearchField from '@/components/ui/search-field';
import VendorAccountsTable from './components/vendorAccountsTable';
import VendorAccountsTableSkeleton from './components/vendorAccountsTable/vendorAccountsTableSkeleton';
import CreateQueryString from '@/utils/createQueryString';
import Pagination from '@/components/ui/pagination';
import debounce from 'lodash.debounce';
import SelectComponent from './components/select';
import useGetMenuOptions from './components/select/options';
import { useGetVendorAccounts } from '@/hooks/useGetVendorAccounts';
import { PAGE_SIZE } from '@/utils/constants/constants';
import { useCallback, useEffect } from 'react';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

function VendorAccountsPage() {
  const limit = PAGE_SIZE;
  const createQueryString = CreateQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys()) || [];
  const searchQuery = searchParams && searchParams?.get('searchQuery');
  const countryId = searchParams && searchParams?.get('country');
  const showArchived = searchParams && searchParams?.get('show_archived');
  const vendor = searchParams && searchParams?.get('vendor');
  const page = searchParams?.get('page') || '1';
  const offset = +page - 1;

  const {
    data: vendorAccountsData,
    isLoading: vendorAccountsLoading,
    isFetched: vendorAccountsFetched,
    refetch: refetchVendorAccounts,
  } = useGetVendorAccounts(
    offset,
    limit,
    searchQuery?.trim() || undefined,
    typeof vendor !== 'undefined' && vendor !== null ? vendor : undefined,
    typeof countryId !== 'undefined' && countryId !== null ? countryId : undefined,
    typeof showArchived !== 'undefined' && showArchived !== null
      ? showArchived
          .split(',')
          .map((status) => (status === '1' ? 'Archived' : 'Active'))
          .join(',')
      : undefined,
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

  const totalPages = vendorAccountsData?.total / limit;
  const debouncedSearchFieldHandlder = useCallback(debounce(handleSearchField, 500), []);

  return (
    <>
      <div className="grid-auto-flow-column mt-6 grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white px-3 pb-2 pt-5">
        <div className="flex items-center justify-between gap-2">
          <SearchField
            iconWidth={16}
            iconHeight={16}
            defaultValue={searchQuery}
            onChange={debouncedSearchFieldHandlder}
            className="ml-2 w-[500px] rounded-none border-b bg-transparent font-normal outline-none focus:border-[#44444480] xl:w-[600px]"
            helpText="Searches network name, company network account number and display name fields."
          />
          <div className="flex gap-4">
            {menuOptions?.map((menuOption: any, index: number) => (
              <SelectComponent key={index} menuOption={menuOption} index={index} />
            ))}
          </div>
        </div>
        <div className="mt-2">
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
