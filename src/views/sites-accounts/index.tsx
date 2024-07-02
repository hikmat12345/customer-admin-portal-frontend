'use client';

import SearchField from '@/components/ui/search-field';
import CreateQueryString from '@/utils/createQueryString';
import Pagination from '@/components/ui/pagination';
import SelectComponent from './components/select';
import useGetMenuOptions from './components/select/options';
import { PAGE_SIZE } from '@/utils/constants/constants';
import { useEffect } from 'react';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGetServiceSites } from '@/hooks/useGetServiceSites';
import ServiceSitesTableSkeleton from './components/serviceSitesTable/serviceSitesTableSkeleton';
import ServiceSitesTable from './components/serviceSitesTable';
import { sanitizeSearchQuery } from '@/utils/utils';

function ServiceSitesPage() {
  const limit = PAGE_SIZE;
  const createQueryString = CreateQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys()) || [];
  const searchQuery = searchParams && searchParams?.get('searchQuery');
  const countryId = searchParams && searchParams?.get('country');
  const page = searchParams?.get('page') || '1';
  const offset = +page - 1;

  const {
    data: serviceSiteData,
    isLoading: ServiceSiteLoading,
    isFetched: ServiceSiteFetched,
    refetch: refetchServiceSite,
  } = useGetServiceSites(
    offset,
    limit,
    searchQuery?.trim() || undefined,
    typeof countryId !== 'undefined' && countryId !== null ? countryId : undefined,
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

  const totalPages = serviceSiteData?.total / limit;

  return (
    <>
      <div className="grid-auto-flow-column mt-6 grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white px-3 pb-2 pt-5">
        <div className="flex items-center justify-between gap-2">
          <SearchField
            iconWidth={16}
            iconHeight={16}
            onChange={handleSearchField}
            defaultValue={searchQuery}
            onKeyDown={handleSearchKeydown}
            className="ml-2 w-[500px] rounded-none border-b bg-transparent font-normal outline-none focus:border-[#44444480] xl:w-[600px]"
            helpText="Search in ID, Site Code, Site Name, Building Name, Street Line 1 / 2, City, ZIP / Post Code"
          />
          <div className="flex gap-4">
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
        <div className="mt-2">
          {ServiceSiteLoading && <ServiceSitesTableSkeleton limit={limit} />}
          {ServiceSiteFetched && <ServiceSitesTable limit={limit} data={serviceSiteData?.data} />}
        </div>
      </div>
      {serviceSiteData?.total > 8 && serviceSiteData?.data?.length !== 0 && (
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

export default ServiceSitesPage;
