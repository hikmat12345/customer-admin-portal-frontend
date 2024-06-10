import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import { useGetMonthlyTickets } from '@/hooks/useTickets';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import PeakIndicator from './peak-indicators/peakIndicators';

function MonthlyTickets({ title, year, month }: { title: string; year: number; month: number }) {
  const { data: monthlyTicketsData, isLoading } = useGetMonthlyTickets(year, month);

  const totalTickets = monthlyTicketsData?.totalMonthTickets;

  const formattedPercentageDifference =
    monthlyTicketsData?.percentageDifference > 0
      ? `+${monthlyTicketsData?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : monthlyTicketsData?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const badgeVariant = monthlyTicketsData?.percentageDifference > 0 ? 'success' : 'destructive';

  function difference(difference: number) {
    const absDifference = Math.abs(difference);

    const className = difference > 0 ? '#219653' : '#E41323';

    const message =
      difference > 0
        ? 'more tickets this month compared to the previous month.'
        : 'fewer tickets previous month compared to this month.';

    return (
      <>
        <span className={`font-bold text-[${className}]`}>{absDifference}</span> {message}
      </>
    );
  }

  return (
    <div className="relative h-auto min-h-[150px] min-w-[300px] rounded-lg border border-custom-plaster pl-7 pt-3">
      <div className="flex gap-[10px]">
        {isLoading ? (
          <div className="mt-2 w-[24rem] lg:mr-12">
            <Skeleton variant="paragraph" rows={3} />
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4 pb-3 pr-5">
            <h2 className="text-lg font-semibold text-custom-black">{title}</h2>
            <div className="flex items-center gap-5">
              <h1 className="text-lg font-bold lg:text-2xl 2xl:text-3xl">{totalTickets}</h1>
              <Badge className="text-sm lg:text-xs" variant={badgeVariant}>
                {formattedPercentageDifference}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-custom-grey 2xl:text-sm">
                {difference(monthlyTicketsData?.difference)}
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
