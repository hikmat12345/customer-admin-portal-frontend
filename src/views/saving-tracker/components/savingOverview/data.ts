import { FileAttachment, SavingTrackerData } from '@/types/saving-tracker/types';
import { DATE_FORMAT_TO_MMM_DD_YYYY } from '@/utils/constants/dateFormat.constants';
import { getServiceType } from '@/utils/utils';
import { format } from 'date-fns';

export const useSavingOverviewOptions = (data: SavingTrackerData, attachments: FileAttachment[]) => {
  console.log('attachments', attachments);

  const options = [
    {
      id: 1,
      label: 'Saving ID',
      value: `S${data?.id}`,
    },
    {
      id: 2,
      label: 'Recurring Months',
      value: data?.recurringMonths,
    },
    {
      id: 3,
      label: 'Account',
      value: data?.companyNetwork?.accountNumber,
    },
    {
      id: 4,
      label: 'Vendor',
      value: data?.companyNetwork?.network?.name,
    },
    {
      id: 5,
      label: 'Spotted',
      value: format(new Date(data?.created), DATE_FORMAT_TO_MMM_DD_YYYY) || '-',
    },
    {
      id: 6,
      label: 'Saving Achieved',
      value: `$${(+data?.savingAchievedRaw).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      id: 7,
      label: 'Saving',
      value: `$${(+data?.savingRaw).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      id: 8,
      label: 'Service',
      value: `All Network | ${getServiceType(data?.serviceType)}`,
    },
    {
      id: 9,
      label: 'Country',
      value: data?.country?.name,
    },
    {
      id: 10,
      label: 'Attachments',
      value: 'Attachment File',
    },
  ];

  return options;
};
