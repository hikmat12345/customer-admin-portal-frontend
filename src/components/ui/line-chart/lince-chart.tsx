"use client";
import { moneyFormatter } from '@/utils/utils';
import { ApexOptions } from 'apexcharts';
import { Loader } from 'lucide-react';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

type LineChartProps = {
    label?: string,
    data: { date: string, total_cost: number }[],
    isLoading: boolean
}
const LineChart = ({ label, data = [], isLoading = false }: LineChartProps) => {
     const options: ApexOptions =
    { 
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
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
                            fontSize: '12px',
                            color: '#fff',
                            background: '#00E396',  
                        },
                        offsetY: 20,
                        text: 'Year 2024',
                    }
                }], 
        },
        dataLabels: {
            enabled: true, 
            formatter: function (value: any) {
                    return moneyFormatter(value, 'USD')
                } ,
                background: { 
                    padding: 15,
                    borderRadius: 3,
                    borderWidth: 0,
                    
                    borderColor: '#fff',
                },
                offsetX: 0,
                offsetY: -16,
                style: {
                    colors: ['#775DD0'],
                    fontSize: '12px', 
                }
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            padding: {
                right: 30,
                left: 20
            }
        },
         xaxis: {
            categories: [...data?.map((d) => d.date)].reverse(),
             type: 'datetime', 
         },
         labels: [...data?.map((d) => d.date)].reverse(),
        
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    return moneyFormatter(value, 'USD')
                }
            }, 
            min: function (value: number) {
                return value > 0 ? 0 : value;
            },

        },
        legend: {
            show: false,
            position: 'top',
        },
        markers: {
            size: 6,
            colors: "#2E93FA",
            strokeColors: '#fff',
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0, 
            showNullDataPoints: true,
            
        },
        tooltip: {
            style: {
                fontSize: '12px', 
            },
            x: {
                show: false,
            },
            y: { 
                title: {
                    formatter: (seriesName: string) => seriesName,
                },
            },
            marker: {
                show: false
            },
            fixed: {
                enabled: false,
                position: 'topLeft',
            },
        },
    };
    return (
        <div>
             {label && <div className='text-custom-blue lg:text-[20px] xl:text-[22px] font-[700] pt-8 pb-6'>{label}</div>}
            {isLoading ? 
                <div className='flex justify-center items-center h-[350px]'>
                    <Loader size={50} color='#b1b1b1' />
                </div>
                : !data?.length ? <div className='text-center text-lg py-8'> Data Not Found</div> :
                 <div className='flex' >
                       <div className='w-[3%] relative top-44 whitespace-pre h-full text-[#000] lg:text-[14px] xl:text-[16px] leading-7  rotate-[270deg] font-bold'>
                            Total Cost
                         </div>
                    <div id="chart " className='w-[97%]'>
                        <ReactApexChart options={options}
                           series={
                                [{
                                    name: '',
                                    data: [...data?.map((d) => { return d.total_cost })].reverse()
                                }]
                            }
                            type="line" height={350} />
                    </div>
                   
                    <div id="html-dist"></div>
                    </div>
                }
        </div>
    );
}

export default LineChart; 