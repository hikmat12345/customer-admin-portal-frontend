'use client';
import React, { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/components/ui/pagination';
import CreateQueryString from '@/utils/createQueryString';
import LineChart from '@/components/ui/line-chart';
import {
  useGetAccountCostTrend,
  useGetAccountDetail,
  useGetAccountInvoices,
  useGetAccountTickets,
  useGetServiceLocations,
  useGetServiceTypesVendor,
} from '@/hooks/useGetAccount';
import AccountGeneralInfo from './components/account-general-info';
import TableData from '@/components/ui/summary-tables/table';
import { ScrollTabs } from '@/components/ui/scroll-tabs';
import Skeleton from '@/components/ui/skeleton/skeleton';
import ServiceTypesGrid from '@/components/ui/service-badge';
import TooltipText from '@/components/ui/textbox';
import { format, parseISO } from 'date-fns';

type VendorDetailPageProps = {
  vendorId: number;
};
function VendorDetailPage({ vendorId }: VendorDetailPageProps) {
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();
  const pathname = usePathname();
  const isTerminated = searchParams.get('showTerminated');

  const [showTerminated, setShowTerminated] = React.useState(isTerminated === 'true');
  const createQueryString = CreateQueryString();

  const account_id = vendorId;
  const page = searchParams?.get('page') || '1';

  const limit = 7;
  const offset = +page - 1;

  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys());

  // get account general information
  const { data: accountDetailData, isLoading: isAccountDetailLoader } = useGetAccountDetail(Number(account_id));
  const {
    veroxosId,
    status: live,
    accountNumber,
    masterAccount,
    clientenVendorID,
    paymentTerms,
    accountPayableGroup,
    remittanceAddress,
    displayName,
    invoiceDueInDays,
    includeApFeed,
    rollingContract,
    network,
    companyNetworkStatus,
  } = accountDetailData?.data || {};

  // cost and trend data
  const { data: costTrendData, isLoading: isCostTrendLoading } = useGetAccountCostTrend(Number(account_id));
  const {
    data: accountTicketsData,
    isLoading: isAccountTicketsLoader,
    refetch: refetchTicketsData,
  } = useGetAccountTickets(Number(account_id), offset, limit);
  const {
    data: siteInvoicesData,
    isLoading: isSiteInvoicesLoader,
    refetch: getInvoices,
  } = useGetAccountInvoices(Number(account_id), offset, limit);
  const { data: serviceLocation, isLoading: isVendorServicesLocationLoading } = useGetServiceLocations(
    Number(account_id),
  );
  const { data: vendorServicesTypes, isLoading: isVendorServiceTypeLoading } = useGetServiceTypesVendor(
    Number(account_id),
  );

  const structuredTicketsData = accountTicketsData?.data?.tickets?.map((ticket: any) => ({
    "Veroxos REF": ticket?.id ? ticket?.id : '',
    "Request Type": ticket?.requestType,
    status: ticket?.status,
    created: format(parseISO(ticket.created), 'MMM dd, yyyy hh:mm a')
  }));

  const handlePageChange = async (page: number) => {
    const params = new URLSearchParams();
    if (searchParams) {
      searchParams.forEach((value, key) => {
        params.set(key, value);
      });
    }
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
    await refetchTicketsData();
    await getInvoices();
  };
  const showTerminatedHandler = async () => {
    setShowTerminated(!showTerminated);
    await refetchTicketsData();
  };
  useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
    if (showTerminated) {
      router.push(`${pathname}?${createQueryString('showTerminated', showTerminated.toString())}`);
    }
  }, [keys.length, showTerminated, createQueryString, pathname, router, searchParams, keys]);

  useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
  }, [keys.length, pathname, router, searchParams, keys]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalPages = Math.max(accountTicketsData?.total || 0, siteInvoicesData?.total || 0);

  return (
    <div className="w-full rounded-lg border border-custom-lightGray bg-custom-white px-7 py-5">
      <ScrollTabs
        tabs={['general-information', 'service-type', 'service-location', 'cost-trend', 'invoices', 'tickets']}
      >
        {/* General Information  */}
        <div id="general-information">
          <AccountGeneralInfo
            label="General Information"
            isLoading={isAccountDetailLoader}
            data={{
              veroxosId,
              accountNumber,
              masterAccount,
              network,
              paymentTerms: invoiceDueInDays,
              remittanceAddress,
              displayName,
              clientenVendorID,
              accountPayableGroup,
              includeApFeed,
              rollingContract,
              companyNetworkStatus,
            }}
          />
          <Separator className="h-[1.5px] bg-[#5d5b5b61]" />
        </div>

        {/* Service Type */}
        <div id="service-type">
          <div className="pt-8 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">Service Type</div>
          {isVendorServiceTypeLoading ? (
            <Skeleton variant="paragraph" rows={3} />
          ) : Array.isArray(vendorServicesTypes?.data) && vendorServicesTypes?.data.length > 0 ? (
            <ServiceTypesGrid
              services={vendorServicesTypes?.data.sort(
                (
                  a: {
                    subTypes: { name: string; service_type: string }[];
                  },
                  b: {
                    subTypes: { name: string; service_type: string }[];
                  },
                ) => b.subTypes?.length - a.subTypes?.length,
              )}
            />
          ) : (
            <div className="w-full py-8 text-center text-lg">Data Not Found</div>
          )}
        </div>

        <div id="service-location">
          <div className="pt-8 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">Service Location</div>
          <Separator className="mt-4 h-[2.2px] bg-[#5d5b5b61]" />
        </div>
        {/* Cost Trend  */}
        <div id="cost-trend">
          <LineChart label="Cost Trend" data={costTrendData} isLoading={isCostTrendLoading} />
          <Separator className="mt-4 h-[2.2px] bg-[#5d5b5b61]" />
        </div>

        {/* Invoices  */}
        <div id="invoices">
          <TableData
            label={
              <>
                Invoices
                <TooltipText
                  text={'Show the 10 invoices per page'}
                  maxLength={1}
                  className="pl-3 pt-3 leading-6 text-[#575757] lg:text-[13px] xl:text-[14px]"
                  type="notification"
                />
              </>
            }
            data={siteInvoicesData?.invoices}
            currency={siteInvoicesData?.invoices[0]?.Currency}
            loading={isSiteInvoicesLoader}
          />
          <Separator className="mt-8 h-[2px] bg-[#5d5b5b61]" />
        </div>

        {/* Tickets  */}
        <div id="tickets">
          <TableData
            label={
              <>
                Tickets
                <TooltipText
                  text={'Show the 10 tickets per page'}
                  maxLength={1}
                  className="pl-3 pt-3 leading-6 text-[#575757] lg:text-[13px] xl:text-[14px]"
                  type="notification"
                />
              </>
            }
            loading={isAccountTicketsLoader}
            data={structuredTicketsData}
          />
          <Separator className="mt-8 h-[2px] bg-[#5d5b5b61]" />
        </div>

        {totalPages > 8 && (
          <div>
            <Pagination
              className="flex justify-end pt-4"
              totalPages={totalPages}
              currentPage={Number(page)}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </ScrollTabs>
    </div>
  );
}
export default VendorDetailPage;
