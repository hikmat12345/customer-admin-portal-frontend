'use client';

import React from 'react';
import SearchField from '@/components/ui/search-field';
import CreateQueryString from '@/utils/createQueryString';
import Pagination from '@/components/ui/pagination';
import SelectComponent from './components/select';
import useGetMenuOptions from './components/select/options';
import EmployeesTable from './components/employeesTable';
import EmployeesTableSkeleton from './components/employeesTable/employeesTableSkeleton';
import { PAGE_SIZE } from '@/utils/constants/constants';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGetAllEmployees } from '@/hooks/useGetEmployees';
import { sanitizeSearchQuery } from '@/utils/utils';

function EmployeesPage() {
  const limit = PAGE_SIZE;
  const createQueryString = CreateQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const menuOptions = useGetMenuOptions();
  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys()) || [];
  const searchQuery = searchParams && searchParams?.get('searchQuery');
  const status = searchParams && searchParams?.get('status');
  const page = searchParams?.get('page') || '1';
  const offset = +page - 1;

  const {
    data: employeesData,
    isLoading: employeesLoading,
    isFetched: employeesFetched,
    refetch: refetchEmployees,
  } = useGetAllEmployees(
    offset,
    limit,
    typeof status !== 'undefined' && status !== null ? status : undefined,
    searchQuery?.trim() || undefined,
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
    await refetchEmployees();
  };

  React.useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
  }, [keys.length]);

  const totalPages = employeesData?.total / limit;

  return (
    <>
      <div className="grid-auto-flow-column mt-6 grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white px-3 pb-2 pt-5">
        <div className="flex items-center justify-between gap-2">
          <SearchField
            iconWidth={16}
            iconHeight={16}
            defaultValue={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeydown}
            className="focus:border-[#44444480 ml-2 w-[500px] rounded-none border-b bg-transparent font-normal outline-none xl:w-[600px]"
            helpText="Searches ID, First Name, Last Name, Email and External ID fields."
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
          {employeesLoading && <EmployeesTableSkeleton limit={limit} />}
          {employeesFetched && <EmployeesTable limit={limit} data={employeesData?.data} />}
        </div>
      </div>
      {employeesData?.total > 8 && employeesData?.data?.length !== 0 && (
        <Pagination
          className="flex justify-end pt-4"
          totalPages={Math.ceil(totalPages)}
          currentPage={Number(page)}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default EmployeesPage;
