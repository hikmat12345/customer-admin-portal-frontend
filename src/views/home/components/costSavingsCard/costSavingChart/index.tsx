'use client';

import React from 'react';

import dynamic from 'next/dynamic';
import { monthNames } from '@/utils/utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function CostSavingChart({ data, variant }: { data: any; variant: string }) {
  const costSavingsData = data?.map((dataPoint: { costSavings: number }) => dataPoint.costSavings?.toFixed(2));

  const options: any = {
    series: [
      {
        name: 'Month',
        data: costSavingsData,
        color: variant,
      },
    ],
    labels: monthNames,
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      height: 10,
      offsetY: 40,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      grid: {
        show: false,
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
      y: {
        formatter: (value: number) => `$${Math.floor(value).toLocaleString()}`,
        title: {
          formatter: () => 'Total:',
        },
      },
    },
    yaxis: {
      show: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      grid: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
  };

  return <Chart options={options} series={options.series} type="area" height="75px" width="100%" />;
}

export default CostSavingChart;
