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
import { makeFileUrlFromBase64 } from '@/utils/utils';
import { ScrollTabs } from '@/components/ui/scroll-tabs';
import { DeviceInfoCard } from './components/device-info-card';
import GeneralInfo from './components/general-info';

type InventoryDetailPageProps = {
  serviceId: number;
};
function InventoryDetailPage({ serviceId }: InventoryDetailPageProps) {
  const searchId = Number(serviceId);
  const { data: singleServiceData, isLoading: isServiceInfoLoader } = useGetSingleServiceDetail(searchId);
  const { data: costPlanData, isLoading: isCostPlanLoading } = useGetCostPlan(searchId);
  const { data: assetsData, isLoading: isAssetLoader } = useGetAssets(searchId);
  const { data: ticketsRecentActivityData, isLoading: isTicketsRecentActivityLoader } = useGetTickets(searchId);
  const { data: recentActivityData, isLoading: isRecentActivityLoader } = useGetRecentActivity(searchId);

  const {
    id,
    serviceNumber,
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
    accountNumber,
    vendor,
    employee,
    serviceDescription,
  } = singleServiceData?.data?.general_info || {};

  // get site detail for google map location
  const site = singleServiceData?.data?.site || {};
  const { deviceid, simNumber, datePurchased, deviceName, status, image } = assetsData?.data[0] || {};
  // make image url from base64 string
  const imageUrl = makeFileUrlFromBase64(image ? Buffer.from(image).toString('base64') : null);
  const refineRecentActivityData = recentActivityData?.data?.recent_activity.map((activity: any) => ({
    description: activity.description,
    who: activity.who,
    created: activity.createdAt,
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
              serviceNumber,
              vendor,
              account: accountNumber,
              serviceType,
              serviceDescription: serviceDescription?.name,
              employee,
              purposeOfService,
              contractStartDate,
              contractEndDate,
              spare,
              zeroUsageAllowed,
              terminationDate,
              scheduledTerminationDate,
              scheduledSuspensionDate,
              notes: note,
              site,
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
            status={status?.name}
            deviceid={deviceid}
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
          <TableData
            label="Tickets"
            loading={isTicketsRecentActivityLoader}
            data={ticketsRecentActivityData?.data?.tickets}
          />
          <Separator className="mt-8 h-[2px] bg-[#5d5b5b61]" />
        </div>

        <div id="activity">
          <TableData label="Recent Activity" data={refineRecentActivityData} loading={isRecentActivityLoader} />
        </div>
      </ScrollTabs>
    </div>
  );
}

export default InventoryDetailPage;
