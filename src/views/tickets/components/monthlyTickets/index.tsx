import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import { useGetMonthlyTicketsStats } from '@/hooks/useTickets';
import PeakIndicator from './peak-indicators/peakIndicators';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import { currencyFormatter } from '@/utils/utils';

function MonthlyTickets({ title, year, month }: { title: string; year: number; month: number }) {
  const { data: monthlyTicketsStats, isLoading } = useGetMonthlyTicketsStats(year, month);

  const totalTickets = monthlyTicketsStats?.totalMonthTickets;

  const formattedPercentageDifference =
    monthlyTicketsStats?.percentageDifference > 0
      ? `+${monthlyTicketsStats?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : monthlyTicketsStats?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const badgeVariant = monthlyTicketsStats?.percentageDifference > 0 ? 'destructive' : 'success';

  function difference(difference: number) {
    const absDifference = Math.abs(difference);

    const className = difference > 0 ? '#E41323' : '#219653';

    const message =
      difference > 0
        ? 'more tickets this month so far compared to the previous month.'
        : 'fewer tickets previous month compared to this month.';

    return (
      <>
        <span className={`font-bold text-[${className}]`}>{currencyFormatter(absDifference)}</span> {message}
      </>
    );
  }

  return (
    <div className="relative h-auto min-h-[150px] min-w-[300px] rounded-lg border border-custom-plaster pl-7 pt-3">
      <div className="flex h-full gap-[10px]">
        {isLoading ? (
          <div className="mt-2 w-[24rem] lg:mr-12">
            <Skeleton variant="paragraph" rows={3} />
          </div>
        ) : (
          <div className="flex h-full w-full flex-col gap-4 pb-3 pr-5">
            <h2 className="text-lg font-semibold text-custom-black">{title}</h2>
            <div className="flex items-center gap-5">
              <h1 className="text-lg font-bold lg:text-2xl 2xl:text-3xl">{currencyFormatter(totalTickets)}</h1>
              <Badge className="text-sm lg:text-xs" variant={badgeVariant}>
                {formattedPercentageDifference}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-custom-grey 2xl:text-sm">
                {difference(monthlyTicketsStats?.difference)}
              </p>
            </div>
          </div>
        )}
        <div className="absolute right-4">
          <PeakIndicator variant={badgeVariant} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default MonthlyTickets;
