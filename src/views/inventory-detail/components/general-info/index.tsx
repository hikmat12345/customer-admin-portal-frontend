import { GeneralInfoProps } from '@/types/inventory/types';
import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import dynamic from 'next/dynamic';
import TooltipText from '@/components/ui/textbox';
import formatDate from '@/utils/utils';
import Link from 'next/link';
import { DATE_FORMAT } from '@/utils/constants/constants';
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
    accountLinkid,
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
    {
      label: 'Vendor',
      value: (
        <TooltipText
          text={vendor ? vendor : '-'}
          maxLength={18}
          className="leading-6 text-[#575757] lg:text-[13px] xl:text-[14px]"
        />
      ),
    },
    {
      label: 'Account',
      value: (
        <Link href={`/vendors/${accountLinkid}`} className="leading-6 text-[#1175BE] lg:text-[13px] xl:text-[15px]">
          {account}
        </Link>
      ),
    },
    { label: 'Service Type', value: serviceType },
    { label: 'Service Description', value: serviceDescription?.name },
    {
      label: 'Employee',
      value: employee?.id ? (
        <Link href={`/employees/${employee?.id}`} className="leading-6 text-[#1175BE] lg:text-[13px] xl:text-[15px]">
          <TooltipText
            text={employee ? `${employee.firstName} ${employee.lastName} - ${employee.email}` : '-'}
            maxLength={20}
            className="leading-6 text-[#1175BE] lg:text-[13px] xl:text-[15px]"
          />
        </Link>
      ) : (
        ' - '
      ),
    },
    { label: 'Purpose / Function', value: purposeOfService },
    { label: 'Contract Start Date', value: contractStartDate ? formatDate(contractStartDate, DATE_FORMAT) : '-' },
    { label: 'Contract End Date', value: contractEndDate ? formatDate(contractEndDate, DATE_FORMAT) : '-' },
    { label: 'Spare', value: spare !== undefined && spare !== null ? (spare ? 'Yes' : 'No') : ' - ' },
    {
      label: 'Zero Usage Allowed',
      value: zeroUsageAllowed !== undefined && zeroUsageAllowed !== null ? (zeroUsageAllowed ? 'Yes' : 'No') : ' - ',
    },
    { label: 'Termination Date', value: terminationDate },
    {
      label: 'Scheduled Termination Date',
      value: scheduledTerminationDate ? formatDate(scheduledTerminationDate, DATE_FORMAT) : '-',
    },
    {
      label: 'Scheduled Suspension Date',
      value: scheduledSuspensionDate ? formatDate(scheduledSuspensionDate, DATE_FORMAT) : '-',
    },
    {
      label: 'Notes',
      value: (
        <TooltipText
          text={notes ? `${notes}` : '-'}
          maxLength={15}
          className="leading-6 text-[#1175BE] lg:text-[13px] xl:text-[15px]"
        />
      ),
    },
  ];

  return (
    <div>
      <div className="pb-6 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">{label}</div>
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="flex gap-[19px] pb-6 lg:gap-x-[25px] xl:gap-x-[45px] max-lg:block">
          <div className="flex w-[35%] justify-between lg:gap-x-[25px] xl:gap-x-[45px] max-lg:mt-5 max-lg:w-[100%]">
            <div className="w-[45%]">
              {staticData.slice(0, 8).map((item, index) => (
                <div
                  key={index}
                  className="font-[600] text-[#000] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7"
                >
                  {item.label}
                </div>
              ))}
            </div>
            <div className="w-[55%]">
              {staticData.slice(0, 8).map((item, index) => (
                <div key={index} className="text-[#575757] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                  {item.value ? item.value : ' - '}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-[36%] justify-between lg:gap-x-[25px] xl:gap-x-[45px] max-lg:mt-5 max-lg:w-[100%]">
            <div className="w-[60%]">
              {staticData.slice(8).map((item, index) => (
                <div
                  key={index}
                  className="font-[600] text-[#000] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7"
                >
                  {item.label}
                </div>
              ))}
            </div>
            <div className="w-[40%]">
              {staticData.slice(8).map((item, index) => (
                <div key={index} className="text-[#575757] lg:text-[13px] lg:leading-6 xl:text-[16px] xl:leading-7">
                  {item.value ? item.value : ' - '}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[29%] max-lg:mt-5 max-lg:w-[100%]">
            <div className="mapouter rounded-lg border border-neutral-300 p-1">
              <div className="gmap_canvas">
                <div className="gmap_canvas">
                  {site?.latitude && site?.longitude ? (
                    <MapBox
                      lat={site?.latitude}
                      long={site?.longitude}
                      address={site?.streetLine1 ? site?.streetLine1 : site?.streetLine2}
                      siteId={site?.id}
                      height="200px"
                    />
                  ) : (
                    <div className="flex h-[230px] items-center justify-center py-8 text-center align-bottom text-lg">
                      Google map can't find the location
                    </div>
                  )}
                </div>
              </div>
            </div>
            {(site?.streetLine1 || site?.streetLine2) && (
              <div className="pt-1 text-center lg:text-[14px] xl:text-[16px]">
                <span className="font-semibold text-zinc-600">Address:</span>
                <span className="font-normal text-zinc-600">
                  {' '}
                  {site?.streetLine1 ? site?.streetLine1 : site?.streetLine2 ? site?.streetLine2 : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
