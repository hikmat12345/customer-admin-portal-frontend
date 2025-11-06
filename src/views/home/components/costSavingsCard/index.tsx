import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import CostSavingChart from './costSavingChart';

function CostSavingsCard({
  data,
  title,
  badge,
  isLoading,
}: {
  data?: any;
  title?: string;
  badge?: boolean;
  isLoading: boolean;
}) {
  const badgeVariant = data?.percentageDifference > 0 ? 'destructive' : 'success';

  const formattedPercentageDifference =
    data?.percentageDifference > 0
      ? `+${data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const chartVariant = data?.percentageDifference > 0 ? '#E41323' : '#219653';
  const regex = /\$([\d,.]+)k/g;

  const highlightedMessage = data?.message?.replace(
    regex,
    (match: any) => `<span style="color: ${chartVariant};">${match}.</span>`,
  );

  return (
    <div className="relative h-auto min-h-[150px] min-w-[250px] max-w-full rounded-lg border border-custom-plaster pl-7 pt-3">
      <div className="flex h-full gap-[10px]">
        {isLoading ? (
          <div className="mt-2 w-[24rem]">
            <Skeleton variant="paragraph" rows={3} />
          </div>
        ) : (
          <div className="flex h-full flex-col gap-4 sm:w-2/4 lg:w-3/5">
            <h2 className="text-sm font-semibold text-custom-black md:text-base 2xl:text-lg">{title}</h2>
            <div className="flex items-center gap-5">
              <h1 className="text-nowrap text-lg font-bold lg:text-2xl 2xl:text-3xl">
                ${Math.floor(data?.total || data?.totalCostSavings).toLocaleString()}
              </h1>
              {badge && (
                <Badge className="text-nowrap text-sm lg:text-xs" variant={badgeVariant}>
                  {formattedPercentageDifference}%
                </Badge>
              )}
            </div>
            <p
              className="text-xs font-medium text-custom-grey xl:text-xs 2xl:text-sm"
              dangerouslySetInnerHTML={{ __html: highlightedMessage || data?.message }}
            />
          </div>
        )}

        <div className="relative flex flex-col gap-4 sm:w-2/4 lg:w-2/5">
          <div className="from-eb5757 via-eb5757 absolute right-0 top-10 w-full bg-gradient-to-r to-transparent pr-4 pt-1">
            <CostSavingChart data={data?.data} variant={chartVariant} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CostSavingsCard;
