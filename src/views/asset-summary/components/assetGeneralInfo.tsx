import { Separator } from '@/components/ui/separator';
import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import TooltipText from '@/components/ui/textbox';
import Link from 'next/link';

export default function AssetGeneralInfo({
  label = 'General Information',
  isLoading = false,
  employeeId,
  siteId,
  data: {
    veroxosId,
    company,
    serialNumber,
    manufacturer,
    employee,
    notes,
    clientEmployeeId,
    assetName,
    assetType,
    model,
    location,
    site,
  },
}: any) {
  const keys = [
    { label: 'Veroxos ID', value: veroxosId },
    { label: 'Serial Number', value: serialNumber },
    {
      label: 'Manufacturer',
      value: manufacturer,
    },
    { label: 'Employee', value: employee || 'NA', isLink: true, link: `/employees/${employeeId}` },
    {
      label: 'Notes',
      value: notes,
    },
    {
      label: 'Client Asset ID',
      value: clientEmployeeId,
    },
    { label: 'Name', value: assetName },
    { label: 'Asset Type', value: assetType },
    { label: 'Model', value: model },
    { label: 'Location', value: location },
    {
      label: 'Site',
      value: site || 'NA',
      isLink: true,
      link: `/sites/${siteId}`,
    },
  ];

  return (
    <div className="mt-4">
      {label && <div className="pb-6 text-[1.375rem] font-[700] text-custom-blue">{label}</div>}
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="text-nowrap pb-6 pl-1 pr-1 sm:block sm:gap-x-[1rem] xl:flex xl:gap-x-[2.1rem] 2xl:gap-x-[3.75rem]">
          <div className="sm:block sm:w-[100%] lg:flex xl:w-[80%]">
            <div className="flex justify-between sm:w-[100%] lg:w-[60%] lg:gap-x-[2rem] xl:gap-x-[2.1rem] 2xl:gap-x-[3.75rem] max-lg:w-[100%]">
              <div className="leading-6 sm:w-[50%] lg:w-[40%]">
                {keys.slice(0, 5).map((item, index) => (
                  <div key={index} className="text-[0.875rem] font-[600] leading-7 text-[#000]">
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="leading-6 sm:w-[50%] sm:pl-4 lg:w-[60%] lg:pl-0">
                {keys.slice(0, 5).map((item, index) => {
                  return (
                    <div key={index} className="text-[0.875rem] leading-7 text-[#575757]">
                      {item.value !== 'NA' && item.isLink ? (
                        <Link href={item.link} target="_blank" className="text-blue-500 underline">
                          {item?.value ? <TooltipText text={item.value} maxLength={25} /> : ' - '}
                        </Link>
                      ) : item.value ? (
                        <TooltipText text={item.value} maxLength={25} />
                      ) : (
                        ' - '
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center sm:mt-5 sm:w-[100%] lg:mt-0 lg:w-[50%] lg:gap-x-[2rem] xl:gap-x-[2.1rem] 2xl:gap-x-[3.75rem] max-lg:mt-5 max-lg:w-[100%]">
              <div className="leading-6 sm:w-[50%] lg:w-[40%]">
                {keys.slice(6).map((item, index) => {
                  return (
                    <div key={index} className="text-[0.875rem] font-[600] leading-7 text-[#000]">
                      <TooltipText text={item?.label} maxLength={40} />
                    </div>
                  );
                })}
              </div>
              <div className="leading-6 sm:w-[50%] sm:pl-4 lg:w-[30%] lg:pl-0">
                {keys.slice(6).map((item, index) => {
                  return (
                    <div key={index} className="text-[0.875rem] leading-7 text-[#575757]">
                      {item.value !== 'NA' && item.isLink ? (
                        <Link href={item.link} target="_blank" className="text-blue-500 underline">
                          {item?.value ? <TooltipText text={item.value} maxLength={20} /> : ' - '}
                        </Link>
                      ) : (
                        <TooltipText text={item.value} maxLength={20} /> || ' - '
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <Separator className="separator-bg-1 mt-8 h-[1px]" />
    </div>
  );
}
