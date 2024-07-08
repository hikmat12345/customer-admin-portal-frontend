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
    {
      label: 'Service Number',
      value: (
        <TooltipText
          text={serviceNumber ? `${serviceNumber}` : '-'}
          maxLength={15}
          className="leading-6 text-[#1175BE] text-[0.0.938rem]"
        />
      ),
    },
    {
      label: 'Vendor',
      value: <TooltipText text={vendor ? vendor : '-'} maxLength={18} />,
    },
    {
      label: 'Account',
      value: (
        <Link href={`/vendors/${accountLinkid}`} className="text-[0.938rem] leading-6 text-[#1175BE]">
          {account}
        </Link>
      ),
    },
    { label: 'Service Type', value: serviceType },
    { label: 'Service Description', value: serviceDescription?.name },
    {
      label: 'Employee',
      value: employee?.id ? (
        <Link href={`/employees/${employee?.id}`} className="text-[0.938rem] leading-6 text-[#1175BE]">
          <TooltipText
            text={employee ? `${employee.firstName} ${employee.lastName} - ${employee.email}` : '-'}
            maxLength={20}
            className="text-[0.938rem] leading-6 text-[#1175BE]"
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
    { label: 'Termination Date', value: formatDate(terminationDate, DATE_FORMAT) },
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
          className="text-[0.938rem] leading-6 text-[#1175BE]"
        />
      ),
    },
  ];

  return (
    <div>
      <div className="pb-6 text-[1.375rem] font-[700] text-custom-blue">{label}</div>
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="gap-[1.188rem] text-nowrap pb-6 sm:block lg:gap-x-[1rem] xl:flex 2xl:gap-x-[2.813rem]">
          <div className="flex sm:block sm:w-[100%] lg:flex xl:w-[71%]">
            <div className="flex justify-between sm:w-[100%] lg:w-[50%] lg:gap-x-[1rem] 2xl:gap-x-[2.813rem]">
              <div className="sm:w-[50%] lg:w-[45%]">
                {staticData.slice(0, 8).map((item, index) => (
                  <div key={index} className="text-[1rem] font-[600] text-[#000] lg:leading-6 xl:leading-7">
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="sm:w-[50%] lg:w-[55%]">
                {staticData.slice(0, 8).map((item, index) => (
                  <div key={index} className="text-[1rem] text-[#575757] lg:leading-6 xl:leading-7">
                    {item.value ? item.value : ' - '}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between sm:mt-5 sm:w-[100%] lg:mt-0 lg:w-[50%] lg:gap-x-[1rem] 2xl:gap-x-[2.813rem]">
              <div className="sm:w-[50%] lg:w-[60%]">
                {staticData.slice(8).map((item, index) => (
                  <div key={index} className="text-[1rem] font-[600] text-[#000] lg:leading-6 xl:leading-7">
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="sm:w-[50%] lg:w-[40%]">
                {staticData.slice(8).map((item, index) => (
                  <div key={index} className="text-[1rem] text-[#575757] lg:leading-6 xl:leading-7">
                    {item.value ? item.value : ' - '}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {(site?.latitude && site?.longitude) && <div className="sm:mt-5 sm:w-[100%] xl:mt-0 xl:w-[29%] max-lg:w-[100%]">
            <div className="mapouter rounded-lg border border-neutral-300 p-1">
              <div className="gmap_canvas">
                <div className="gmap_canvas"> 
                    <MapBox
                      lat={site?.latitude}
                      long={site?.longitude}
                      address={site?.streetLine1 ? site?.streetLine1 : site?.streetLine2}
                      siteId={site?.id}
                      height="12.5rem"
                    /> 
                </div>
              </div>
            </div>
            {(site?.streetLine1 || site?.streetLine2) && (
              <div className="pt-1 text-center text-[1rem]">
                <span className="font-semibold text-zinc-600">Address:</span>
                <span className="font-normal text-zinc-600">
                  {' '}
                  {site?.streetLine1 ? site?.streetLine1 : site?.streetLine2 ? site?.streetLine2 : ''}
                </span>
              </div>
            )}
          </div>}
        </div>
      )}
    </div>
  );
}
