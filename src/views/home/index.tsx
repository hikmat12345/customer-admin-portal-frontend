'use client';

import Image from 'next/image';
import React from 'react';
import { useGetMonthlyTicketsStats } from '@/hooks/useTickets';
import { useGetMonthlyInvoices } from '@/hooks/useGetInvoices';
import AccountCard from '@/components/ui/accountCard/card';
import ScrollArea from '@veroxos/design-system/dist/ui/ScrollArea/scroll-area';
import { useGetCostSavings } from '@/hooks/useGetCostSavings';
import AlertsTable from './components/alertsTable';
import TicketsCard from './components/ticketsCard';
import OpenTicketsCard from './components/openTicketsCard';
import CostSavingsCard from './components/costSavingsCard';

function HomePage() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const { data: invoicesData, isLoading: invoiceLoading } = useGetMonthlyInvoices();
  const { data: costSavingsData, isLoading: costSavingLoading } = useGetCostSavings(currentYear);
  const { data: monthlyTicketsStats, isLoading: isMonthlyTicketsStatsLoading } = useGetMonthlyTicketsStats(
    currentYear,
    currentMonth,
  );

  return (
    <>
      <div className="grid-auto-flow-column grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white p-5">
        <h2 className="text-[22px] font-bold text-custom-blue">Accounts</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
          <AccountCard
            data={invoicesData?.thisMonth}
            title="This Month"
            isLoading={invoiceLoading}
            peakIndicator
            badge
            graph
            tooltipTitle="This month's cost may change as more invoices are processed."
          />
          <AccountCard
            data={invoicesData?.lastMonth}
            title="Last Month"
            isLoading={invoiceLoading}
            peakIndicator
            badge
            graph
          />
          <CostSavingsCard data={costSavingsData} title="Cost Saving" isLoading={costSavingLoading} />
        </div>
      </div>
      <div className="mt-6 flex w-full gap-3">
        <div className="h-full w-full min-w-[473px] rounded-lg border border-custom-lightGray bg-custom-white p-5 md:h-[235px] md:w-[473px]">
          <h2 className="text-[22px] font-bold text-custom-blue">Activity Feed</h2>
          <ScrollArea className="py-4 md:h-[170px]">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-5">
                <Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
                <h2 className="text-base font-normal text-custom-grey">Verizon Invoice 2345 Processed</h2>
              </div>
              <div className="flex items-center gap-5">
                <Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
                <h2 className="text-base font-normal text-custom-grey">Verizon Invoice 2345 Processed</h2>
              </div>
              <div className="flex items-center gap-5">
                <Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
                <h2 className="text-base font-normal text-custom-grey">Verizon Invoice 2345 Processed</h2>
              </div>
              <div className="flex items-center gap-5">
                <Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
                <h2 className="text-base font-normal text-custom-grey">Verizon Invoice 2345 Processed</h2>
              </div>
              <div className="flex items-center gap-5">
                <Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
                <h2 className="text-base font-normal text-custom-grey">Verizon Invoice 2345 Processed</h2>
              </div>
              <div className="flex items-center gap-5">
                <Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
                <h2 className="text-base font-normal text-custom-grey">Verizon Invoice 2345 Processed</h2>
              </div>
              <div className="flex items-center gap-5">
                <Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
                <h2 className="text-base font-normal text-custom-grey">Verizon Invoice 2345 Processed</h2>
              </div>
              <div className="flex items-center gap-5">
                <Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
                <h2 className="text-base font-normal text-custom-grey">Verizon Invoice 2345 Processed</h2>
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="grid-auto-flow-column grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white p-5">
          <h2 className="text-[22px] font-bold text-custom-blue">Customer Service</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
            <TicketsCard data={monthlyTicketsStats} isLoading={isMonthlyTicketsStatsLoading} />
            <OpenTicketsCard title="Tickets Open" />
          </div>
        </div>
      </div>
      <div className="mt-6 w-full">
        <div className="grid-auto-flow-column grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white p-5">
          <h2 className="text-[22px] font-bold text-custom-blue">Actions & Alerts</h2>
          <AlertsTable />
        </div>
      </div>
    </>
  );
}

export default HomePage;
