'use client';

import React from 'react';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function ChartComponent({ data, variant }: { data: any; variant: string }) {
  const invoiceSeriesData =
    data &&
    data.map((invoice: any) => ({
      month: invoice.month,
      date: invoice.invoiceDate,
      total: invoice.total,
    }));

  invoiceSeriesData?.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const options: any = {
    series: [
      {
        data: invoiceSeriesData?.map((dataPoint: any) => dataPoint.total.toFixed(2)),
        color: variant,
      },
    ],
    labels: invoiceSeriesData?.map((dataPoint: any) => dataPoint?.month),
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
      enabled: true,
      x: {
        format: 'dd/MM/yy HH:mm',
        formatter: undefined,
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

export default ChartComponent;
