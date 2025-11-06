'use client';

import { MONTH_FORMAT, MONTH_YEAR_FORMAT } from '@/utils/constants/constants';
import { currencyFormatter } from '@/utils/utils';
import { format } from 'date-fns';
import { Loader } from 'lucide-react';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

type LineChartProps = {
  label?: string;
  data: any;
  isLoading: boolean;
  className?: string;
  mix?: boolean;
  currencyCode?: string;
};
function LineChart({
  label,
  data = [],
  isLoading = false,
  className = '',
  mix = false,
  currencyCode = '',
}: LineChartProps) {
  const options: any = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      stacked: mix,
    },
    annotations: {
      xaxis: [
        {
          x: new Date('1 Jan 2024').getTime(),
          x2: new Date('10 Jan 2024 ').getTime(),
          fillColor: '#B3F7CA',
          opacity: 0.4,
          label: {
            borderColor: '#B3F7CA',
            style: {
              fontSize: '0.75rem',
              color: '#fff',
              background: '#00E396',
            },
            offsetY: 20,
            text: 'Year 2024',
          },
        },
      ],
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: 'end', // 'around', 'end'
        borderRadiusWhenStacked: 'last', // 'all', 'last'
      },
    },
    dataLabels: {
      enabled: true,
      formatter(value: any) {
        return currencyFormatter(value, currencyCode);
      },
      background: {
        padding: 5,
        borderRadius: 3,
        borderWidth: 0,
        borderColor: '#fff',
      },
      offsetX: 0,
      offsetY: -16,
      style: {
        colors: ['#775DD0'],
        fontSize: '0.75rem',
      },
    },
    stroke: {
      curve: 'straight',
    },
    grid: {
      padding: {
        right: 30,
        left: 20,
      },
    },
    xaxis: {
      categories: mix ? data[0].reverse() : [...data?.map((d: { date: string }) => d.date)].reverse(),
      labels: {
        format: MONTH_YEAR_FORMAT,
        formatter: function (value: string) {
          const [year, month] = value?.split('-') || [];
          return `${Date.parse(value) ? format(new Date(value), MONTH_FORMAT) : month} ${year}`;
        },
      },
    },
    labels: mix ? data[0].reverse() : [...data?.map((d: { date: string }) => d.date)].reverse(),

    yaxis: {
      labels: {
        formatter(value: any) {
          return currencyFormatter(value, currencyCode)?.split('.')[0];
        },
      },
      min(value: number) {
        return value > 0 ? 0 : value;
      },
    },
    legend: {
      show: mix,
      position: 'bottom',
    },
    markers: {
      size: 6,
      colors: '#2E93FA',
      strokeColors: '#fff',
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: 'circle',
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
      style: {
        fontSize: '0.75rem',
      },
      x: {
        show: false,
        format: MONTH_YEAR_FORMAT,
      },
      y: {
        title: {
          formatter: (seriesName: string) => seriesName,
        },
      },
      marker: {
        show: false,
      },
      fixed: {
        enabled: false,
        position: 'topLeft',
      },
    },
  };
  return (
    <div>
      {label && <div className="pb-6 pt-8 text-[1.375rem] font-[700] text-custom-blue">{label}</div>}
      {isLoading ? (
        <div className="flex h-[350px] items-center justify-center">
          <Loader size={50} color="#b1b1b1" />
        </div>
      ) : !data?.length ? (
        <div className="py-8 text-center text-lg">No data found</div>
      ) : (
        <>
          <div className={`flex ${className}`}>
            <div className="relative top-44 h-full w-[3%] rotate-[270deg] whitespace-pre text-[1rem] font-bold leading-7 text-[#000]">
              Total Cost
            </div>
            <div id="chart " className="w-[97%]">
              <ReactApexChart
                options={options}
                series={
                  mix
                    ? data[1].reverse()
                    : [
                        {
                          name: '',
                          data: [...data?.map((d: { date: any; total_cost: number }) => d.total_cost)].reverse(),
                        },
                      ]
                }
                type="line"
                height={350}
              />
            </div>
            <div id="html-dist" />
          </div>
        </>
      )}
    </div>
  );
}
export default LineChart;
