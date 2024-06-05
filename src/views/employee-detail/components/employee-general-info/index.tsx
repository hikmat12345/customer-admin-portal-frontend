 import GeneralInfoSkeletons from "@/components/ui/summary-skeletons";
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
        manageId, 
        clientEmployeeId,
        lastName,
        jobTitle,
        employeeLevel,
        costCenter,
        vipExecutive, 
    }
}: EmployeeGeneralInfoProps) {
     
    const keys = [
        { label: 'Veroxos ID', value: veroxosId },
        { label: 'First Name', value: firstName },
        { label: 'Email', value: email },
        { label: 'Status', value: status !== null ? <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs text-white font-medium cursor-pointer ${status ? (status === 1 ? 'bg-[#219653]' : 'bg-[#A40000]') : "-"}`}>
            {status === 1 ? "Live" : "Archived"}
        </span> : null },
        { label: 'Site', value: site?.streetLine1 },
        { label: 'Manage ID', value: manageId ? <Link href={`/site/${manageId}`} className='text-[#1D46F3] hover:underline'>{manageId}</Link> : null },
        { label: 'Client Employee ID', value: clientEmployeeId },
        { label: 'Last Name', value: lastName },
        { label: 'Job Title', value: jobTitle },
        { label: 'Employee Level', value: employeeLevel },
        { label: 'Cost Center', value: costCenter },
        { label: 'VIP Executive', value: vipExecutive },
    ];

    return (
        <div>
            {label && <div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pb-6'>{label}</div>}
            {isLoading ? <GeneralInfoSkeletons /> :
                <div className="flex max-lg:block gap-[19px] pb-6">
                    <div className="flex w-[42%]  max-lg:w-[100%] max-lg:mt-5  justify-between  ">
                        <div className='w-[34%]'>
                            {keys.slice(0, 6).map((item, index) => (
                                <div key={index} className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600]  xl:leading-8 lg:leading-7">{item.label}</div>
                            ))}
                        </div>
                        <div className='w-[66%]'>
                            {keys.slice(0, 6).map((item, index) => (
                                <div key={index} className='text-[#575757] lg:text-[13px] xl:text-[14px] xl:leading-8 lg:leading-7'>{item.value ? item.value : ' - '}</div>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-[43%] max-lg:w-[100%] max-lg:mt-5  justify-center gap-10 pr-20">
                        <div className=''>
                            {keys.slice(6).map((item, index) => (
                                <div key={index} className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600]  xl:leading-8 lg:leading-7">{item.label}</div>
                            ))}
                        </div>
                        <div>
                            {keys.slice(6).map((item, index) => (
                                <div key={index} className='text-[#575757] lg:text-[13px] xl:text-[14px] xl:leading-8 lg:leading-7'>{item.value ? item.value : ' - '}</div>
                            ))}
                        </div>
                    </div>
                </div>}
        </div>
    );
}
  