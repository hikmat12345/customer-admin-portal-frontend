import { Separator } from '@/components/ui/separator';
import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import TooltipText from '@/components/ui/textbox';

export default function AssetDetailedInfo({
  label = 'Detailed Information',
  isLoading = false,
  data: {
    os,
    ownership,
    simNumber,
    color,
    processor,
    keyFeatures,
    vendorLocked,
    OSVersion,
    deviceManagement,
    installedLocation,
    memory,
    ram,
    portDetail,
    lockedVendor,
  },
}: any) {
  const keys = [
    { label: 'OS', value: os },
    { label: 'Ownership', value: ownership },
    { label: 'SIM Number', value: simNumber },
    {
      label: 'Color',
      value: color,
    },
    {
      label: 'Processor',
      value: processor,
    },
    { label: 'Key Features', value: keyFeatures },
    {
      label: 'Vendor Locked',
      value: vendorLocked,
    },
    {
      label: 'OS Version',
      value: OSVersion,
    },
    { label: 'Device Management', value: deviceManagement },
    { label: 'Installed Location', value: installedLocation },
    { label: 'Memory (Disk Space)', value: memory },
    { label: 'RAM (MB)', value: ram },
    {
      label: 'Port Detail (Number of port / Speed)',
      value: portDetail,
    },
    {
      label: 'Locked Vendor',
      value: lockedVendor,
    },
  ];

  return (
    <div className="mt-4">
      {label && <div className="pb-6 text-[1.375rem] font-[700] text-custom-blue">{label}</div>}
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="flex gap-x-[4.375rem] text-nowrap pb-6 max-lg:block">
          <div className="flex justify-between sm:w-[50%] lg:w-[35%] lg:gap-x-[2.375rem] 2lg:gap-x-[4.375rem] max-lg:w-[100%]">
            <div className="sm:w-[50%] lg:w-[45%] 2lg:w-[35%] xl:w-[25%]">
              {keys.slice(0, 7).map((item, index) => (
                <div key={index} className="text-[0.875rem] font-[600] leading-7 text-[#000]">
                  <TooltipText text={item?.label} maxLength={20} />
                </div>
              ))}
            </div>
            <div className="sm:w-[50%] lg:w-[55%] 2lg:w-[65%] xl:w-[75%]">
              {keys.slice(0, 7).map((item, index) => (
                <div key={index} className="text-[0.875rem] leading-7 text-[#575757]">
                  {item.value ? item.value : ' - '}
                </div>
              ))}
            </div>
          </div>
          <div className="flex sm:w-[50%] sm:justify-between lg:w-[45%] lg:justify-center lg:gap-x-[2.375rem] 2lg:gap-x-[4.375rem] max-lg:mt-5 max-lg:w-[100%]">
            <div className="sm:w-[50%] lg:w-[65%] 2lg:w-[44%] xl:w-[45%]">
              {keys.slice(7).map((item, index) => (
                <div key={index} className="text-[0.875rem] font-[600] leading-7 text-[#000]">
                  <TooltipText text={item?.label} maxLength={20} />
                </div>
              ))}
            </div>
            <div className="sm:w-[50%] lg:w-[42%] 2lg:w-[58%] xl:w-[68%]">
              {keys.slice(7).map((item, index) => (
                <div key={index} className="text-[0.875rem] leading-7 text-[#575757]">
                  {item.value ? item.value : ' - '}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Separator className="separator-bg-1 mt-8 h-[1px]" />
    </div>
  );
}
