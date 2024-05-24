import { TICKETS_STATUS_LIST } from "@/utils/constants/statusList.constants";
import Link from "next/link";
 import { GoogleMap } from "@/components/ui/google-map";
import { GeneralInfoProps } from "@/types/inventory/types";
import GeneratlInfoSkeletons from "@/components/ui/summary-skeletons";

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
    
    return (
        <div>
            <div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pb-6'>{label}</div>
            {isLoading ? <GeneratlInfoSkeletons /> :
                <div className="flex max-lg:block gap-[19px] pb-6">
                    <div className="flex w-[42%]  max-lg:w-[100%] max-lg:mt-5  justify-between  ">
                        <div className='w-[34%]'>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Veroxos ID </div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Service Number</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Vendor</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Account</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Service Type</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Service Description</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Employee</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Purpose / Function</div>
                        </div>
                        <div className='w-[66%]'>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{veroxosId ? veroxosId : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{ serviceNumber ? serviceNumber : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{ vendor ? vendor : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'> { account ?  account : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{ serviceType ? TICKETS_STATUS_LIST[serviceType] : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{ serviceDescription?.name ? serviceDescription?.name : ' - '} </div>   
                            <Link className="text-sky-600 lg:text-[13px] xl:text-[16px] leading-7 border-b-2 border-sky-400" href={`mailto:${employee?.email}`} target='_blank'> {employee ? employee?.firstName +" "+ employee?.lastName +" "+  employee?.email : '  '} </Link>
                             <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'> {purposeOfService ? purposeOfService : ' - '}</div>
                        </div>
                    </div>
                    <div className="flex w-[30%] max-lg:w-[100%] max-lg:mt-5  justify-between"> 
                        <div className=''>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Contract Start Date </div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Contract End Date</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Spare</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Zero Usage Allowed</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Termination Date</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Scheduled Termination Date</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Notes</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Scheduled Suspension Date</div>
                        </div>
                        <div >
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{contractStartDate ? contractStartDate : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{contractEndDate ? contractEndDate : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{spare !==null ? spare : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{ zeroUsageAllowed ? zeroUsageAllowed : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{terminationDate ? terminationDate : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{scheduledTerminationDate ? scheduledTerminationDate : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{   notes ? notes : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{scheduledSuspensionDate ? scheduledSuspensionDate : ' - '} </div>
                        </div>
                    </div>
                    <div className='w-[30%] max-lg:w-[100%] max-lg:mt-5 '>
                        <div className="mapouter  rounded-lg border border-neutral-300 p-1">
                            <div className="gmap_canvas">
                            <div className="gmap_canvas">
                                {site?.latitude && site?.longitude ?
                                <GoogleMap lat={site?.latitude} long={site?.longitude} address={site?.streetLine1? site?.streetLine1 : site?.streetLine2 } />
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
 