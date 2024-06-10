import { TICKETS_STATUS_LIST } from "@/utils/constants/statusList.constants";
import { GeneralInfoProps } from "@/types/inventory/types";
import GeneralInfoSkeletons from "@/components/ui/summary-skeletons";
import dynamic from 'next/dynamic';
import TooltipText from "@/components/ui/textbox";
import formatDate from "@/utils/utils";
import Link from "next/link";
const MapBox = dynamic(() => import('../../../../components/ui/map-box').then(mod => mod.MapBox), {
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
    }
}: GeneralInfoProps) {
 console.log('GeneralInfoProps', spare)
    const staticData = [
        { label: 'Veroxos ID', value: veroxosId },
        { label: 'Service Number', value: serviceNumber },
        {
            label: 'Vendor', value: <TooltipText
                text={vendor ? vendor : "-"}
                maxLength={30}
                className="text-[#575757] lg:text-[13px] xl:text-[14px] leading-6"
            />
        },
        { label: 'Account', value:   <Link href={`/vendors/${accountLinkid}`} className="text-[#1175BE] lg:text-[13px] xl:text-[15px] leading-6">{account}</Link> },
        { label: 'Service Type', value: serviceType ? TICKETS_STATUS_LIST[serviceType] : null },
        { label: 'Service Description', value: serviceDescription?.name },
        {
            label: 'Employee', value:
            <Link href={`mailto:${employee?.email}`} className="text-[#1175BE] lg:text-[13px] xl:text-[15px] leading-6">
                <TooltipText
                    text={employee ? `${employee.firstName} ${employee.lastName} ${employee.email}` : "-"}
                    maxLength={24}
                    className="text-[#1175BE] lg:text-[13px] xl:text-[15px] leading-6"
                />
            </Link>
        },
        { label: 'Purpose / Function', value: purposeOfService },
        { label: 'Contract Start Date', value:contractStartDate?  formatDate(contractStartDate, 'MMM dd, yyyy') : "-"},
        { label: 'Contract End Date', value: contractEndDate ?formatDate(contractEndDate, 'MMM dd, yyyy') : "-"},
        { label: 'Spare', value: (spare !==undefined && spare !==null) ? (spare ?'Yes' : 'No'): " - "},
        { label: 'Zero Usage Allowed', value: (zeroUsageAllowed !==undefined && zeroUsageAllowed !==null) ? (zeroUsageAllowed ?'Yes' : 'No'): " - " },
        { label: 'Termination Date', value: terminationDate },
        { label: 'Scheduled Termination Date', value: scheduledTerminationDate ? formatDate(scheduledTerminationDate, 'MMM dd, yyyy') : "-"},
        { label: 'Scheduled Suspension Date', value: scheduledSuspensionDate? formatDate(scheduledSuspensionDate, 'MMM dd, yyyy'): "-"},
        { label: 'Notes', value: notes },
    ];

    return (
        <div>
            <div className='text-custom-blue lg:text-[20px] xl:text-[22px] font-[700] pb-6'>{label}</div>
            {isLoading ? <GeneralInfoSkeletons /> :
                <div className="flex max-lg:block gap-[19px] pb-6 lg:gap-x-[25px] xl:gap-x-[50px]">
                    <div className="flex w-[33%]  max-lg:w-[100%] max-lg:mt-5 lg:gap-x-[25px] xl:gap-x-[50px] justify-between  ">
                        <div className='w-[45%]'>
                            {staticData.slice(0, 8).map((item, index) => (
                                <div key={index} className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] xl:leading-7 lg:leading-6 ">{item.label}</div>
                            ))}
                        </div>
                        <div className='w-[55%]'>
                            {staticData.slice(0, 8).map((item, index) => (
                                <div key={index} className='text-[#575757] lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 '>{item.value ? item.value : ' - '}</div>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-[33%] max-lg:w-[100%] max-lg:mt-5  justify-between lg:gap-x-[25px] xl:gap-x-[50px]">
                        <div className='w-[60%]'>
                            {staticData.slice(8).map((item, index) => (
                                <div key={index} className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] xl:leading-7 lg:leading-6 ">{item.label}</div>
                            ))}
                        </div>
                        <div className="w-[40%]">
                            {staticData.slice(8).map((item, index) => (
                                <div key={index} className='text-[#575757] lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 '>{item.value ? item.value : ' - '}</div>
                            ))}
                        </div>
                    </div>
                    <div className='w-[33%] max-lg:w-[100%] max-lg:mt-5 '>
                        <div className="mapouter  rounded-lg border border-neutral-300 p-1">
                            <div className="gmap_canvas">
                                <div className="gmap_canvas">
                                    {site?.latitude && site?.longitude ?
                                        <MapBox lat={site?.latitude} long={site?.longitude} address={site?.streetLine1 ? site?.streetLine1 : site?.streetLine2} siteId={site?.id} />
                                        : <div className='text-center text-lg py-8 h-[230px] flex align-bottom justify-center items-center'>Google map can't find the location</div>}
                                </div>
                            </div>
                        </div>
                        <div className="lg:text-[14px] xl:text-[16px] text-center pt-1 "><span className="text-zinc-600  font-semibold ">Address:</span><span className="text-zinc-600  font-normal"> {site?.streetLine1 ? site?.streetLine1 : site?.streetLine2 ? site?.streetLine2 : ''}</span></div>
                    </div>
                </div>}
        </div>
    );
}