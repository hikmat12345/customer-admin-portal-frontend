import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';

function InvoicesProcessed({ data, title, isLoading }: any) {
  return (
    <div className="relative h-auto min-h-[150px] min-w-[300px] rounded-lg border border-custom-plaster pl-7 pt-3 lg:min-h-[140px] xl:min-h-[155px]">
      {isLoading ? (
        <div className="mr-8 mt-2">
          <Skeleton variant="paragraph" rows={3} />
        </div>
      ) : (
        <div className="flex gap-[6px]">
          <div className="flex w-full flex-col gap-4 pb-3 pr-5">
            <h2 className="text-sm font-semibold text-custom-black md:text-base xl:text-lg">{title}</h2>
            <div className="flex items-center gap-5">
              <h1 className="text-lg font-bold lg:text-2xl 2xl:text-3xl">{data?.invoices?.length}</h1>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-custom-grey xl:text-xs 2xl:text-sm">
                So far this month, {data?.invoices?.length} invoices have been processed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoicesProcessed;
