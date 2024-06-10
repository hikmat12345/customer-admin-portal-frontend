import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import { EmployeeGeneralInfoProps } from '@/types/employee/employee.tds';
import Link from 'next/link';

export default function SiteGeneralInfo({
  label = 'General Information',
  isLoading = false,
  data: {
    veroxosId,
    firstName,
    email,
    status,
    site,
    manageId,
    clientEmployeeId,
    lastName,
    jobTitle,
    employeeLevel,
    costCenter,
    vipExecutive,
  },
}: EmployeeGeneralInfoProps) {
     
    return (
        <div>
            {label && <div className='text-custom-blue lg:text-[20px] xl:text-[22px] font-[700] pb-6'>{label}</div>}
            {isLoading ? <GeneralInfoSkeletons /> :
                <div className="flex max-lg:block gap-[19px] pb-6">
                    <div className="flex w-[42%]  max-lg:w-[100%] max-lg:mt-5  justify-between  ">
                        <div className='w-[34%]'>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Veroxos ID </div> 
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">First Name</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Email</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Status</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Site</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Manager ID</div>
                        </div>
                        <div className='w-[66%]'>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{veroxosId ? veroxosId : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{firstName ? firstName : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{email ? email : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{status !==null ? 
                                 <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs text-white font-medium cursor-pointer ${status === 1 ? 'bg-[#219653]' :  'bg-custom-deepRed'}`}>
                                 {status===1? "Live" : "Archived" }
                             </span>  : ' - '}
                            </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{site ? site?.streetLine1 : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>
                                {manageId ?
                                <Link href={`/site/${manageId}`}className='text-custom-blue hover:underline'>{manageId ? manageId : ' - '}
                                </Link>
                                : ' - '}
                            </div>
                           </div>
                    </div>
                    <div className="flex w-[55%] max-lg:w-[100%] max-lg:mt-5  justify-center gap-10 pr-20"> 
                        <div className=''>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Client Employee ID</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Last Name</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Job Title</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Employee Level</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Cost Center</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">VIP Executive</div>
                        </div>
                        <div >
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{clientEmployeeId ? clientEmployeeId : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{lastName ? lastName : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{jobTitle ? jobTitle : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{employeeLevel ? employeeLevel : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{costCenter ? costCenter : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{vipExecutive ? vipExecutive : ' - '} </div>
                        </div>
                    </div> 
                </div>}
        </div>
    );
}
