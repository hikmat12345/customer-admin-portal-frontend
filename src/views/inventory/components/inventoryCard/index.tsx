import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import { ReactNode } from 'react';

function InventoryCard({
  data,
  title,
  message,
  isLoading,
}: {
  data?: ReactNode;
  title?: string;
  message: ReactNode;
  isLoading?: boolean;
}) {
  return (
    <div className="relative h-auto min-h-[150px] min-w-[250px] max-w-full rounded-lg border border-custom-plaster pl-7 pt-3 lg:min-h-[140px] xl:min-h-[155px]">
      <div className="flex gap-[10px]">
        {isLoading ? (
          <div className="mr-14 mt-2 w-[24rem]">
            <Skeleton variant="paragraph" rows={3} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 pb-3">
            <h2 className="text-sm font-semibold text-custom-black md:text-base 2xl:text-lg">{title}</h2>
            <div className="flex items-center gap-5">{data}</div>

            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryCard;
