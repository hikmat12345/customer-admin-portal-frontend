import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import { ReactNode } from 'react';
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import ChartComponent from '@/views/home/components/chartComponent';
import PeakIndicator from '../peakIndicators/arrow-peaks';

function AccountCard({
  data,
  title,
  peakIndicator,
  message,
  badge,
  graph,
  isLoading,
}: {
  data?: any;
  title?: string;
  peakIndicator?: boolean;
  message: ReactNode;
  badge?: boolean;
  graph?: boolean;
  isLoading: boolean;
}) {
  const badgeVariant = data?.percentageDifference > 0 ? 'destructive' : 'success';

  const formattedPercentageDifference =
    data?.percentageDifference > 0
      ? `+${data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const chartVariant = data?.percentageDifference > 0 ? '#E41323' : '#219653';

  return (
    <div className="relative h-auto min-h-[150px] min-w-[250px] max-w-full rounded-lg border border-custom-plaster pl-7 pt-3 lg:min-h-[140px] xl:min-h-[155px]">
      <div className="flex gap-[10px]">
        {isLoading ? (
          <div className={`mt-2 w-[24rem] ${graph ? 'mr-6' : 'mr-14'}`}>
            <Skeleton variant="paragraph" rows={3} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 pb-3">
            <h2 className="text-sm font-semibold text-custom-black md:text-base 2xl:text-lg">{title}</h2>
            <div className="flex items-center gap-5">
              <h1 className="text-nowrap text-lg font-bold lg:text-2xl 2xl:text-3xl">
                $ {Math.floor(data?.total || data?.totalCostSavings).toLocaleString()}
              </h1>
              {badge && (
                <Badge className="text-nowrap text-sm lg:text-xs" variant={badgeVariant}>
                  {formattedPercentageDifference}%
                </Badge>
              )}
            </div>

            {message}
          </div>
        )}

        {peakIndicator && (
          <PeakIndicator variant={badgeVariant} isLoading={isLoading} percentage={data?.percentageDifference}>
            {/* <Image
							src={arrowImageSrc}
							alt={percentage && percentage > 0 ? 'Up Peak Arrow' : 'Down Peak Arrow'}
							width={15}
							height={15}
						/> */}
          </PeakIndicator>
        )}

        {graph && (
          <div className="from-eb5757 via-eb5757 bg-gradient-to-r to-transparent pr-4 pt-1">
            <ChartComponent data={data?.lastSixMonthsInvoices} variant={chartVariant} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountCard;
