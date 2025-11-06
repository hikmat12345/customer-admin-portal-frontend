'use client';

import SearchField from '@/components/ui/search-field';
import AssetsTable from './components/assetsTable';
import AssetsTableSkeleton from './components/assetsTable/assetsTableSkeleton';
import CreateQueryString from '@/utils/createQueryString';
import Pagination from '@/components/ui/pagination';
import SelectComponent from './components/select';
import useGetMenuOptions from './components/select/options';
import { PAGE_SIZE } from '@/utils/constants/constants';
import { useEffect } from 'react';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { sanitizeSearchQuery } from '@/utils/utils';
import Error from '@/components/ui/error';
import { useGetAssets } from '@/hooks/useGetAssets';

function AssetsPage() {
  const limit = PAGE_SIZE;
  const createQueryString = CreateQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys()) || [];
  const searchQuery = searchParams && searchParams?.get('searchQuery');
  const assetType = searchParams?.get('assetType') ?? undefined;
  const status = searchParams?.get('status') ?? undefined;
  const page = searchParams?.get('page') || '1';
  const offset = +page - 1;
  const menuOptions = useGetMenuOptions();

  const {
    data: assets,
    isLoading: assetLoading,
    isError: assetsError,
    isFetched: assetsFetched,
    refetch: refetchAssets,
  } = useGetAssets(offset, limit, searchQuery?.trim() || undefined, assetType, status);

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
    await refetchAssets();
  };

  useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
  }, [keys.length]);

  const totalPages = assets?.total / limit;

  if (assetsError) {
    return <Error />;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-lg border border-custom-lightGray bg-custom-white px-3 pb-2 pt-5">
        <div className="flex h-fit justify-between gap-2 2md:items-center">
          <SearchField
            iconWidth={16}
            iconHeight={16}
            defaultValue={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeydown}
            className="ml-2 rounded-none border-b bg-transparent font-normal outline-none focus:border-[#44444480] sm:w-[8.5rem] 2md:w-[13.5rem] lg:w-[13.5rem] 2lg:w-[17rem] xl:w-[25rem] 2xl:w-[28rem]"
            helpText="Searches asset type, serial number, manufacturer, model and status fields."
          />
          <div className="flex items-center md:flex-col md:gap-2 2md:flex-row 2md:gap-1 lg:gap-4">
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
            </div>
          </div>
        </div>
        <div className="mt-2 flex-grow overflow-x-auto">
          {assetLoading && <AssetsTableSkeleton limit={limit - 1} />}
          {assetsFetched && <AssetsTable limit={limit} data={assets?.data} />}
        </div>
      </div>
      {assets?.total > 8 && assets?.data?.length !== 0 && (
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

export default AssetsPage;
