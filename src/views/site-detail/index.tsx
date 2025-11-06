'use client';

import React, { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  useGetCostTrend,
  useGetServiceTypes,
  useGetSiteInvoices,
  useGetSiteDetail,
  useGetSiteServices,
  useGetSiteTickets,
} from '@/hooks/useGetSites';
import SiteGeneralInfo from './components/site-general-info';
import { currencyFormatter } from '@/utils/utils';
import Skeleton from '@/components/ui/skeleton/skeleton';
import Pagination from '@/components/ui/pagination';
import LineChart from '@/components/ui/line-chart';
import TableData from '@/components/ui/summary-tables/table';
import ServiceTypesGrid from '@/components/ui/service-badge';
import { ScrollTabs } from '@/components/ui/scroll-tabs';
import TooltipText from '@/components/ui/textbox';
import { format, parseISO } from 'date-fns';
import { DATE_TIME_FORMAT, MONTH_YEAR_FORMAT } from '@/utils/constants/constants';

type SiteDetailPageProps = {
  siteId: number;
};
function SiteDetailPage({ siteId }: SiteDetailPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [showTerminated, setShowTerminated] = React.useState<boolean>(false);
  const [showServiceButton, setShowServiceButton] = React.useState<boolean>(false);
  const site_id = siteId;
  const page = searchParams?.get('page') || '1';
  const terminatedServices = true;
  const limit = 7;
  const offset = +page - 1;
  // get site detail
  const { data: siteServiceDetailData, isLoading: isSiteServiceDetailLoader } = useGetSiteDetail(Number(site_id));
  const {
    veroxosId,
    siteCode,
    postCode,
    name,
    buildingName,
    streetLine1,
    streetLine2,
    city,
    stateCounty,
    country,
    contactName,
    contactEmail,
    latitude,
    longitude,
    status,
  } = siteServiceDetailData || {};
  const countryCurrencyCode = siteServiceDetailData?.country?.currencyCode;

  // get services types data
  const { data: serviceTypesData, isLoading: isServiceTypesLoading } = useGetServiceTypes(Number(site_id));
  const serviceTypes = serviceTypesData?.data || [];

  // cost and trend data
  const costTrendLimit = 12;
  const { data: costTrendData, isLoading: isCostTrendLoading } = useGetCostTrend(Number(site_id), costTrendLimit);
  // site services data
  const {
    data: siteServices,
    isLoading: isServicesLoader,
    refetch: refetchData,
  } = useGetSiteServices(Number(site_id), offset, limit, terminatedServices);

  const { data: siteTerminatedServices, isLoading: isTerminatedServicesLoader } = useGetSiteServices(
    Number(site_id),
    offset,
    limit,
    !terminatedServices,
  );

  const {
    data: siteTicketsData,
    isLoading: isSiteTicketsLoader,
    refetch: refetchTicketsData,
  } = useGetSiteTickets(Number(site_id), offset, limit);

  // get site services useGetSiteInvoices
  const {
    data: siteInvoicesData,
    isLoading: isSiteInvoicesLoader,
    refetch: getInvoices,
  } = useGetSiteInvoices(Number(site_id), offset, limit);

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
    await refetchData();
  };
  const showTerminatedHandler = async () => {
    setShowTerminated(!showTerminated);
  };
  const totlaPages = Math.max(siteServices?.total || 0, siteTerminatedServices?.total || 0);

  // Refining the data
  const refinedData: {
    number: string;
    service: string;
    serviceType: number;
    serviceDescription: string | null;
    serviceFunctionPurpose: string;
    serviceStatus: number;
    cost: number;
    invoiceDate: string;
  }[] = (showTerminated ? siteTerminatedServices?.data : siteServices?.data)?.map((item: any) => ({
    ['number']: item?.service?.number,
    account: item?.service?.companyNetwork?.network?.name + '-' + item?.service?.account,
    service_type: item?.service?.service_type,
    description: item?.service?.description,
    ['function / purpose']: item?.service.functionPurpose,
    serviceStatus:
      item?.service?.serviceStatus === 1 && item?.service?.suspended === 1
        ? 2
        : item?.service?.serviceStatus === 1 && item?.service?.suspended === 0
          ? 1
          : item?.service?.serviceStatus === 0 && item?.service?.suspended === 0
            ? 0
            : '-',
    cost:
      item?.service?.cost?.rentalRaw ||
      item?.service?.cost?.usageRaw ||
      item?.service?.cost?.otherRaw ||
      item?.service?.cost?.taxRaw
        ? `${currencyFormatter(parseFloat(item?.service?.cost?.rentalRaw) + parseFloat(item.service?.cost?.usageRaw) + parseFloat(item.service?.cost?.otherRaw) + parseFloat(item?.service?.cost?.taxRaw), countryCurrencyCode)} (${item?.service?.cost?.invoice?.invoiceDate ? format(parseISO(item?.service?.cost?.invoice?.invoiceDate), MONTH_YEAR_FORMAT) : '-'})`
        : '-',
  }));
  const refinedInvoices = siteInvoicesData?.invoices?.map((item: any) => {
    const { country_code, ...rest } = item;
    return rest;
  });

  const ticketsData = siteTicketsData?.tickets?.map((item: any) => {
    return {
      'Veroxos REF': item.reference,
      'Request Type': item.description,
      status: item.ticketStatusId,
      created: format(parseISO(item.created), DATE_TIME_FORMAT),
    };
  });
  /* eslint-disable react-hooks/rules-of-hooks */
  useEffect(() => {
    if (!isServicesLoader && !isTerminatedServicesLoader) {
      setShowServiceButton(siteServices?.data?.length > 0 || siteTerminatedServices?.data?.length > 0 ? true : false);
    }
  }, [isServicesLoader, isTerminatedServicesLoader]);
  const listOfTabs = [];

  if (costTrendData?.length > 0) {
    listOfTabs.push('cost-trend');
  }
  if (serviceTypes?.length > 0) {
    listOfTabs.push('service-type');
  }
  if (ticketsData?.length > 0) {
    listOfTabs.push('tickets');
  }
  if (refinedInvoices?.length > 0) {
    listOfTabs.push('invoices');
  }
  if (siteServices?.data?.length > 0 || siteTerminatedServices?.data?.length > 0) {
    listOfTabs.push('services');
  }
  return (
    <div className="w-full rounded-lg border border-custom-lightGray bg-custom-white px-7 py-5">
      <ScrollTabs tabs={['general-information', ...listOfTabs]}>
        {/* General Information  */}
        <div id="general-information">
          <SiteGeneralInfo
            label="General Information"
            isLoading={isSiteServiceDetailLoader}
            data={{
              veroxosId,
              siteCode,
              name,
              buildingName,
              streetLine1,
              streetLine2,
              city,
              stateCounty,
              postZipCode: postCode,
              country,
              contactName,
              contactEmail,
              latitude,
              longitude,
              status,
            }}
          />
          <Separator className="separator-bg-1 h-[1.0px]" />
        </div>

        {/* Cost Trend  */}
        {costTrendData?.length > 0 && (
          <div id="cost-trend">
            <LineChart
              className="cost-trend"
              label="Cost Trend"
              data={costTrendData}
              isLoading={isCostTrendLoading}
              currencyCode={countryCurrencyCode}
            />
            <Separator className="separator-bg-1 mt-4 h-[1.2px]" />
          </div>
        )}

        {/* Service Type */}
        {serviceTypes.length > 0 && (
          <div id="service-type">
            <div className="flex gap-4 pt-8 text-[1.375rem] font-[700] text-custom-blue">
              Service Type{' '}
              <TooltipText
                text={'Shows the volume of services splited by service type'}
                maxLength={1}
                className="text-[0.875rem] leading-6 text-[#575757]"
                type="notification"
              />
            </div>
            {isServiceTypesLoading ? (
              <Skeleton variant="paragraph" rows={3} />
            ) : Array.isArray(serviceTypes) && serviceTypes.length > 0 ? (
              <ServiceTypesGrid services={serviceTypes.sort((a, b) => b.subTypes?.length - a.subTypes?.length)} />
            ) : (
              <div className="flex w-full justify-center py-8 text-center text-lg">No data found.</div>
            )}
            <Separator className="separator-bg-1 mt-4 h-[1.2px]" />
          </div>
        )}

        {/* Tickets  */}
        {ticketsData?.length > 0 && (
          <div id="tickets">
            <TableData label="Tickets" loading={isSiteTicketsLoader} data={ticketsData} />
            <Separator className="separator-bg-1 mt-8 h-[1px]" />
          </div>
        )}

        {/* Invoices  */}
        {siteInvoicesData?.invoices?.length > 0 && (
          <div id="invoices">
            <TableData
              label="Invoices"
              data={refinedInvoices}
              currency={siteInvoicesData?.invoices[0]?.currency}
              loading={isSiteInvoicesLoader}
              tableClass="whitespace-nowrap"
            />
            <Separator className="separator-bg-1 mt-8 h-[1px]" />
          </div>
        )}

        {/* Service  */}
        <div id="services">
          {refinedData?.length > 0 && (
            <TableData label="Services" data={refinedData} loading={isServicesLoader} tableClass="whitespace-nowrap" />
          )}
          {totlaPages > 8 && (
            <div>
              <Pagination
                className="flex justify-end pt-4"
                totalPages={totlaPages}
                currentPage={Number(page)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
          {!isServicesLoader && !isTerminatedServicesLoader && showServiceButton && (
            <>
              {siteTerminatedServices?.data?.length > 0 && (
                <>
                  <button
                    onClick={showTerminatedHandler}
                    className="my-5 ml-auto block h-[48px] w-[280px] gap-2.5 rounded-lg border border-orange-500 bg-orange-500 px-[18px]"
                  >
                    <span className="text-base font-semibold text-white">
                      {showTerminated ? 'Show Live Services' : 'Show Terminated Services'}
                    </span>
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </ScrollTabs>
    </div>
  );
}

export default SiteDetailPage;
