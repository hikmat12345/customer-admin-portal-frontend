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
import dynamic from 'next/dynamic';
import { DATE_TIME_FORMAT } from '@/utils/constants/constants';
const GroupMapBox = dynamic(() => import('../../components/ui/map-box').then((mod) => mod.GroupMapBox), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

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
  const costTrendLimit = 12;
  const { data: costTrendData, isLoading: isCostTrendLoading } = useGetAccountCostTrend(
    Number(account_id),
    costTrendLimit,
  );
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
    'Veroxos REF': ticket?.reference ? ticket?.reference : '',
    'Request Type': ticket?.requestType,
    status: ticket?.status,
    created: format(parseISO(ticket.created), DATE_TIME_FORMAT),
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
  const serviceLocations =
    serviceLocation?.map(
      (item: { lat: number; lng: number; name: string; streetLine1: string; streetLine2: string; id: number }) => ({
        lat: item?.lat || 0,
        long: item?.lng || 0,
        address:
          item?.name +
            (item?.streetLine1 ? ', ' + item?.streetLine1 : item?.streetLine2 ? ', ' + item?.streetLine2 : '') || '',
        siteId: item?.id,
      }),
    ) || [];

  const listOfTabs = [];
  if (vendorServicesTypes?.data?.length > 0) {
    listOfTabs.push('service-type');
  }
  if (serviceLocations?.length > 0) {
    listOfTabs.push('service-location');
  }
  if (costTrendData?.length > 0) {
    listOfTabs.push('cost-trend');
  }
  if (siteInvoicesData?.invoices?.length > 0) {
    listOfTabs.push('invoices');
  }
  if (accountTicketsData?.data?.tickets?.length > 0) {
    listOfTabs.push('tickets');
  }
  return (
    <div className="w-full rounded-lg border border-custom-lightGray bg-custom-white px-7 py-5">
      <ScrollTabs tabs={['general-information', ...listOfTabs]}>
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
          <Separator className="separator-bg-1 h-[1.0px]" />
        </div>

        {/* Service Type */}
        {vendorServicesTypes?.data?.length > 0 && (
          <div id="service-type">
            <div className="pb-8 pt-8 text-[1.375rem] font-[700] text-custom-blue">Service Type</div>
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
              <div className="w-full py-8 text-center text-lg">No data found</div>
            )}
            <Separator className="separator-bg-1 mt-4 h-[1.0px]" />
          </div>
        )}

        {/* Service Location */}
        {serviceLocations?.length > 0 && (
          <div id="service-location">
            <div className="pb-6 pt-8 text-[1.375rem] font-[700] text-custom-blue">Service Location</div>
            {isVendorServicesLocationLoading ? (
              <Skeleton variant="paragraph" rows={3} />
            ) : (
              <GroupMapBox locations={serviceLocations} />
            )}
            <Separator className="separator-bg-1 mt-8 h-[1.2px]" />
          </div>
        )}
        {/* Cost Trend  */}
        {costTrendData?.length > 0 && (
          <div id="cost-trend">
            <LineChart label="Cost Trend" data={costTrendData} isLoading={isCostTrendLoading} />
            <Separator className="separator-bg-1 mt-4 h-[1.2px]" />
          </div>
        )}

        {/* Invoices  */}
        {siteInvoicesData?.invoices?.length > 0 && (
          <>
            <div id="invoices">
              <TableData
                label={
                  <>
                    Invoices
                    <TooltipText
                      text={`Last ${limit} invoices shown`}
                      maxLength={1}
                      className="pl-3 pt-3 text-[0.875rem] leading-6 text-[#575757]"
                      type="notification"
                    />
                  </>
                }
                data={siteInvoicesData?.invoices}
                currency={siteInvoicesData?.invoices[0]?.Currency}
                loading={isSiteInvoicesLoader}
              />
            </div>
            <Separator className="separator-bg-1 mt-8 h-[1px]" />
          </>
        )}

        {/* Tickets  */}
        {structuredTicketsData?.length > 0 && (
          <>
            <div id="tickets">
              <TableData
                label={
                  <>
                    Tickets
                    <TooltipText
                      text={`Last ${limit} tickets shown`}
                      maxLength={1}
                      className="pl-3 pt-3 text-[0.875rem] leading-6 text-[#575757]"
                      type="notification"
                    />
                  </>
                }
                loading={isAccountTicketsLoader}
                data={structuredTicketsData}
              />
            </div>
          </>
        )}

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
