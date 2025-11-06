import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import Image from 'next/image';
import React from 'react';

const SavingTrackerCard = ({
  title,
  imgSrc,
  value = 0,
  valueColor,
  isLastCard,
  isLoading,
}: {
  title: string;
  imgSrc: string;
  value: number;
  valueColor: string;
  isLastCard: boolean;
  isLoading: boolean;
}) => {
  return (
    <div className="flex items-center justify-between xl:gap-[2rem]">
      <div className="flex items-center justify-center gap-4 lg:gap-3 2xl:gap-5">
        {isLoading ? (
          <div className="w-[15rem]">
            <Skeleton variant="paragraph" rows={2} />
          </div>
        ) : (
          <>
            <div className="mb-6 lg:mb-[2.75rem]">
              <Image src={imgSrc} alt={title} width={30} height={30} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-medium text-custom-greyBlue 2lg:text-lg 2xl:text-xl">{title}</h3>
              <h1 className={`text-2xl font-bold lg:text-2xl 2lg:text-2xl 2xl:text-3xl ${valueColor}`}>
                ${Math.floor(value).toLocaleString()}
              </h1>
            </div>
          </>
        )}
      </div>
      <div
        className={`hidden h-[7rem] w-[1px] md:hidden lg:block ${isLastCard ? 'invisible' : 'bg-custom-palePathaloBlue'}`}
      />
    </div>
  );
};

export default SavingTrackerCard;
