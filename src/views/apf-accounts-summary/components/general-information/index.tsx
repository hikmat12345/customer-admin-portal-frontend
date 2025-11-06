import { APFInfoSkeletons } from '@/components/ui/summary-skeletons';
import TooltipText from '@/components/ui/textbox';
import { APFGeneralInfoProps } from '@/types/apf/apf';
import { FULL_DATE_AND_TIME_FORMAT } from '@/utils/constants/dateFormat.constants';
import { digitFormatter } from '@/utils/utils';
import { format } from 'date-fns';

export default function APFGeneralInfo({
  label = 'General Information',
  isLoading = false,
  data: {
    veroxosId,
    client,
    sentBy,
    accountGroup,
    fiscalMonth,
    fiscalYear,
    totalInvoices,
    totalAllocation,
    totalValue,
    deliveryMethod,
    deliveryDestination,
    sentAt,
  },
}: APFGeneralInfoProps) {
  const keys = [
    { label: 'Veroxos ID', value: veroxosId },
    { label: 'Account Group', value: accountGroup },
    { label: 'Total Invoices', value: totalInvoices },
    { label: 'Delivery Method', value: deliveryMethod },
    { label: 'Sent At', value: sentAt && format(sentAt, FULL_DATE_AND_TIME_FORMAT) },

    { label: 'Client', value: client },
    { label: 'Fiscal Month', value: fiscalMonth },
    { label: 'Total Allocation', value: totalAllocation },
    { label: 'Delivery Destination', value: deliveryDestination || '-' },

    { label: 'Sent By', value: sentBy },
    { label: 'Fiscal Year', value: fiscalYear },
    { label: 'Total Value', value: totalValue && digitFormatter(totalValue) },
  ];

  return (
    <div>
      {label && <div className="pb-6 text-[1.375rem] font-[700] text-custom-blue">{label}</div>}
      {isLoading ? (
        <APFInfoSkeletons />
      ) : (
        <div className="flex justify-between gap-3 text-nowrap pb-6 2lg:flex-row max-xl:block">
          <div className="flex w-[33%] justify-between gap-5 max-xl:w-[60%]">
            <div className="w-[48%] max-xl:w-[60%]">
              {keys.slice(0, 5).map((item, index) => (
                <div key={index} className="text-[0.875rem] font-[600] leading-7 text-[#000]">
                  {item.label}
                </div>
              ))}
            </div>
            <div className="w-[48%] max-xl:w-[60%]">
              {keys.slice(0, 5).map((item, index) => (
                <div key={index} className="text-[0.875rem] leading-7 text-[#575757]">
                  {item.value ? item.value : ' - '}
                </div>
              ))}
            </div>
            <div className="mr-3 h-[8.3rem] w-[2%] border-r-[2px] max-xl:!hidden" />
          </div>
          <div className="flex w-[33%] justify-between gap-5 max-xl:w-[60%]">
            <div className="w-[48%] max-xl:w-[60%]">
              {keys.slice(5, 9).map((item, index) => (
                <div key={index} className="text-[0.875rem] font-[600] leading-7 text-black">
                  {item.label}
                </div>
              ))}
            </div>
            <div className="w-[48%] max-xl:w-[60%]">
              {keys.slice(5, 9).map((item, index) => (
                <div key={index}>
                  <TooltipText
                    text={String(item.value ? item.value : ' - ')}
                    maxLength={20}
                    className="text-[0.875rem] leading-7 text-[#575757]"
                  />
                </div>
              ))}
            </div>
            <div className="mr-3 h-[8.3rem] w-[2%] border-r-[2px] max-xl:!hidden" />
          </div>
          <div className="flex w-[33%] justify-between gap-5 max-xl:w-[60%]">
            <div className="w-[48%] max-xl:w-[60%]">
              {keys.slice(9).map((item, index) => (
                <div key={index} className="text-[0.875rem] font-[600] leading-7 text-[#000]">
                  {item.label}
                </div>
              ))}
            </div>
            <div className="w-[48%] max-xl:w-[60%]">
              {keys.slice(9).map((item, index) => (
                <div key={index} className="text-[0.875rem] leading-7 text-[#575757]">
                  {item.value ? item.value : ' - '}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
