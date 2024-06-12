'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import {
  useGetAssets,
  useGetCostPlan,
  useGetSingleServiceDetail,
  useGetTickets,
  useGetRecentActivity,
} from '@/hooks/useGetInventories';
import TableBodySkeleton from '@/components/ui/table/tableBodySkeleton';
import { Table } from '@/components/ui/table/table';
import TableData, { CostTable, PlanTable } from '@/components/ui/summary-tables/table';
import formatDate, { makeFileUrlFromBase64 } from '@/utils/utils';
import { ScrollTabs } from '@/components/ui/scroll-tabs';
import { DeviceInfoCard } from './components/device-info-card';
import GeneralInfo from './components/general-info';
import { parseISO } from 'date-fns';

type InventoryDetailPageProps = {
  serviceId: number;
};
const InventoryDetailPage = ({ serviceId }: InventoryDetailPageProps) => {
  const searchId = Number(serviceId);
  const { data: singleServiceData, isLoading: isServiceInfoLoader } = useGetSingleServiceDetail(searchId);
  const { data: costPlanData, isLoading: isCostPlanLoading } = useGetCostPlan(searchId);
  const { data: assetsData, isLoading: isAssetLoader } = useGetAssets(searchId);
  const { data: ticketsRecentActivityData, isLoading: isTicketsRecentActivityLoader } = useGetTickets(searchId);
  const { data: recentActivityData, isLoading: isRecentActivityLoader } = useGetRecentActivity(searchId);

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
    employee,
    serviceDescription,
  } = singleServiceData?.data?.general_info || {};

  //get site detail for google map location
  const site = singleServiceData?.data?.site || {};
  const { deviceid, simNumber, datePurchased, deviceName, status, image } = assetsData?.data[0] || {};
  // make image url from base64 string
  const imageUrl = makeFileUrlFromBase64(image ? Buffer.from(image).toString('base64') : null);
  const refineRecentActivityData = recentActivityData?.data?.recent_activity.map((activity: any) => ({
    // reference : activity.reference ? activity.reference : '',
    who: activity.agent,
    description: activity.description,
    when: formatDate(activity.createdAt, 'MMM dd, yyyy hh:mm a'),
  }));

  const structuredTicketsData = ticketsRecentActivityData?.data?.tickets.map((ticket: any) => ({
    'Veroxos REF': ticket.reference,
    'Request Type': ticket.description,
    status: ticket.ticketStatusId,
    created: formatDate(parseISO(ticket.created), 'MMM dd, yyyy hh:mm a'),
  }));
  return (
    <div className="w-full rounded-lg border border-custom-lightGray bg-custom-white px-7 py-5">
      <ScrollTabs tabs={['general-information', 'device-information', 'cost-&-plan', 'tickets', 'activity']}>
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
              serviceType: serviceType,
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
          <Separator className="h-[1.5px] bg-[#5d5b5b61]" />
        </div>

        <div id="device-information">
          <DeviceInfoCard
            label="Device Information"
            imageUrl={imageUrl}
            deviceName={deviceName}
            datePurchased={datePurchased}
            status={live}
            deviceId={deviceid}
            simNumber={simNumber}
            isAssetLoader={isAssetLoader}
          />
        </div>
        <div id="cost-&-plan">
          <div className="pt-8 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">Cost & Plan</div>
          {isCostPlanLoading ? (
            <Table>
              <TableBodySkeleton rowCount={2} columnCount={2} />
            </Table>
          ) : (
            <>
              <PlanTable data={costPlanData?.data?.plan} />
              <CostTable data={costPlanData?.data?.cost} costCenter={costCentre} />
            </>
          )}
          <Separator className="mt-4 h-[2.2px] bg-[#5d5b5b61]" />
        </div>

        <div id="tickets">
          <TableData label="Tickets" loading={isTicketsRecentActivityLoader} data={structuredTicketsData} />
          <Separator className="mt-8 h-[2px] bg-[#5d5b5b61]" />
        </div>

        <div id="activity">
          <TableData label="Recent Activity" data={refineRecentActivityData} loading={isRecentActivityLoader} />
        </div>
      </ScrollTabs>
    </div>
  );
};

export default InventoryDetailPage;
