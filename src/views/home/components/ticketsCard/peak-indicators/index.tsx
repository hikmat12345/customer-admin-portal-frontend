import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import Image from 'next/image';
import React from 'react';

type Variant = 'success' | 'destructive';

function PeakIndicator({ variant, isLoading }: { variant: Variant; isLoading?: boolean }) {
  let arrowImageSrc;
  let backgroundColor;
  switch (variant) {
    case 'success':
      arrowImageSrc = '/svg/upPeakArrow.svg';
      backgroundColor = 'bg-[#219653]';
      break;
    case 'destructive':
      arrowImageSrc = '/svg/downPeakArrow.svg';
      backgroundColor = 'bg-custom-red';
      break;
    default:
      arrowImageSrc = '';
      backgroundColor = '';
  }

  return (
    <div>
      {isLoading ? (
        <div className="top-0 rounded-full">
          <Skeleton variant="avatar" height="40px" width="40px" />
        </div>
      ) : (
        <div className={`${backgroundColor} flex h-9 w-9 items-center justify-center rounded-full`}>
          <Image
            src={arrowImageSrc}
            alt={variant === 'success' ? 'Up Peak Arrow' : 'Down Peak Arrow'}
            width={15}
            height={15}
          />
        </div>
      )}
    </div>
  );
}

export default PeakIndicator;
