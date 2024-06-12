'use client';

import { useGetAllTickets, useGetOpenTickets } from '@/hooks/useTickets';
import SearchField from '@/components/ui/search-field';
import React, { useEffect } from 'react';
import Pagination from '@/components/ui/pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import CreateQueryString from '@/utils/createQueryString';
import useGetMenuOptions from './components/select/options';
import SelectComponent from './components/select';
import TicketsTableSkeleton from './components/ticketsTableSkeleton';
import TicketsTable from './components/ticketsTable';
import MonthlyTickets from './components/monthlyTickets';
import TotalTicketsOpen from './components/totalTicketsopen';

function TicketsPage() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  let previousMonth = currentMonth - 1;
  if (previousMonth === 0) {
    previousMonth = 12;
  }
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const pathname = usePathname();
  const router = useRouter();
  const limit = 7;
  const offset = +page - 1;

	const status = searchParams && searchParams?.get('status')
	const priority = searchParams && searchParams?.get('priority')
	const accountNumber = searchParams && searchParams?.get('accountNumber')
	const searchQuery = searchParams && searchParams?.get('searchQuery')

  const createQueryString = CreateQueryString();
  const menuOptions = useGetMenuOptions();

  const { data: openTicketsData, isLoading } = useGetOpenTickets();

	const {
		data: allTickets,
		isLoading: isTicketsLoading,
		isFetched: isTicketsFetched,
		refetch: refetchTickets,
	} = useGetAllTickets(
		offset,
		limit,
		priority?.length !== 0 ? priority : undefined,
		status?.length !== 0 ? status : undefined,
		accountNumber?.length !== 0 ? accountNumber : undefined,
		searchQuery?.length !== 0 ? searchQuery?.trim() : undefined
	)

	const handleSearchField = (event: any) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			const { value } = event.target
		if (value.length === 0) {
			router.push(`${pathname}?${createQueryString('searchQuery', undefined)}`)
		} else {
			router.push(`${pathname}?${createQueryString('searchQuery', value)}`)
		}
		}
	}

	const rowCount = allTickets?.tickets?.length || 8
	const totalPages = allTickets?.total / limit;

  const handlePageChange = async (page: number) => {
    const params = new URLSearchParams();
    if (searchParams) {
      // TODO: Will use proper types later
      searchParams.forEach((value: any, key: any) => {
        params.set(key, value);
      });
    }
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
    await refetchTickets();
  };

  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys());

  useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.length]);

	return (
		<div>
			<div className="grid grid-auto-flow-column gap-3 w-full border border-custom-lightGray bg-custom-white rounded-lg px-6 py-7">
				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
					<TotalTicketsOpen data={openTicketsData} isLoading={isLoading} />
					<MonthlyTickets title="Tickets This Month" month={currentMonth} year={currentYear} />
					<MonthlyTickets title="Last Month Tickets" month={previousMonth} year={currentYear} />
				</div>
			</div>
			<div className="grid grid-auto-flow-column gap-3 w-full border border-custom-lightGray bg-custom-white rounded-lg px-3 pt-5 pb-2 mt-6">
				<div className="flex items-center justify-between gap-7">
					<SearchField
						className="rounded-none bg-transparent border-b ml-2 outline-none focus:border-[#44444480] w-[500px] xl:w-[600px] font-normal"
						iconWidth={16}
						iconHeight={16}
						onKeyDown={handleSearchField}
						helpText="Searches the veroxos reference, client reference number, site / employee, vendor and request type."
					/>
					<div className="flex gap-4">
						{menuOptions?.map((menuOption: any, index: number) => (
							<SelectComponent key={index} menuOption={menuOption} index={index} />
						))}
					</div>
				</div>
				<div className="mt-2">
					{isTicketsLoading && <TicketsTableSkeleton limit={rowCount} />}
					{isTicketsFetched && <TicketsTable allTickets={allTickets} />}
				</div>
			</div>
			{allTickets?.total > 8 && allTickets?.tickets?.length !== 0 && (
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
	)
}

export default TicketsPage;
