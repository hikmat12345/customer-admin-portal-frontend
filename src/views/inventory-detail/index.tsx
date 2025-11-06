'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import {
  useGetAssets,
  useGetCostPlan,
  useGetSingleServiceDetail,
  useGetTickets,
  useGetRecentActivity,
  useGetServiceCostTrend,
} from '@/hooks/useGetInventories';
import TableBodySkeleton from '@/components/ui/table/tableBodySkeleton';
import { Table } from '@/components/ui/table/table';
import TableData, { CostTable, PlanTable } from '@/components/ui/summary-tables/table';
import formatDate, { makeFileUrlFromBase64 } from '@/utils/utils';
import { ScrollTabs } from '@/components/ui/scroll-tabs';
import { DeviceInfoCard } from './components/device-info-card';
import GeneralInfo from './components/general-info';
import { parseISO } from 'date-fns';
import { getServiceType } from '@/utils/enums/serviceType.enum';
import { DATE_TIME_FORMAT } from '@/utils/constants/constants';
import Error from '@/components/ui/error';
import dynamic from 'next/dynamic';
const MixChart = dynamic(() => import('../../components/ui/mix-chart/mix-chart').then((mod) => mod.default), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

type InventoryDetailPageProps = {
  serviceId: number;
};
const InventoryDetailPage = ({ serviceId }: InventoryDetailPageProps) => {
  const searchId = Number(serviceId);
  const costTrendLimit = 12;

  const {
    data: singleServiceData,
    isLoading: isServiceInfoLoader,
    isError: singleServiceError,
  } = useGetSingleServiceDetail(searchId);
  const countryCurrencyCode = singleServiceData?.data?.general_info?.companyNetwork?.network?.country?.currencyCode;
  const { data: costPlanData, isLoading: isCostPlanLoading, isError: costPlanError } = useGetCostPlan(searchId);
  const { data: assetsData, isLoading: isAssetLoader, isError: assetsError } = useGetAssets(searchId);
  const {
    data: ticketsRecentActivityData,
    isLoading: isTicketsRecentActivityLoader,
    isError: ticketRecentActivityError,
  } = useGetTickets(searchId);
  const {
    data: recentActivityData,
    isLoading: isRecentActivityLoader,
    isError: recentActivityError,
  } = useGetRecentActivity(searchId);
  const {
    data: serviceCostTrendData,
    isLoading: isServiceCostTrendLoader,
    isError: serviceCostTrendError,
  } = useGetServiceCostTrend(searchId, costTrendLimit);
  const {
    id,
    serviceNumber,
    companyNetworkId,
    live,
    costCentre,
    serviceType,
    spare,
    zeroUsageAllowed,
    contractStartDate,
    contractEndDate,
    terminationDate,
    scheduledTerminationDate,
    scheduledSuspensionDate,
    note,
    purposeOfService,
    account_number,
    vendor,
    suspended,
    employee,
    serviceDescription,
  } = singleServiceData?.data?.general_info || {};

  //get site detail for google map location
  const site = singleServiceData?.data?.site || {};
  const { deviceid, simNumber, datePurchased, deviceName, status, image, assetId } = assetsData?.data[0] || {};
  // make image url from base64 string
  const imageUrl = makeFileUrlFromBase64(image ? Buffer.from(image).toString('base64') : null);
  const refineRecentActivityData = recentActivityData?.data?.recent_activity.map((activity: any) => ({
    // reference : activity.reference ? activity.reference : '',
    who: activity.agent,
    description: activity.description,
    when: formatDate(activity.createdAt, DATE_TIME_FORMAT),
  }));

  const structuredTicketsData = ticketsRecentActivityData?.data?.tickets.map((ticket: any) => ({
    'Veroxos REF': ticket.reference,
    'Request Type': ticket.description,
    status: ticket.ticketStatusId,
    created: formatDate(parseISO(ticket.created), DATE_TIME_FORMAT),
  }));

  const listOfTabs = [];
  if (serviceCostTrendData?.length > 0) {
    if (serviceCostTrendData[0]?.length > 0) {
      listOfTabs.push('cost-trend');
    }
  }
  if (structuredTicketsData?.length > 0) {
    listOfTabs.push('tickets');
  }
  if (refineRecentActivityData?.length > 0) {
    listOfTabs.push('recent-activity');
  }

  if (singleServiceError || costPlanError || assetsError || ticketRecentActivityError || recentActivityError) {
    return <Error />;
  }
  return (
    <div className="w-full rounded-lg border border-custom-lightGray bg-custom-white px-7 py-5">
      <ScrollTabs
        tabs={['general-information', 'device-information', 'cost-&-plan', ...listOfTabs]}
        page="inventory-detail"
      >
        <div id="general-information">
          <GeneralInfo
            label="General Information"
            isLoading={isServiceInfoLoader}
            data={{
              veroxosId: id,
              serviceNumber: serviceNumber,
              vendor,
              accountLinkid: companyNetworkId,
              account: account_number,
              serviceType: serviceType !== undefined && serviceType !== null ? getServiceType(serviceType) : '-',
              serviceDescription: serviceDescription,
              employee: employee,
              purposeOfService: purposeOfService,
              contractStartDate: contractStartDate,
              contractEndDate: contractEndDate,
              spare: spare,
              zeroUsageAllowed: zeroUsageAllowed,
              terminationDate: terminationDate,
              scheduledTerminationDate: scheduledTerminationDate,
              scheduledSuspensionDate: scheduledSuspensionDate,
              notes: note,
              site: site,
            }}
          />
          <Separator className="separator-bg-1 h-[1.0px]" />
        </div>

        <div id="device-information">
          <DeviceInfoCard
            label="Device Information"
            imageUrl={imageUrl}
            deviceName={deviceName}
            datePurchased={datePurchased}
            status={live}
            suspended={suspended}
            deviceId={deviceid}
            simNumber={simNumber}
            isAssetLoader={isAssetLoader}
            assetId={assetId}
          />
        </div>
        <div id="cost-&-plan">
          {isCostPlanLoading ? (
            <Table>
              <TableBodySkeleton rowCount={2} columnCount={2} />
            </Table>
          ) : (
            <>
              {costPlanData?.data?.plan?.length > 0 ? (
                <>
                  <div className="pt-8 text-[1.375rem] font-[700] text-custom-blue">Cost & Plan</div>
                  <PlanTable data={costPlanData?.data?.plan} currencyCode={countryCurrencyCode} />
                </>
              ) : (
                <>
                  <div className="pt-8 text-[1.375rem] font-[700] text-custom-blue">Cost & Plan</div>
                  <div className="py-8 text-center text-lg">No data found</div>
                </>
              )}
              {(costPlanData?.data?.cost?.length > 0 || costCentre) && (
                <>
                  <div className="pt-8 text-[1.175rem] font-[600] text-[#1D46F3]">GL Allocations</div>
                  <CostTable data={costPlanData?.data?.cost} costCenter={costCentre} />
                </>
              )}
              {costPlanData?.data?.plan?.length > 0 ||
                (costCentre &&
                  (costPlanData?.data?.cost?.length > 0 ||
                    (costCentre && <Separator className="separator-bg-1 mt-4 h-[1.0px]" />)))}
            </>
          )}
        </div>
        {/* Cost Trend  */}
        {serviceCostTrendData?.length > 0 && serviceCostTrendData[0]?.length > 0 && !isServiceInfoLoader && (
          <div id="cost-trend">
            <MixChart
              label="Cost Trend"
              data={serviceCostTrendData}
              isLoading={isServiceCostTrendLoader}
              currencyCode={countryCurrencyCode}
            />
            <Separator className="separator-bg-1 mt-4 h-[1.2px]" />
          </div>
        )}

        {structuredTicketsData?.length > 0 && (
          <div id="tickets">
            <TableData label="Tickets" loading={isTicketsRecentActivityLoader} data={structuredTicketsData} />
            <Separator className="separator-bg-1 mt-8 h-[1px]" />
          </div>
        )}

        {refineRecentActivityData?.length > 0 && (
          <div id="activity">
            <TableData label="Recent Activity" data={refineRecentActivityData} loading={isRecentActivityLoader} />
          </div>
        )}
      </ScrollTabs>
    </div>
  );
};

export default InventoryDetailPage;
