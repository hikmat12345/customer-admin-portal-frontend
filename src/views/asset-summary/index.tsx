'use client';

import React from 'react';
import AssetGeneralInfo from './components/assetGeneralInfo';
import { format } from 'date-fns';
import { DATE_TIME_FORMAT } from '@/utils/constants/constants';
import { makeFileUrlFromBase64 } from '@/utils/utils';
import TableData from '@/components/ui/summary-tables/table';
import { Separator } from '@/components/ui/separator';
import { SectionTable } from './components/sectionTable';
import { ScrollTabs } from './components/scrollTabs';
import { AssetDeviceInfoCard } from './components/assetDeviceInformation';
import AssetServiceInfo from './components/assetServiceInfo';
import AssetDetailedInfo from './components/assetDetailInfo';
import {
  useGetAssetById,
  useGetAssetChangeLogById,
  useGetAssetDetailedInfoById,
  useGetAssetKeyDatesById,
  useGetAssetSupportById,
  useGetAssetValueById,
} from '@/hooks/useGetAssets';
import { useParams } from 'next/navigation';
import { getServiceType } from '@/utils/enums/serviceType.enum';
import { GetAllSections } from './sectionData';
import { useGetTicketsByAssetId } from '@/hooks/useTickets';

interface TransformedLog {
  who: string;
  description: string;
  when: Date;
}

