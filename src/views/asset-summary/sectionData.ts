'use client';

import { DATE_FORMAT, DATE_TIME_FORMAT } from '@/utils/constants/constants';
import { format } from 'date-fns';

interface AssetSupport {
  endOfSale: Date | null;
  endOfSupport: Date | null;
  maintenanceDetail: string | null;
}

interface AssetKeyDateAndClientInfo {
  created: Date | null;
  updated: Date | null;
  dateDecommissioned: Date | null;
  decommissioningNote: string | null;
  customFieldName1: string | null;
  customFieldName2: string | null;
  customFieldName3: string | null;
}

export const GetAllSections = (assetValue: any, assetSupport: AssetSupport, assetKeyDate: AssetKeyDateAndClientInfo) => {
  const sections = [
    {
      id: 'asset-value',
      title: 'Asset Value',
      data: {
        purchasedValue: assetValue?.purchaseValueRaw || '-',
        datePurchased: assetValue?.datePurchased ? format(assetValue?.datePurchased, DATE_FORMAT) : '-',
        purchasedCurrency: assetValue?.country?.currencyCode || '-',
        purchasedNotes: assetValue?.purchaseNote || '-',
      },
      columns: [
        { header: 'Purchased Value', dataKey: 'purchasedValue' },
        { header: 'Date Purchased', dataKey: 'datePurchased' },
        { header: 'Purchased Currency', dataKey: 'purchasedCurrency' },
        { header: 'Purchased Notes', dataKey: 'purchasedNotes' },
      ],
    },
    {
      id: 'asset-support',
      title: 'Asset Support',
      data: {
        endOfSale: assetSupport?.endOfSale ? format(assetSupport?.endOfSale, DATE_FORMAT) : '-',
        maintenanceDetail: assetSupport?.maintenanceDetail || '-',
        endOfSupport: assetSupport?.endOfSupport ? format(assetSupport.endOfSupport, DATE_FORMAT) : '-',
      },
      columns: [
        { header: 'End Of Sale', dataKey: 'endOfSale' },
        { header: 'Maintenance Detail', dataKey: 'maintenanceDetail' },
        { header: 'End Of Support', dataKey: 'endOfSupport' },
      ],
    },
    {
      id: 'key-dates',
      title: 'Key Dates',
      data: {
        dateCreated: assetKeyDate?.created ? format(assetKeyDate?.created, DATE_TIME_FORMAT) : '-',
        dateDecommissioned: assetKeyDate?.dateDecommissioned ? format(assetKeyDate?.dateDecommissioned, DATE_TIME_FORMAT) : '-',
        decommissioningNote: assetKeyDate?.decommissioningNote || '-',
        dateUpdated: assetKeyDate?.updated ? format(assetKeyDate?.updated, DATE_TIME_FORMAT) : '-',
      },
      columns: [
        { header: 'Date Created', dataKey: 'dateCreated' },
        { header: 'Date Decommissioned', dataKey: 'dateDecommissioned' },
        { header: 'Decommissioning Note', dataKey: 'decommissioningNote' },
        { header: 'Date Updated', dataKey: 'dateUpdated' },
      ],
    },
    {
      id: 'client-information',
      title: 'Client Information',
      data: {
        customField1: assetKeyDate?.customFieldName1 || '-',
        customField2: assetKeyDate?.customFieldName2 || '-',
        customField3: assetKeyDate?.customFieldName3 || '-',
      },
      columns: [
        { header: 'Custom Field 1 Name', dataKey: 'customField1' },
        { header: 'Custom Field 2 Name', dataKey: 'customField2' },
        { header: 'Custom Field 3 Name', dataKey: 'customField3' },
      ],
    },
  ];
  return sections;
};
