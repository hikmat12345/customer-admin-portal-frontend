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
import { useGetActivityFeed } from '@/hooks/useGetActivityFeedback';
import TooltipText from '@/components/ui/textbox';
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';

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
  const { data: activityFeed, isLoading: activityFeedLoading } = useGetActivityFeed();

  return (
    <>
      <div className="grid-auto-flow-column grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white p-5">
        <h2 className="text-[22px] font-bold text-custom-blue">Accounts</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 2lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
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
      <div className="mt-6 flex w-full flex-col gap-3 2lg:flex-row">
        <div className="h-full w-full rounded-lg border border-custom-lightGray bg-custom-white p-5 md:min-h-[235px] md:min-w-[473px] xl:w-[473px]">
          <h2 className="text-[22px] font-bold text-custom-blue">Activity Feed</h2>
          <ScrollArea className="py-4 sm:h-[320px] xl:h-[170px]">
            <div className="flex flex-col gap-3">
              {activityFeedLoading ? (
                <Skeleton variant="paragraph" rows={4} />
              ) : (
                activityFeed?.data?.map((activity: { id: number; action: string; targetType: string }) => (
                  <div key={activity.id} className="flex items-center gap-5">
                    {activity.targetType && (
                      <Image
                        src={`/svg/${activity?.targetType}.svg`}
                        width={25}
                        height={25}
                        alt="Copy clipboard icon"
                      />
                    )}
                    <TooltipText
                      className="text-base font-normal text-custom-grey"
                      text={activity.action ? activity.action : '-'}
                      maxLength={40}
                    />
                  </div>
                ))
              )}
              {!activityFeedLoading && activityFeed?.data?.length === 0 && (
                <p className="text-base font-normal">No activity feed available</p>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="grid-auto-flow-column grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white p-5">
          <h2 className="text-[22px] font-bold text-custom-blue">Customer Service</h2>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