const AssetSummaryPage = () => {
  const params = useParams();

  const assetId = +params.id;
  const { data: assetValue } = useGetAssetValueById(assetId);

  const { data: assetSupport } = useGetAssetSupportById(assetId);

  const { data: assetKeyDate } = useGetAssetKeyDatesById(assetId);

  const { data: assetGeneralInfo, isLoading: isAssetGeneralInfoLoading } = useGetAssetById(assetId);

  const { data: assetDetailedInfo, isLoading: isAssetDetailInfoLoading } = useGetAssetDetailedInfoById(assetId);

  const { data: assetChangeLogs, isLoading: isAssetChangeLogLoading } = useGetAssetChangeLogById(assetId);

  const { data: ticketsByAsset, isLoading: isTicketsByAssetLoading } = useGetTicketsByAssetId(assetId);

  const sections = GetAllSections(assetValue, assetSupport, assetKeyDate);

  const structuredTicketsData = ticketsByAsset?.map((ticket: any) => ({
    'Veroxos REF': `SUP${ticket.id}`,
    'Description': ticket.description,
    status: ticket?.ticketStatus?.name,
    created: format(new Date(ticket.created), DATE_TIME_FORMAT),
  }));

  const tabs = [
    'general-information',
    'device-information',
    'service',
    structuredTicketsData?.length > 0 ? 'tickets' : '',
    'asset-value',
    'asset-support',
    'key-dates',
    'client-information',
    'detailed-information',
    assetChangeLogs?.length > 0 ? 'change-log' : '',
  ].filter(Boolean); // Remove undefined entries

  const nameWithEmail = assetGeneralInfo?.employee
    ? `${assetGeneralInfo?.employee?.firstName} ${assetGeneralInfo?.employee?.lastName} - ${assetGeneralInfo?.employee?.email}`
    : '';
  const site = assetGeneralInfo?.site
    ? `${assetGeneralInfo?.site?.streetLine1} ${assetGeneralInfo?.site?.streetLine2},${assetGeneralInfo?.site?.postCode}`
    : '';

  const imageUrl = makeFileUrlFromBase64(
    assetGeneralInfo?.manufacturerDevice?.image
      ? Buffer.from(assetGeneralInfo?.manufacturerDevice?.image).toString('base64')
      : null,
  );

  const changeLogs = assetChangeLogs?.map(
    (item: { agent: string; description: string; created: Date }): TransformedLog => ({
      who: item.agent,
      description: item.description,
      when: item.created,
    }),
  );

  return (
    <div className="w-full rounded-lg border border-custom-lightGray bg-custom-white px-7 py-5">
      <ScrollTabs tabs={tabs}>
        <div>
          <AssetGeneralInfo
            label="General Information"
            isLoading={isAssetGeneralInfoLoading}
            employeeId={assetGeneralInfo?.employee?.id}
            siteId={assetGeneralInfo?.site?.id}
            data={{
              veroxosId: assetGeneralInfo?.id,
              company: assetGeneralInfo?.company?.name,
              serialNumber: assetGeneralInfo?.serialNumber,
              manufacturer: assetGeneralInfo?.manufacturerDevice?.manufacturer?.name,
              employee: nameWithEmail,
              notes: assetGeneralInfo?.note,
              clientEmployeeId: assetGeneralInfo?.clientAssetTagNumber,
              assetName: assetGeneralInfo?.name,
              assetType: assetGeneralInfo?.assetType?.name,
              model: assetGeneralInfo?.manufacturerDevice?.name,
              location: assetGeneralInfo?.location?.name || 'Unknown',
              site: site,
            }}
          />
        </div>
        <div>
          <AssetDeviceInfoCard
            label="Device Information"
            imageUrl={imageUrl}
            deviceName={assetGeneralInfo?.name}
            status={assetGeneralInfo?.status?.name}
            dmStatus={0}
            simNumber={assetGeneralInfo?.simNumber}
            isAssetLoader={isAssetGeneralInfoLoading}
          />
        </div>
        <div>
          <AssetServiceInfo
            label="Service"
            isLoading={isAssetGeneralInfoLoading}
            data={{
              number: assetGeneralInfo?.service?.serviceNumber,
              vendor: assetGeneralInfo?.companyNetwork?.network?.name,
              serviceType: getServiceType(assetGeneralInfo?.service?.serviceType),
              purpose: assetGeneralInfo?.service?.purposeOfService,
              subAccountNumber: assetGeneralInfo?.service?.subAccountNumber,
              status: assetGeneralInfo?.service?.live === 0 ? 'Terminated' : 'Live',
              accountNumber: assetGeneralInfo?.service?.companyNetwork?.accountNumber,
              description: assetGeneralInfo?.service?.serviceDescription?.name,
              suspended: assetGeneralInfo?.service?.suspended === 0 ? 'No' : 'Yes',
              costCenter: assetGeneralInfo?.service?.costCentre,
              logo: assetGeneralInfo?.service?.companyNetwork?.network?.logo,
            }}
          />
        </div>

        {structuredTicketsData?.length > 0 && (
          <div id="tickets">
            <TableData label="Tickets" loading={isTicketsByAssetLoading} data={structuredTicketsData} />
            <Separator className="separator-bg-1 mt-8 h-[1px]" />
          </div>
        )}

        {sections.map((section: any, sectionIndex: number) => (
          <div id={section.id} key={section.id}>
            <SectionTable section={section} sectionIndex={sectionIndex} />
          </div>
        ))}
        <div>
          <AssetDetailedInfo
            label="Detailed Information"
            isLoading={isAssetDetailInfoLoading}
            data={{
              os: assetDetailedInfo?.os?.name,
              ownership: assetDetailedInfo?.ownership?.name,
              simNumber: assetDetailedInfo?.simNumber,
              color: assetDetailedInfo?.color?.name,
              processor: assetDetailedInfo?.processor,
              keyFeatures: assetDetailedInfo?.keyFeature,
              vendorLocked: assetDetailedInfo?.vendorLocked ? 'Yes' : 'No',
              OSVersion: assetDetailedInfo?.osVersion,
              deviceManagement: assetDetailedInfo?.deviceManagementVendor
                ? assetDetailedInfo?.deviceManagementVendor?.name
                : '',
              installedLocation: assetDetailedInfo?.installedLocation,
              memory: assetDetailedInfo?.memory?.name,
              ram: assetDetailedInfo?.ramMb || '',
              portDetail: assetDetailedInfo?.portDetail,
              lockedVendor: assetDetailedInfo?.lockedNetwork?.name,
            }}
          />
        </div>
        {changeLogs?.length > 0 && (
          <div>
            <TableData label="Change Log" data={changeLogs} loading={isAssetChangeLogLoading} />
          </div>
        )}
      </ScrollTabs>
    </div>
  );
};

export default AssetSummaryPage;
