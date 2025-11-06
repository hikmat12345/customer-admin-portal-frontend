import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import { ReactNode } from 'react';
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import ChartComponent from '@/views/home/components/chartComponent';
import PeakIndicator from '../peakIndicators/arrow-peaks';
import { getFormattedTotal, getPreviousMonthYear } from '@/utils/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';

function AccountCard({
  data,
  message,
  title,
  peakIndicator,
  badge,
  graph,
  isLoading,
  tooltipTitle,
}: {
  data?: any;
  message?: ReactNode;
  title?: string;
  peakIndicator?: boolean;
  badge?: boolean;
  graph?: boolean;
  isLoading: boolean;
  tooltipTitle?: string;
}) {
  const peakIndicatorVariant = data?.percentageDifference > 0 ? 'destructive' : 'success';

  const getLastMonthAndYear = (data: any) => {
    const lastInvoice = data?.lastSixMonthsInvoices?.[data?.lastSixMonthsInvoices?.length - 1];
    return lastInvoice
      ? {
          month: lastInvoice.month,
          year: lastInvoice.year,
          formatted: `${lastInvoice.month} ${lastInvoice.year}`,
        }
      : undefined;
  };

  const absoluteDifference = Number(Math.abs(data?.difference).toFixed(2));

  const formattedDifference = getFormattedTotal(absoluteDifference);

  const thisMonthAndYear = getLastMonthAndYear(data);
  const lastMonthAndYear = getLastMonthAndYear(data);

  const previousThisMonth = thisMonthAndYear && getPreviousMonthYear(thisMonthAndYear?.formatted);
  const previousLastMonth = lastMonthAndYear && getPreviousMonthYear(lastMonthAndYear?.formatted);

  const getMessage = (difference: number, formattedDifference: string | number, title: string | undefined) => {
    let message = null;

    const lastMonthPhrase = `${lastMonthAndYear?.formatted}`;
    const previousMonthPhrase = title === 'This Month' ? previousThisMonth : previousLastMonth;

    const moreOrLess = difference > 0 ? 'more' : 'less';
    const verb = title === 'This Month' ? 'have spent' : 'spent';

    if (difference !== 0) {
      message = (
        <p className="text-xs font-medium text-custom-grey xl:text-xs 2xl:text-sm">
          You {verb}
          <span className={`ml-1 mr-1 font-semibold ${difference > 0 ? 'text-custom-red' : 'text-[#219653]'}`}>
            ${formattedDifference}
          </span>
          {moreOrLess} in {lastMonthPhrase} than {previousMonthPhrase}.
        </p>
      );
    }

    return message;
  };

  const getSameAmountMessage = () => {
    return (
      <p className="text-xs font-medium text-custom-grey xl:text-xs 2xl:text-sm">
        You have spent <span className="font-semibold text-custom-dryBlue">same</span> amount as the previous month.
      </p>
    );
  };

  const getNoDataMessage = () => {
    return <p className="text-xs font-medium text-custom-grey xl:text-xs 2xl:text-sm">No spending data available.</p>;
  };

  const badgeVariant =
    data?.percentageDifference > 0
      ? 'destructive'
      : data?.percentageDifference < 0
        ? 'success'
        : data?.percentageDifference === 0
          ? 'cool'
          : 'secondary';

  const formattedPercentageDifference =
    data?.percentageDifference > 0
      ? `+${data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const getColor = (data: any) => {
    if (data && data.percentageDifference !== null && data.percentageDifference !== undefined) {
      if (data.percentageDifference > 0) return '#E41323';
      if (data.percentageDifference < 0) return '#219653';
      if (data.percentageDifference === 0 && data?.total === 0) return '#999999';
      if (data.percentageDifference === 0 && data?.total !== 0) return '#037EC2';
    }
    return '#037EC2';
  };

  //using static colors in the chart because they won't be entertained in apex charts
  const chartVariant = getColor(data);

  const card = (
    <div className="relative h-auto min-h-[150px] min-w-[250px] max-w-full rounded-lg border border-custom-plaster pl-7 pt-3 lg:min-h-[140px] xl:min-h-[155px]">
      <div className="flex gap-[10px]">
        {isLoading ? (
          <div className={`mt-2 w-[24rem] ${graph ? 'mr-6' : 'mr-14'}`}>
            <Skeleton variant="paragraph" rows={3} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:w-4/5 lg:w-4/5">
            <h2 className="text-sm font-semibold text-custom-black md:text-base 2xl:text-lg">{title}</h2>
            <div className="flex items-center gap-5">
              <h1 className="text-nowrap text-lg font-bold lg:text-2xl 2xl:text-3xl">
                ${Math.floor(data?.total ?? data?.totalCostSavings ?? 0).toLocaleString() || 0}
              </h1>
              {badge && (
                <Badge
                  className={`text-nowrap text-sm lg:text-xs ${data?.percentageDifference === 0 && 'text-[#999999 bg-[#D9D9D933]'}`}
                  variant={badgeVariant}
                >
                  {formattedPercentageDifference}%
                </Badge>
              )}
            </div>
            {message
              ? message
              : data?.percentageDifference === 0
                ? getNoDataMessage()
                : getMessage(data?.difference, formattedDifference, title) || getSameAmountMessage()}
          </div>
        )}
        <div className="relative flex w-1/4 flex-col gap-4 lg:w-1/5">
          {peakIndicator && (
            <PeakIndicator
              variant={peakIndicatorVariant}
              isLoading={isLoading}
              percentage={data?.percentageDifference}
              total={data?.total}
            />
          )}
          {graph && (
            <div className="from-eb5757 via-eb5757 absolute right-0 top-10 w-full bg-gradient-to-r to-transparent pr-4 pt-1">
              <ChartComponent data={data?.lastSixMonthsInvoices} variant={chartVariant} />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {tooltipTitle ? (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger className="text-left">{card}</TooltipTrigger>
            <TooltipContent className="rounded-lg bg-custom-white px-4 py-2 text-[0.813rem] font-[300] leading-[1.023rem] shadow-[0_4px_14px_0px_#00000040]">
              {tooltipTitle}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        card
      )}
    </>
  );
}

export default AccountCard;
