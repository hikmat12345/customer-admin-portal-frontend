import { TICKETS_STATUS_LIST } from '@/utils/constants/statusList.constants';
import { GeneralInfoProps } from '@/types/inventory/types';
import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import dynamic from 'next/dynamic';

const MapBox = dynamic(() => import('../../../../components/ui/map-box').then((mod) => mod.MapBox), {
  loading: () => <p>loading...</p>,
  ssr: false,
});
export default function GeneralInfo({
  label = 'General Information',
  isLoading = false,
  data: {
    veroxosId,
    serviceNumber,
    vendor,
    account,
    serviceType,
    serviceDescription,
    employee,
    purposeOfService,
    contractStartDate,
    contractEndDate,
    spare,
    zeroUsageAllowed,
    terminationDate,
    scheduledTerminationDate,
    scheduledSuspensionDate,
    notes,
    site,
  },
}: GeneralInfoProps) {
  const staticData = [
    { label: 'Veroxos ID', value: veroxosId },
    { label: 'Service Number', value: serviceNumber },
    { label: 'Vendor', value: vendor },
    { label: 'Account', value: account },
    { label: 'Service Type', value: serviceType ? TICKETS_STATUS_LIST[serviceType] : null },
    { label: 'Service Description', value: serviceDescription?.name },
    { label: 'Employee', value: employee ? `${employee.firstName} ${employee.lastName} ${employee.email}` : null },
    { label: 'Purpose / Function', value: purposeOfService },
    { label: 'Contract Start Date', value: contractStartDate },
    { label: 'Contract End Date', value: contractEndDate },
    { label: 'Spare', value: spare },
    { label: 'Zero Usage Allowed', value: zeroUsageAllowed },
    { label: 'Termination Date', value: terminationDate },
    { label: 'Scheduled Termination Date', value: scheduledTerminationDate },
    { label: 'Notes', value: notes },
    { label: 'Scheduled Suspension Date', value: scheduledSuspensionDate },
  ];

  return (
    <div>
      <div className="pb-6 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">{label}</div>
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="flex gap-[19px] pb-6 max-lg:block">
          <div className="flex w-[42%] justify-between max-lg:mt-5 max-lg:w-[100%]">
            <div className="w-[34%]">
              {staticData.slice(0, 8).map((item, index) => (
                <div
                  key={index}
                  className="font-[600] text-[#000] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7"
                >
                  {item.label}
                </div>
              ))}
            </div>
            <div className="w-[66%]">
              {staticData.slice(0, 8).map((item, index) => (
                <div key={index} className="text-[#575757] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                  {item.value ? item.value : ' - '}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-[30%] justify-between max-lg:mt-5 max-lg:w-[100%]">
            <div className="">
              {staticData.slice(8).map((item, index) => (
                <div
                  key={index}
                  className="font-[600] text-[#000] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7"
                >
                  {item.label}
                </div>
              ))}
            </div>
            <div>
              {staticData.slice(8).map((item, index) => (
                <div key={index} className="text-[#575757] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                  {item.value ? item.value : ' - '}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[30%] max-lg:mt-5 max-lg:w-[100%]">
            <div className="mapouter rounded-lg border border-neutral-300 p-1">
              <div className="gmap_canvas">
                <div className="gmap_canvas">
                  {site?.latitude && site?.longitude ? (
                    <MapBox
                      lat={site?.latitude}
                      long={site?.longitude}
                      address={site?.streetLine1 ? site?.streetLine1 : site?.streetLine2}
                      siteId={site?.id}
                    />
                  ) : (
                    <div className="flex h-[230px] items-center justify-center py-8 text-center align-bottom text-lg">
                      Google map can't find the location
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-1 text-center lg:text-[14px] xl:text-[16px]">
              <span className="font-semibold text-zinc-600">Address:</span>
              <span className="font-normal text-zinc-600">
                {' '}
                {site?.streetLine1 ? site?.streetLine1 : site?.streetLine2 ? site?.streetLine2 : ''}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
