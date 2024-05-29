import GeneratlInfoSkeletons from "@/components/ui/summary-skeletons";
import { EmployeeGeneralInfoProps } from "@/types/employee/employee.tds";
import Link from "next/link";


export default function SiteGeneralInfo({
    label = 'General Information',
    isLoading = false,
    data: {
        veroxosId,
        firstName,
        email,
        status,
        site,
        manage_id, 
        client_employee_id,
        last_name,
        job_title,
        employee_level,
        cost_center,
        vip_executive, 
    }
}: EmployeeGeneralInfoProps) {
     
    return (
        <div>
            {label && <div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pb-6'>{label}</div>}
            {isLoading ? <GeneratlInfoSkeletons /> :
                <div className="flex max-lg:block gap-[19px] pb-6">
                    <div className="flex w-[42%]  max-lg:w-[100%] max-lg:mt-5  justify-between  ">
                        <div className='w-[34%]'>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Veroxos ID </div> 
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">First Name</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Email</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Status</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Site</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Manage ID</div>
                        </div>
                        <div className='w-[66%]'>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{veroxosId ? veroxosId : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{firstName ? firstName : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{email ? email : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{status !==null ? 
                                 <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs text-white font-medium cursor-pointer ${status === 1 ? 'bg-[#219653]' :  'bg-[#A40000]'}`}>
                                 {status===1? "Live" : "Archived" }
                             </span>  : ' - '}
                            </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{site ? site?.streetLine1 : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>
                                {manage_id ?
                                <Link href={`/site/${manage_id}`}className='text-[#1D46F3] hover:underline'>{manage_id ? manage_id : ' - '}
                                </Link>
                                : ' - '}
                            </div>
                           </div>
                    </div>
                    <div className="flex w-[45%] max-lg:w-[100%] max-lg:mt-5  justify-center gap-10 pr-20"> 
                        <div className=''>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Client Employee ID</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Last Name</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Job Title</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Employee Level</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Cost Center</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">VIP Executive</div>
                        </div>
                        <div >
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{client_employee_id ? client_employee_id : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{last_name ? last_name : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{job_title ? job_title : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{employee_level ? employee_level : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{cost_center ? cost_center : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{vip_executive ? vip_executive : ' - '} </div>
                        </div>
                    </div>
                    <div className='w-[10%] max-lg:w-[100%] max-lg:mt-5 '> 
                     </div>
                </div>}
        </div>
    );
}
  