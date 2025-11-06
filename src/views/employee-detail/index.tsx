'use client';
import React, { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
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
import formatDate, { currencyFormatter } from '@/utils/utils';
import { format, parseISO } from 'date-fns';
import EmployeeGeneralInfo from './components/employee-general-info';
import { DATE_TIME_FORMAT, MONTH_YEAR_FORMAT } from '@/utils/constants/constants';
import Error from '@/components/ui/error';

type EmployeeDetailPageProps = {
  employeeId: number;
};
function EmployeeDetailPage({ employeeId }: EmployeeDetailPageProps) {
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const [showTerminated, setShowTerminated] = React.useState(false);
  const [showServiceButton, setShowServiceButton] = React.useState<boolean>(false);
  const employee_id = employeeId;
  const page = searchParams?.get('page') || '1';

  const limit = 7;
  const offset = +page - 1;

  // get site detail
  const { data: employeeServiceDetailData, isLoading: isemployeeServiceDetailLoader } = useGetEmployeeDetail(
    Number(employee_id),
  );
  const countryCurrencyCode = employeeServiceDetailData?.currency?.companyNetwork?.network?.country?.currencyCode;
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
  } = employeeServiceDetailData?.employeeDetail || {};
  const manager = employeeServiceDetailData?.manager || {};
  // cost and trend data
  const costTrendLimit = 12;
  const {
    data: costTrendData,
    isLoading: isCostTrendLoading,
    isError: costTrendError,
  } = useGetEmployeeCostTrend(Number(employee_id), costTrendLimit);
  const {
    data: siteTicketsData,
    isLoading: isSiteTicketsLoader,
    isError: siteTicketsError,
  } = useGetEmployeeTickets(Number(employee_id), offset, limit);
  const {
    data: employeeServices,
    isLoading: isEmployeeServicesLoading,
    isError: employeeServicesError,
  } = useGetEmployeeServices(Number(employee_id), offset, limit, true);

  const {
    data: employeeTerminatedServices,
    isLoading: isTerminatedServicesLoading,
    isError: employeeTerminatedServicesError,
  } = useGetEmployeeServices(Number(employee_id), offset, limit, false);

  const {
    data: employeeServiceTypes,
    isLoading: isEmployeeServiceType,
    isError: employeeServiceTypeError,
  } = useGetEmployeeServiceTypes(Number(employee_id));
  const showTerminatedHandler = async () => {
    setShowTerminated(!showTerminated);
  };

  const refinedEmployeeData: {
    number: string;
    service: string;
    serviceType: number;
    serviceDescription: string | null;
    serviceFunctionPurpose: string;
    serviceStatus: number;
    cost: number;
    invoiceDate: string;
  }[] = (showTerminated ? employeeTerminatedServices?.data : employeeServices?.data)?.map((item: any) => ({
    number: item?.service?.number,
    account: item?.service?.companyNetwork?.network?.name + '-' + item?.service?.account,
    cost_center: item?.service?.cost?.costCentre,
    service_type: item?.service?.serviceType,
    serviceStatus:
      item?.service?.serviceStatus === 1 && item?.service?.suspended === 1
        ? 2
        : item?.service?.serviceStatus === 1 && item?.service?.suspended === 0
          ? 1
          : item?.service?.serviceStatus === 0 && item?.service?.suspended === 0
            ? 0
            : '-',
    cost:
      item?.service?.cost?.rentalRaw ||
      item.service?.cost?.usageRaw ||
      item.service?.cost?.otherRaw ||
      item?.service?.cost?.taxRaw
        ? `${currencyFormatter(parseFloat(item?.service?.cost?.rentalRaw || 0) + parseFloat(item.service?.cost?.usageRaw || 0) + parseFloat(item.service?.cost?.otherRaw || 0) + parseFloat(item?.service?.cost?.taxRaw || 0), countryCurrencyCode)} (${formatDate(item?.service?.cost?.invoice?.invoiceDate, MONTH_YEAR_FORMAT)})`
        : '-',
  }));
  const refinedTickets = siteTicketsData?.data?.tickets?.map((item: any) => {
    return {
      'Veroxos REF': item?.reference,
      'Request Type': item?.description,
      status: item?.status,
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

  if (
    employeeServiceTypeError ||
    employeeTerminatedServicesError ||
    employeeServicesError ||
    siteTicketsError ||
    costTrendError
  ) {
    return <Error />;
  }
  /* eslint-disable react-hooks/rules-of-hooks */
  useEffect(() => {
    if (!isEmployeeServicesLoading && !isTerminatedServicesLoading) {
      setShowServiceButton(
        employeeServices?.data?.length > 0 || employeeTerminatedServices?.data?.length > 0 ? true : false,
      );
    }
  }, [isEmployeeServicesLoading, isTerminatedServicesLoading]);
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
              manager: manager,
            }}
          />
          <Separator className="separator-bg-1 h-[1.2px]" />
        </div>
        {/* Service  */}

        <>
          <div id="services">
            {refinedEmployeeData?.length > 0 && (
              <TableData
                label="Services"
                data={refinedEmployeeData}
                loading={isEmployeeServicesLoading}
                tableClass="whitespace-nowrap"
              />
            )}
            {!isEmployeeServicesLoading && !isTerminatedServicesLoading && showServiceButton && (
              <>
                {employeeTerminatedServices?.data?.length > 0 && (
                  <>
                    <button
                      onClick={showTerminatedHandler}
                      className="my-5 ml-auto block h-[2.5rem] w-[13.75rem] gap-2.5 rounded-lg border border-orange-500 bg-orange-500 px-[1.125rem]"
                    >
                      <span className="text-[0.875rem] font-semibold text-white">
                        {showTerminated ? 'Show Live Services' : 'Show Terminated Services'}
                      </span>
                    </button>
                    <Separator className="separator-bg-1 mt-4 h-[1.2px]" />
                  </>
                )}
              </>
            )}
          </div>
        </>

        {/* Cost Trend  */}
        {costTrendData?.length > 0 && (
          <div id="cost-trend">
            <LineChart
              className="cost-trend"
              label="Cost Trend"
              data={costTrendData}
              isLoading={isCostTrendLoading}
              currencyCode={countryCurrencyCode}
            />
            <Separator className="separator-bg-1 mt-4 h-[1.2px]" />
          </div>
        )}

        {/* Service Type */}
        {employeeServiceTypes?.data?.length > 0 && (
          <div id="service-type">
            <div className="flex gap-4 pt-8 text-[1.375rem] font-[700] text-custom-blue">Service Type </div>
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
                <div className="w-full py-8 text-center text-lg">No data found</div>
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
