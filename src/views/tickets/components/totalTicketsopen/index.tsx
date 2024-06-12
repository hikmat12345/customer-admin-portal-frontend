import PieChart from '@/components/ui/pieChart'
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton'
import { OpenTicketSummary } from '@/types/tickets/types'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import { moneyFormatter } from '@/utils/utils'

const TotalTicketsOpen = ({ data, isLoading }: { data: OpenTicketSummary; isLoading: boolean }) => {
	const openTicketsCount = moneyFormatter(data?.openTickets?.count);

  const chartOptions: ApexOptions = {
    series: [data?.closedTicketsLast24Hours.count],
    labels: ['Closed tickets'],
    chart: {
      width: 100,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '92%',
          labels: {
            show: true,
            name: {
              offsetY: -15,
              fontSize: '10px',
              color: '#637381',
              formatter() {
                return 'Closed Tickets';
              },
            },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 700,
              color: '#212B36',
              offsetY: -4,
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
      y: {},
    },
    colors: ['#219653'],
  };

  return (
    <div className="relative h-auto min-h-[150px] min-w-[300px] rounded-lg border border-custom-plaster pl-7 pt-3">
      {isLoading ? (
        <div className="mt-2 lg:mr-7">
          <Skeleton variant="paragraph" rows={3} className="mr-7" />{' '}
        </div>
      ) : (
        <div className="flex gap-[6px]">
          <div className="flex w-full flex-col gap-4 pb-3 pr-5">
            <h2 className="text-lg font-bold text-custom-black">Total Tickets Open</h2>
            <div className="flex items-center gap-5">
              <h1 className="text-lg font-bold text-custom-beer lg:text-2xl 2xl:text-3xl">{openTicketsCount}</h1>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-custom-grey xl:text-xs 2xl:text-sm">
                {openTicketsCount} tickets are currently open.
              </p>
              <div className="relative mr-2 mt-[-100px] h-[103px] w-[120px] lg:mt-[-103px] lg:h-[106px] 2xl:mt-[-103px] 2xl:h-[120px]">
                <PieChart chartOptions={chartOptions} />
                <span className="absolute left-[34%] text-[8px] font-bold text-custom-greyBlue lg:bottom-[15%] xl:bottom-[23%]">
                  in last 24 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TotalTicketsOpen;
