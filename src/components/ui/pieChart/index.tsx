'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function PieChart({ chartOptions }: { chartOptions: ApexOptions }) {
  return <Chart options={chartOptions} series={chartOptions.series} type="donut" width={180} height={159.75} />;
}

export default PieChart;
