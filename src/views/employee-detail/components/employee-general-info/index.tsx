import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import { EmployeeGeneralInfoProps } from '@/types/employee/employee.tds';
import Link from 'next/link';

export default function EmployeeGeneralInfo({
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
  const keys = [
    { label: 'Veroxos ID', value: veroxosId },
    { label: 'First Name', value: firstName },
    { label: 'Email', value: email },
    {
      label: 'Status',
      value:
        status !== null ? (
          <span
            className={`inline-flex cursor-pointer items-center gap-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white ${status ? (status === 1 ? 'bg-[#219653]' : 'bg-[#A40000]') : '-'}`}
          >
            {status === 1 ? 'Live' : 'Archived'}
          </span>
        ) : null,
    },
    { label: 'Site', value: site?.streetLine1 },
    {
      label: 'Manager ID',
      value: manageId ? (
        <Link target="_blank" href={`/employees/${manageId}`} className="text-custom-blue hover:underline">
          {manageId}
        </Link>
      ) : null,
    },
    { label: 'Client Employee ID', value: clientEmployeeId },
    { label: 'Last Name', value: lastName },
    { label: 'Job Title', value: jobTitle },
    { label: 'Employee Level', value: employeeLevel },
    { label: 'Cost Center', value: costCenter },
    {
      label: 'VIP Executive',
      value: vipExecutive !== undefined && vipExecutive !== null ? (vipExecutive ? 'Yes' : 'No') : ' - ',
    },
  ];

  return (
    <div>
      {label && <div className="pb-6 text-[1.375rem] font-[700] text-custom-blue">{label}</div>}
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="flex gap-x-[4.375rem] text-nowrap pb-6 max-lg:block">
          <div className="flex justify-between sm:w-[50%] lg:w-[35%] lg:gap-x-[2.375rem] 2lg:gap-x-[4.375rem] max-lg:w-[100%]">
            <div className="sm:w-[50%] lg:w-[45%] 2lg:w-[35%] xl:w-[25%]">
              {keys.slice(0, 6).map((item, index) => (
                <div key={index} className="text-[0.875rem] font-[600] text-[#000] lg:leading-7 xl:leading-7">
                  {item.label}
                </div>
              ))}
            </div>
            <div className="sm:w-[50%] lg:w-[55%] 2lg:w-[65%] xl:w-[75%]">
              {keys.slice(0, 6).map((item, index) => (
                <div key={index} className="text-[0.875rem] text-[#575757] lg:leading-7 xl:leading-7">
                  {item.value ? item.value : ' - '}
                </div>
              ))}
            </div>
          </div>
          <div className="flex sm:w-[50%] sm:justify-between lg:w-[45%] lg:justify-center lg:gap-x-[2.375rem] 2lg:gap-x-[4.375rem] max-lg:mt-5 max-lg:w-[100%]">
            <div className="sm:w-[50%] lg:w-[52%] 2lg:w-[42%] xl:w-[32%]">
              {keys.slice(6).map((item, index) => (
                <div key={index} className="text-[0.875rem] font-[600] text-[#000] lg:leading-7 xl:leading-7">
                  {item.label}
                </div>
              ))}
            </div>
            <div className="sm:w-[50%] lg:w-[42%] 2lg:w-[58%] xl:w-[68%]">
              {keys.slice(6).map((item, index) => (
                <div key={index} className="text-[0.875rem] text-[#575757] lg:leading-7 xl:leading-7">
                  {item.value ? item.value : ' - '}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
