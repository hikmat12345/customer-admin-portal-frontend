import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import { EmployeeGeneralInfoProps } from '@/types/employee/employee';
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
      {label && <div className="pb-6 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">{label}</div>}
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="flex gap-[19px] pb-6 max-lg:block">
          <div className="flex w-[42%] justify-between max-lg:mt-5 max-lg:w-[100%]">
            <div className="w-[34%]">
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Veroxos ID </div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">First Name</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Email</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Status</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Site</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Manager ID</div>
            </div>
            <div className="w-[66%]">
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {veroxosId ? veroxosId : ' - '}{' '}
              </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {firstName ? firstName : ' - '}{' '}
              </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">{email ? email : ' - '} </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {status !== null ? (
                  <span
                    className={`inline-flex cursor-pointer items-center gap-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white ${status === 1 ? 'bg-[#219653]' : 'bg-custom-deepRed'}`}
                  >
                    {status === 1 ? 'Live' : 'Archived'}
                  </span>
                ) : (
                  ' - '
                )}
              </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {site ? site?.streetLine1 : ' - '}{' '}
              </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {manageId ? (
                  <Link href={`/site/${manageId}`} className="text-custom-blue hover:underline">
                    {manageId ? manageId : ' - '}
                  </Link>
                ) : (
                  ' - '
                )}
              </div>
            </div>
          </div>
          <div className="flex w-[55%] justify-center gap-10 pr-20 max-lg:mt-5 max-lg:w-[100%]">
            <div className="">
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Client Employee ID</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Last Name</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Job Title</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Employee Level</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Cost Center</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">VIP Executive</div>
            </div>
            <div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {clientEmployeeId ? clientEmployeeId : ' - '}{' '}
              </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {lastName ? lastName : ' - '}{' '}
              </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {jobTitle ? jobTitle : ' - '}{' '}
              </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {employeeLevel ? employeeLevel : ' - '}{' '}
              </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {costCenter ? costCenter : ' - '}{' '}
              </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {vipExecutive ? vipExecutive : ' - '}{' '}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
