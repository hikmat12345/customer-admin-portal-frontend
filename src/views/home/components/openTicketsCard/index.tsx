import React from 'react';
import { useGetOpenTickets } from '@/hooks/useTickets';
import PieChart from '@/components/ui/pieChart';
import { ApexOptions } from 'apexcharts';
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import { TICKETS_STATUS_LIST } from '../../../../utils/constants/statusList.constants';

function OpenTicketsCard({ title }: { title: string }) {
  const { data: openTicketsData, isLoading } = useGetOpenTickets();
  const openTicket = openTicketsData?.openTickets;
  const closeTicketsIn24Hours = openTicketsData?.closedTicketsLast24Hours;

  const closeTicketHighlight = closeTicketsIn24Hours?.count === 0 ? '#E41323' : '#219653';

  const statusCounts = openTicketsData?.statusCounts;
  const statusValues = []
  const statusKeys = []
  if(statusCounts)
  for(let key in statusCounts){
    if(key !== '1' && key !== '2'){
    statusValues.push(statusCounts[key])
    statusKeys.push(key)
    }
  }
  const statusNames = statusKeys?.map((statusKey: string) => TICKETS_STATUS_LIST[statusKey]);
  
  const chartOptions: ApexOptions = {
    series: statusValues,
    labels: statusNames,
    chart: {
      width: 100,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '88%',
          labels: {
            show: true,
            name: {
              offsetY: 4,
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: '10px',
              fontWeight: 700,
              label: 'Status Overview',
              color: '#212B36',
              formatter(val) {
                return '';
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `${value}`,
      },
    },
  };

  return (
    <div className="relative h-auto min-h-[150px] min-w-[300px] rounded-lg border border-custom-plaster pl-7 pt-3">
      <div className="flex gap-[10px]">
        {isLoading ? (
          <div className="mr-6 mt-2 w-[24rem]">
            <Skeleton variant="paragraph" rows={3} />
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4 pb-3 pr-5">
            <h2 className="text-lg font-semibold text-custom-black">{title}</h2>
            <div className="flex items-center gap-5">
              <h1 className="text-lg font-bold lg:text-2xl 2xl:text-3xl">{openTicket?.count}</h1>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-custom-grey xl:text-xs 2xl:text-sm">
                <span className={`text-[${closeTicketHighlight}] font-bold`}>{closeTicketsIn24Hours?.count}</span>{' '}
                tickets closed in last 24 hours.
              </p>
              <div className="mt-[-115px] h-[110px] w-[120px]">
                <PieChart chartOptions={chartOptions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OpenTicketsCard;
