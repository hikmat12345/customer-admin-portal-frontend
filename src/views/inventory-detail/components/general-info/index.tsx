import { TICKETS_STATUS_LIST } from "@/utils/constants/statusList.constants";
 import { GeneralInfoProps } from "@/types/inventory/types";
import GeneralInfoSkeletons from "@/components/ui/summary-skeletons";
import dynamic from 'next/dynamic';
const GoogleMap = dynamic(() => import('../../../../components/ui/google-map').then(mod => mod.GoogleMap), {
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
    }
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
            <div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pb-6'>{label}</div>
            {isLoading ? <GeneralInfoSkeletons /> :
                <div className="flex max-lg:block gap-[19px] pb-6">
                    <div className="flex w-[42%]  max-lg:w-[100%] max-lg:mt-5  justify-between  ">
                        <div className='w-[34%]'>
                            {staticData.slice(0, 8).map((item, index) => (
                                <div key={index} className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] xl:leading-7 lg:leading-6 ">{item.label}</div>
                            ))}
                        </div>
                        <div className='w-[66%]'>
                            {staticData.slice(0,8).map((item, index) => (
                                <div key={index} className='text-[#575757] lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 '>{item.value ? item.value : ' - '}</div>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-[30%] max-lg:w-[100%] max-lg:mt-5  justify-between">
                        <div className=''>
                            {staticData.slice(8).map((item, index) => (
                                <div key={index} className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] xl:leading-7 lg:leading-6 ">{item.label}</div>
                            ))}
                        </div>
                        <div>
                            {staticData.slice(8).map((item, index) => (
                                <div key={index} className='text-[#575757] lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 '>{item.value ? item.value : ' - '}</div>
                            ))}
                        </div>
                    </div>
                    <div className='w-[30%] max-lg:w-[100%] max-lg:mt-5 '>
                        <div className="mapouter  rounded-lg border border-neutral-300 p-1">
                            <div className="gmap_canvas">
                                <div className="gmap_canvas">
                                    {site?.latitude && site?.longitude ?
                                        <GoogleMap lat={site?.latitude} long={site?.longitude} address={site?.streetLine1 ? site?.streetLine1 : site?.streetLine2} />
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
 