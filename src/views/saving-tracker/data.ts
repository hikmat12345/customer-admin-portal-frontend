import { useGetAllSavings } from '@/hooks/useGetSavingTracker';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

export const useSavingTrackers = () => {
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;

  const period = Number(searchParams.get('period')) || undefined;
  const { data: savings, isLoading: isAllSavingsLoading } = useGetAllSavings(period);
  const savingTrackers = [
    {
      id: 1,
      title: 'Savings Identified',
      imgSrc: '/svg/saving-tracker/identified.svg',
      value: savings?.identified,
      valueColor: 'text-custom-dryBlue',
    },
    {
      id: 2,
      title: 'Savings Achieved',
      imgSrc: '/svg/saving-tracker/achieved.svg',
      value: savings?.achieved,
      valueColor: 'text-[#219653]',
    },
    {
      id: 3,
      title: 'Declined Savings',
      imgSrc: '/svg/saving-tracker/declined.svg',
      value: savings?.declined,
      valueColor: 'text-custom-red',
    },
    {
      id: 4,
      title: 'Pending Savings',
      imgSrc: '/svg/saving-tracker/pending.svg',
      value: savings?.pending,
      valueColor: 'text-custom-persimmon',
    },
  ];

  return { savingTrackers, isAllSavingsLoading };
};

export const statuses = [
  {
    id: '0',
    label: 'All',
    value: 'default',
  },
  {
    id: '1',
    label: 'Identified',
    value: 'identified',
  },
  {
    id: '2',
    label: 'Achieved',
    value: 'achieved',
  },
  {
    id: '3',
    label: 'Vendor Rejected',
    value: 'vendorRejected',
  },
  {
    id: '6',
    label: 'Client Rejected',
    value: 'clientRejected',
  },
  {
    id: '5',
    label: 'Waiting Client',
    value: 'waitingClient',
  },
  {
    id: '4',
    label: 'Waiting Vendor',
    value: 'waitingVendor',
  },
];
