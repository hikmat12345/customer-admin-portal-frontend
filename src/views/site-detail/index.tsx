'use client';

import React, { useEffect } from 'react'
import { Separator } from "@/components/ui/separator"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useGetCostTrend, useGetServiceTypes, useGetSiteInvoices, useGetSiteDetail, useGetSiteServices, useGetSiteTickets } from '@/hooks/useGetSites'
import SiteGeneralInfo from './components/site-general-info'
import CreateQueryString from '@/utils/createQueryString'
import { moneyFormatter } from '@/utils/utils'
import Skeleton from '@/components/ui/skeleton/skeleton'
import Pagination from '@/components/ui/pagination'
import LineChart from '@/components/ui/line-chart'
import TableData from '@/components/ui/summary-tables/table'
import ServiceTypesGrid from '@/components/ui/service-badge'
import { ScrollTabs } from '@/components/ui/scroll-tabs'
import TooltipText from '@/components/ui/textbox'

type SiteDetailPageProps = {
  siteId: number;
};
function SiteDetailPage({ siteId }: SiteDetailPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isTerminated = searchParams?.get('showTerminated');

  const [showTerminated, setShowTerminated] = React.useState(isTerminated === 'true');
  const createQueryString = CreateQueryString();

  const site_id = siteId;
  const page = searchParams?.get('page') || '1';

  const limit = 7;
  const offset = +page - 1;

  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys());

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

  // get services types data
  const { data: serviceTypesData, isLoading: isServiceTypesLoading } = useGetServiceTypes(Number(site_id));
  const serviceTypes = serviceTypesData?.data || [];

  // cost and trend data
  const { data: costTrendData, isLoading: isCostTrendLoading } = useGetCostTrend(Number(site_id));
  // site services data
  const {
    data: siteServices,
    isLoading: isServicesLoader,
    refetch: refetchData,
  } = useGetSiteServices(Number(site_id), offset, limit, showTerminated);

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
    await refetchData();
    await refetchTicketsData();
  };
  const totlaPages = Math.max(siteServices?.total || 0, siteTicketsData?.total || 0, siteInvoicesData?.total || 0);

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
	}[] = siteServices?.data?.map((item: any) => ({
		number: item?.service?.number,
		account: item?.service?.companyNetwork?.network?.name + "-" + item?.service?.account,
		service_type: item?.service?.service_type,
		description: item?.service?.description,
		["function / purpose"]: item?.service["function / purpose"],
		"service status": item?.service["service status"],
		cost: `${moneyFormatter(parseFloat(item?.service?.cost?.rentalRaw) + parseFloat(item.service?.cost?.usageRaw) + parseFloat(item.service?.cost?.otherRaw) + parseFloat(item?.service?.cost?.taxRaw), "usd")} (${item?.service?.cost?.invoice?.invoiceDate})`,
	}));

  const refinedInvoices = siteInvoicesData?.invoices?.map((item: any) => {
    const { country_code, ...rest } = item;
    return rest;
  });

  useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
    if (showTerminated) {
      router.push(`${pathname}?${createQueryString('showTerminated', showTerminated.toString())}`);
    }
  }, [keys.length, showTerminated]);

  useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
  }, [keys.length]);

  return (
    <div className="w-full rounded-lg border border-custom-lightGray bg-custom-white px-7 py-5">
      <ScrollTabs tabs={['general-information', 'cost-trend', 'service-type', 'tickets', 'invoices', 'services']}>
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
              status: status === 0 ? 'Live' : status === 1 ? 'Archived' : '',
            }}
          />
          <Separator className="h-[1.5px] bg-[#5d5b5b61]" />
        </div>

        {/* Cost Trend  */}
        <div id="cost-trend">
          <LineChart label="Cost Trend" data={costTrendData} isLoading={isCostTrendLoading} />
          <Separator className="mt-4 h-[2.2px] bg-[#5d5b5b61]" />
        </div>

				{/* Service Type */}
				<div id="service-type">
					<div className='text-custom-blue lg:text-[20px] xl:text-[22px] font-[700] pt-8 flex gap-4'>Service Type <TooltipText
						text={'Show the volume of services splited by service type'}
						maxLength={1}
						className="text-[#575757] lg:text-[13px] xl:text-[14px] leading-6" 
						type= 'notification'
						/>
					</div>
					<div className='flex gap-4 mt-4 flex-wrap'>
						{isServiceTypesLoading ?
							<Skeleton variant="paragraph" rows={3} /> :
							Array.isArray(serviceTypes) && serviceTypes.length > 0 ?
								<ServiceTypesGrid services={serviceTypes.sort((a, b) => b.subTypes?.length - a.subTypes?.length)} />
								:
								<div className='text-center text-lg py-8 flex justify-center w-full'>Data Not Found</div>
						}
					</div>
					<Separator className='h-[3.2px] mt-4 bg-[#5d5b5b61]' />
				</div>

        {/* Tickets  */}
        <div id="tickets">
          <TableData label="Tickets" loading={isSiteTicketsLoader} data={siteTicketsData?.data?.tickets} />
          <Separator className="mt-8 h-[2px] bg-[#5d5b5b61]" />
        </div>

				{/* Invoices  */}
				<div id="invoices">
					<TableData
						label="Invoices"
						data={refinedInvoices}
						currency={siteInvoicesData?.invoices[0]?.currency}
						loading={isSiteInvoicesLoader}
						tableClass='whitespace-nowrap'
					/>
					<Separator className='h-[2px] bg-[#5d5b5b61]  mt-8' />
				</div>

				{/* Service  */}
				<div id="services">
					<TableData
						label="Services"
						data={refinedData}
						loading={isServicesLoader}
						tableClass='whitespace-nowrap'
					/>
				</div>
				{totlaPages > 8 && (
					<div>
						<Pagination
							className="flex justify-end pt-4"
							totalPages={totlaPages}
							currentPage={Number(page)}
							onPageChange={handlePageChange}
						/>
					</div>)}
				<button
					onClick={showTerminatedHandler}
					className="w-[280px] h-[48px] px-[18px] pt-3 pb-4 bg-orange-500 rounded-lg border border-orange-500 my-5   gap-2.5  ml-auto block">
					<span className="text-white text-base font-semibold ">{showTerminated ? "Show Terminated Service" : "Show Live Services"} </span>
				</button>
			</ScrollTabs>
		</div>
	)
}

export default SiteDetailPage;
