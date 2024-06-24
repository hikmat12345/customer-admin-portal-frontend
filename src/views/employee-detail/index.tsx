'use client';
import React, { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import CreateQueryString from '@/utils/createQueryString';
import {
  useGetEmployeeCostTrend,
  useGetEmployeeDetail,
  useGetEmployeeServiceTypes,
  useGetEmployeeServices,
  useGetEmployeeTickets,
} from '@/hooks/useGetEmployees';
import LineChart from '@/components/ui/line-chart';
import TableData from '@/components/ui/summary-tables/table';
import { ScrollTabs } from '@/components/ui/scroll-tabs';
import Skeleton from '@/components/ui/skeleton/skeleton';
import ServiceTypesGrid from '@/components/ui/service-badge';
import formatDate, { moneyFormatter } from '@/utils/utils';
import { format, parseISO } from 'date-fns';
import EmployeeGeneralInfo from './components/employee-general-info';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '@/utils/constants/constants';

type EmployeeDetailPageProps = {
  employeeId: number;
};
function EmployeeDetailPage({ employeeId }: EmployeeDetailPageProps) {
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();
  const pathname = usePathname();
  const isTerminated = searchParams.get('showTerminated');

  const [showTerminated, setShowTerminated] = React.useState(true);
  const createQueryString = CreateQueryString();

  const employee_id = employeeId;
  const page = searchParams?.get('page') || '1';

  const limit = 7;
  const offset = +page - 1;

  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys());

  // get site detail
  const { data: employeeServiceDetailData, isLoading: isemployeeServiceDetailLoader } = useGetEmployeeDetail(
    Number(employee_id),
  );
  const {
    id: veroxosId,
    live,
    search,
    jobTitle,
    employeeLevelId: employee_level,
    managerEmployeeId: manage_id,
    externalId: client_employee_id,
    vip: vip_executive,
    costCentreForNewService: cost_center,
    site,
  } = employeeServiceDetailData || {};
  // cost and trend data
  const costTrendLimit = 12;
  const { data: costTrendData, isLoading: isCostTrendLoading } = useGetEmployeeCostTrend(
    Number(employee_id),
    costTrendLimit,
  );
  const { data: siteTicketsData, isLoading: isSiteTicketsLoader } = useGetEmployeeTickets(
    Number(employee_id),
    offset,
    limit,
  );
  const {
    data: employeeServices,
    isLoading: isEmployeeServicesLoading,
    refetch: refetchServicesData,
  } = useGetEmployeeServices(Number(employee_id), offset, limit, showTerminated);
  const { data: employeeServiceTypes, isLoading: isEmployeeServiceType } = useGetEmployeeServiceTypes(
    Number(employee_id),
  );

  const handlePageChange = async (page: number) => {
    const params = new URLSearchParams();
    if (searchParams) {
      searchParams.forEach((value, key) => {
        params.set(key, value);
      });
    }
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
    await refetchServicesData();
  };
  const showTerminatedHandler = async () => {
    setShowTerminated(!showTerminated);
    await refetchServicesData();
  };

  useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
    if (showTerminated) {
      router.push(`${pathname}?${createQueryString('showTerminated', showTerminated.toString())}`);
    }
  }, [keys.length]);

  const refinedEmployeeData: {
    number: string;
    service: string;
    serviceType: number;
    serviceDescription: string | null;
    serviceFunctionPurpose: string;
    serviceStatus: number;
    cost: number;
    invoiceDate: string;
  }[] = employeeServices?.data?.map((item: any) => ({
    number: item?.service?.number,
    account: item?.service?.companyNetwork?.network?.name + '-' + item?.service?.account,
    ['cost centre']: item?.service?.cost?.costCentre,
    service_type: item?.service?.serviceType,
    'service status': item?.service.serviceStatus,
    cost:
      item?.service?.cost?.rentalRaw ||
      item.service?.cost?.usageRaw ||
      item.service?.cost?.otherRaw ||
      item?.service?.cost?.taxRaw
        ? `${moneyFormatter(parseFloat(item?.service?.cost?.rentalRaw || 0) + parseFloat(item.service?.cost?.usageRaw || 0) + parseFloat(item.service?.cost?.otherRaw || 0) + parseFloat(item?.service?.cost?.taxRaw || 0), 'usd')} (${formatDate(item?.service?.cost?.invoice?.invoiceDate, DATE_FORMAT)})`
        : '-',
  }));
  const refinedTickets = siteTicketsData?.data?.tickets?.map((item: any) => {
    return {
      'Veroxos REF': item?.reference,
      'Request Type': item?.description,
      status: item?.ticketStatusId,
      created: format(parseISO(item.created), DATE_TIME_FORMAT),
    };
  });
  const listOfTabs = [];

  if (refinedEmployeeData?.length > 0) {
    listOfTabs.push('services');
  }
  if (costTrendData?.length > 0) {
    listOfTabs.push('cost-trend');
  }
  if (employeeServiceTypes?.data?.length > 0) {
    listOfTabs.push('service-type');
  }
  if (siteTicketsData?.data?.tickets?.length > 0) {
    listOfTabs.push('tickets');
  }
  return (
    <div className="w-full rounded-lg border border-custom-lightGray bg-custom-white px-7 py-5">
      <ScrollTabs tabs={['general-information', ...listOfTabs]}>
        {/* General Information  */}
        <div id="general-information">
          <EmployeeGeneralInfo
            label="General Information"
            isLoading={isemployeeServiceDetailLoader}
            data={{
              veroxosId: veroxosId,
              firstName: search?.split(',')[0],
              email: search?.split(',')[2],
              status: live,
              site: site,
              manageId: manage_id,
              clientEmployeeId: client_employee_id,
              lastName: search?.split(',')[1],
              jobTitle: jobTitle,
              employeeLevel: employee_level,
              costCenter: cost_center,
              vipExecutive: vip_executive,
            }}
          />
          <Separator className="separator-bg-1 h-[1.5px]" />
        </div>
        {/* Service  */}

        <>
          <div id="services">
            <TableData
              label="Services"
              data={refinedEmployeeData}
              loading={isEmployeeServicesLoading}
              tableClass="whitespace-nowrap"
            />
            <button
              onClick={showTerminatedHandler}
              className="my-5 ml-auto block h-[40px] w-[220px] gap-2.5 rounded-lg border border-orange-500 bg-orange-500 px-[18px] pb-4 pt-2"
            >
              <span className="text-[14px] font-semibold text-white">
                {showTerminated ? 'Show Terminated Service' : 'Show Live Services'}{' '}
              </span>
            </button>
          </div>
          <Separator className="separator-bg-1 mt-4 h-[1.2px]" />
        </>

        {/* Cost Trend  */}
        {costTrendData?.length > 0 && (
          <div id="cost-trend">
            <LineChart label="Cost Trend" data={costTrendData} isLoading={isCostTrendLoading} />
            <Separator className="separator-bg-1 mt-4 h-[1.2px]" />
          </div>
        )}

        {/* Service Type */}
        {employeeServiceTypes?.data?.length > 0 && (
          <div id="service-type">
            <div className="flex gap-4 pt-8 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">
              Service Type{' '}
            </div>
            <div className="mt-4 gap-4">
              {isEmployeeServiceType ? (
                <Skeleton variant="paragraph" rows={3} />
              ) : Array.isArray(employeeServiceTypes?.data) && employeeServiceTypes?.data.length > 0 ? (
                <ServiceTypesGrid
                  services={employeeServiceTypes?.data.sort(
                    (
                      a: {
                        subTypes: { name: string; service_type: string }[];
                      },
                      b: {
                        subTypes: { name: string; service_type: string }[];
                      },
                    ) => b.subTypes?.length - a.subTypes?.length,
                  )}
                />
              ) : (
                <div className="w-full py-8 text-center text-lg">Data Not Found</div>
              )}
            </div>
            <Separator className="separator-bg-1 mt-4 h-[1.2px]" />
          </div>
        )}
        {/* Tickets  */}
        {refinedTickets?.length > 0 && (
          <div id="tickets">
            <TableData label="Tickets" loading={isSiteTicketsLoader} data={refinedTickets} />
            <Separator className="separator-bg-1 mt-8 h-[1.px]" />
          </div>
        )}
      </ScrollTabs>
    </div>
  );
}

export default EmployeeDetailPage;
