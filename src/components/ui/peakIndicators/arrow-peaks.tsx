import Image from 'next/image';
import React from 'react';
import Skeleton from '../skeleton/skeleton';

type Variant = 'success' | 'destructive';

function PeakIndicator({
  isLoading,
  percentage,
  total,
}: {
  variant: Variant;
  isLoading?: boolean;
  percentage?: number | null;
  total: number;
}) {
  let arrowImageSrc;
  let backgroundColor;
  let margin, border;
  if (percentage === undefined || percentage === null || (percentage === 0 && total != 0)) {
    arrowImageSrc = '/svg/whiteLinePeakArrow.svg';
    backgroundColor = 'bg-custom-coolBlue';
    margin = '-9px 0 0 2px';
    border = 'border border-[#999999]'; // will add colors to design system once design provide the names
  } else if (total === 0 && percentage === 0) {
    arrowImageSrc = '/svg/linePeakArrow.svg';
    backgroundColor = 'bg-transparent';
    border = 'border border-[#999999]'; // will add colors to design system once design provide the names
    margin = '-9px 0 0 1px';
  } else if (percentage > 0) {
    arrowImageSrc = '/svg/upPeakArrow.svg';
    backgroundColor = 'bg-custom-red';
    margin = '';
  } else {
    arrowImageSrc = '/svg/downPeakArrow.svg';
    backgroundColor = 'bg-[#219653]';
    margin = '';
  }

  return (
    <>
      {isLoading ? (
        <div className="absolute right-0 top-0 rounded-full">
          <Skeleton variant="avatar" height="40px" width="40px" />
        </div>
      ) : (
        <div
          className={`absolute right-4 top-2 ${backgroundColor} ${border} flex h-9 w-9 items-center justify-center rounded-full`}
        >
          <Image
            src={arrowImageSrc}
            alt={percentage && percentage > 0 ? 'Up Peak Arrow' : 'Down Peak Arrow'}
            style={{
              margin: margin,
            }}
            width={15}
            height={15}
          />
        </div>
      )}
    </>
  );
}

export default PeakIndicator;
