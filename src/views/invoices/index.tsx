'use client';

import { useGetInvoices, useGetMonthlyInvoices } from '@/hooks/useGetInvoices';
import React, { useEffect } from 'react';
import { getFormattedTotal } from '@/utils/utils';
import Pagination from '@/components/ui/pagination';
import SearchField from '@/components/ui/search-field';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import CreateQueryString from '@/utils/createQueryString';
import debounce from 'lodash.debounce';
import InvoicesTableSkeleton from './components/invoicesTable/invoicesTableSkeleton';
import SelectComponent from './components/select';
import useGetMenuOptions from './components/select/options';
import InvoicesTable from './components/invoicesTable';
import InvoicesProcessed from './components/invoicesProcessedCard';
import AccountCard from '../../components/ui/accountCard/card';

function InvoicesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = CreateQueryString();
  const page = searchParams?.get('page') || '1';
  const account_number = searchParams && searchParams?.get('account');
  const countryId = searchParams && searchParams?.get('country');
  const vendor = searchParams && searchParams?.get('vendor');

  const searchQuery = searchParams && searchParams?.get('searchQuery');

  const limit = 7;
  const offset = +page - 1;

  const { data: invoicesData, isLoading: invoiceLoading } = useGetMonthlyInvoices();
  const {
    data: allInvoices,
    isLoading: isAllInvoicesLoading,
    isFetched: isAllInvoiesFetched,
    refetch: refetchInvoices,
  } = useGetInvoices(
    offset,
    limit,
    account_number?.length !== 0 ? account_number : undefined,
    typeof countryId !== 'undefined' && countryId !== null ? +countryId : undefined,
    vendor?.length !== 0 ? vendor : undefined,
    searchQuery?.length !== 0 ? searchQuery?.trim() : undefined,
  );

  const handleSearchField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length === 0) {
      router.push(`${pathname}?${createQueryString('searchQuery', undefined)}`);
    } else {
      router.push(`${pathname}?${createQueryString('searchQuery', value)}`);
    }
  };

  const debouncedSearchFieldHandlder = React.useCallback(debounce(handleSearchField, 500), []);

  const totalPages = allInvoices?.total / limit;

  const handlePageChange = async (page: number) => {
    const params = new URLSearchParams();
    if (searchParams) {
      searchParams.forEach((value, key) => {
        params.set(key, value);
      });
    }
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
    await refetchInvoices();
  };

  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys());

  const menuOptions = useGetMenuOptions();

  const absoluteDifferenceThisMonth = Math.abs(invoicesData?.thisMonth?.difference);
  const formattedDifferenceThisMonth = getFormattedTotal(absoluteDifferenceThisMonth);

  const getLastMonthAndYear = (data: any) => {
    const lastInvoice = data?.lastSixMonthsInvoices?.at(-1);
    return lastInvoice
      ? {
          month: lastInvoice.month,
          year: lastInvoice.year,
          formatted: `${lastInvoice.month} ${lastInvoice.year}`,
        }
      : undefined;
  };

  const thisMonthAndYear = getLastMonthAndYear(invoicesData?.thisMonth);
  const lastMonthAndYear = getLastMonthAndYear(invoicesData?.lastMonth);

  const getThisMonthMessage = (difference: number, formattedDifference: string) => {
    let message = null;
    switch (true) {
      case difference > 0:
        message = (
          <p className="text-xs font-medium text-custom-grey xl:text-xs 2xl:text-sm">
            Current expenditure of {thisMonthAndYear?.formatted} exceeds {lastMonthAndYear?.formatted} by over{' '}
            <span className="font-semibold text-custom-red">${formattedDifference}</span>
          </p>
        );
        break;
      case difference < 0:
        message = (
          <p className="text-xs font-medium text-custom-grey xl:text-xs 2xl:text-sm">
            Current expenditure is lower than {lastMonthAndYear?.formatted} by over{' '}
            <span className="font-semibold text-[#219653]">${formattedDifference}</span>
          </p>
        );
        break;
      default:
    }
    return message;
  };

  const lastMonthMessage = (
    <p className="text-xs font-medium text-custom-grey xl:text-xs 2xl:text-sm">
      Invoice value of{' '}
      <span
        className={`${
          invoicesData?.lastMonth?.percentageDifference < 0 ? 'text-[#219653]' : 'text-custom-red'
        } font-semibold`}
      >
        ${getFormattedTotal(invoicesData?.lastMonth?.total)}
      </span>{' '}
      processed {lastMonthAndYear?.formatted}.
    </p>
  );

  useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="grid-auto-flow-column grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
          <AccountCard
            data={invoicesData?.thisMonth}
            message={getThisMonthMessage(invoicesData?.thisMonth?.difference, formattedDifferenceThisMonth)}
            title="This Month"
            isLoading={invoiceLoading}
            peakIndicator
          />
          <AccountCard
            data={invoicesData?.lastMonth}
            message={lastMonthMessage}
            title="Last Month"
            isLoading={invoiceLoading}
            peakIndicator
          />
          <InvoicesProcessed
            data={invoicesData?.thisMonth}
            title="Total Invoices Processed"
            isLoading={invoiceLoading}
          />
        </div>
      </div>
      <div className="grid-auto-flow-column mt-6 grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white px-3 pb-2 pt-5">
        <div className="flex items-center justify-between gap-2">
          <SearchField
            className="ml-2 w-[500px] rounded-none border-b bg-transparent font-normal outline-none focus:border-[#44444480] xl:min-w-[700px]"
            iconWidth={16}
            iconHeight={16}
            onChange={debouncedSearchFieldHandlder}
          />
          <div className="flex gap-4">
            {menuOptions?.map((menuOption: any, index: number) => (
              <SelectComponent key={index} menuOption={menuOption} index={index} />
            ))}
          </div>
        </div>
        <div className="mt-2">
          {isAllInvoicesLoading && <InvoicesTableSkeleton limit={limit} />}
          {isAllInvoiesFetched && <InvoicesTable data={allInvoices} />}
        </div>
      </div>
      {allInvoices?.total > 8 && allInvoices?.invoices?.length !== 0 && (
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

export default InvoicesPage;
