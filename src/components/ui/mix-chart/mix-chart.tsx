'use client';

import { MONTH_YEAR_FORMAT } from '@/utils/constants/constants';
import { currencyFormatter, findCurrencySymbol } from '@/utils/utils';
import { format } from 'date-fns';
import { Loader } from 'lucide-react';
import React, { useLayoutEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

type MixChartProps = {
  label?: string;
  isLoading: boolean;
  data: [string[], { name: string; data: number[]; type: string; color: string }[]];
  currencyCode: string;
};

function MixChart({ label, isLoading = false, data, currencyCode }: MixChartProps) {
  const [chart, setChart] = React.useState<any>();
  useLayoutEffect(() => {
    const options: any = {
      series: data[1].map((item) => {
        if (item.type === 'bar') {
          const findMinValue = Math.min(...item.data) > 0 ? 0 : Math.min(...item.data);
          return {
            name: item.name,
            type: item.type,
            data: [findMinValue, ...item.data],
            color: item.color,
          };
        } else {
          return item;
        }
      }),
      chart: {
        type: 'bar',
        height: '750px',
        width: '100%',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        events: {
          mounted: async function (chartContext: any) {
            const yAxisLabels = await chartContext.el.querySelectorAll(
              '.apexcharts-yaxis-texts-g .apexcharts-yaxis-label',
            );
            await yAxisLabels.forEach(async (label: any) => {
              const value = await parseFloat(label.textContent.replace(/[^0-9.-]+/g, ''));
              if (Number(value) < 0) {
                label.classList.add('negative-label');
              }
            });
          },
        },
      },
      grid: {
        padding: {
          left: 40,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 2,
          borderRadiusApplication: 'end', // 'around', 'end'
          borderRadiusWhenStacked: 'last', // 'all', 'last'
          columnWidth: '80%',
          colors: {
            ranges: [
              {
                from: 0,
                to: -5000,
                color: '#FEB019',
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
        formatter(value: number) {
          return currencyFormatter(value, currencyCode);
        },
        background: {
          padding: 9,
          borderRadius: 3,
          borderWidth: 0,
          borderColor: '#fff',
          foreColor: '#fff',
        },
        offsetX: 2,
        offsetY: -12,
        style: {
          colors: ['#FF3162'],
          fontSize: '0.75rem',
        },
      },
      stroke: {
        colors: ['transparent'],
        width: 1,
      },
      xaxis: {
        categories: data[0],
        labels: {
          formatter(value: any) {
            return value ? format(new Date(value), MONTH_YEAR_FORMAT) : value;
          },
          style: {
            colors: '#546E7A',
          },
        },
      },
      yaxis: {
        axisTicks: {
          show: false,
        },
        tickAmount: 6,
        axisBorder: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        labels: {
          formatter(value: any) {
            return value && !Number.isInteger(value)
              ? value < 0
                ? '-' + findCurrencySymbol(currencyCode) + Math.abs(value).toFixed(2)
                : findCurrencySymbol(currencyCode) + value.toFixed(2)
              : value < 0
                ? '-' + findCurrencySymbol(currencyCode) + Math.abs(value)
                : findCurrencySymbol(currencyCode) + value;
          },
          style: { fontSize: '0.75rem' },
        },
      },
      legend: {
        show: true,
        position: 'bottom',
        offsetY: 8,
        inverseOrder: false,
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 6,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: 'circle',
        radius: 2,
        strokeColors: '#fff',
        strokeWidth: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
      },
      tooltip: {
        style: {
          fontSize: '0.75rem',
        },
        x: {
          show: true,
          format: MONTH_YEAR_FORMAT,
        },
        y: {
          title: {
            formatter: (seriesName: string) => seriesName,
          },
        },
        marker: {
          show: true,
        },
        fixed: {
          enabled: false,
          position: 'topLeft',
        },
      },
    };
    setChart(options);
    return () => {
      setChart({});
    };
  }, [data, isLoading]);

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
          <div className="flex">
            <div className="relative top-44 h-full w-[3%] rotate-[270deg] whitespace-pre text-[1rem] font-bold leading-7 text-[#000]">
              Total Cost
            </div>
            <div id="mix-chart" className="w-full">
              {chart && (
                <ReactApexChart id="mix-chart" options={chart} series={chart?.series} type="line" height={350} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MixChart;
