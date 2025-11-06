/* eslint-disable */

import CheckmarkIcon from '@/components/ui/checkmarkIcon';
import { TicketSecondaryStatus } from '@/types/tickets/types';
import React from 'react';

function Stepper({
  orderStatuses,
  currentStatus,
  nextStatus,
  category,
}: {
  orderStatuses: TicketSecondaryStatus[];
  nextStatus: TicketSecondaryStatus;
  currentStatus: TicketSecondaryStatus;
  category: number;
}) {
  const isActive = (orderStatus: TicketSecondaryStatus) => {
    if (orderStatus.id == currentStatus.id || orderStatus.order < currentStatus.order) return true;

    return false;
  };

  const isNext = (orderStatus: TicketSecondaryStatus) => {
    if (orderStatus.id == nextStatus.id) return true;

    return false;
  };

  return (
    <ol className="flex w-full items-center">
      <li key="0" className="flex w-full flex-col">
        <div
          className={`mb-5 flex w-full items-center before:w-2/4 before:content-[''] after:w-2/4 after:border after:border-custom-lightGreen after:content-['']`}
        >
          <div className="rounded-full border-[3px] border-custom-lightGreen">
            <span className="m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-custom-lightGreen dark:bg-custom-lightGreen">
              <CheckmarkIcon />
            </span>
          </div>
        </div>

        <div className="text-center sm:min-h-[120px] lg:min-h-[100px] xl:min-h-[70px]">
          <p className="text-[0.938rem] font-[400] leading-[1.563rem] text-custom-lightGreen">
            {category === 3 ? 'Order' : 'Ticket'} Created
          </p>
          <p className="text-[0.688rem] font-[400] leading-[0.938rem] text-custom-grey">Your order has been created</p>
        </div>
      </li>
      {orderStatuses.map((orderStatus: TicketSecondaryStatus, index: number) => (
        <li key={orderStatus.id} className="flex w-full flex-col">
          <div
            className={`mb-5 flex w-full items-center after:w-2/4 after:content-[''] ${
              orderStatuses.length - 1 !== index &&
              `${
                isActive(orderStatus) ? 'after:border-custom-lightGreen' : 'after:border-custom-silverSand'
              } after:border`
            } before:w-2/4 before:content-[''] ${`${
              isNext(orderStatus) || isActive(orderStatus)
                ? 'before:border-custom-lightGreen'
                : 'before:border-custom-silverSand'
            } before:border`} `}
          >
            <div
              className={`rounded-full border-[3px] ${
                isActive(orderStatus)
                  ? 'border-custom-lightGreen'
                  : isNext(orderStatus)
                    ? 'border-custom-orange border-opacity-75'
                    : 'border-custom-silverSand'
              }`}
            >
              <div className="m-1 flex h-8 w-8 items-center justify-center">
                <span
                  className={`flex items-center justify-center ${
                    isActive(orderStatus)
                      ? 'h-full w-full bg-custom-lightGreen'
                      : nextStatus.id == orderStatus.id
                        ? 'h-4 w-4 bg-custom-orange bg-opacity-75'
                        : 'bg-custom-silverSand'
                  } rounded-full dark:${
                    isActive(orderStatus)
                      ? 'bg-custom-lightGreen'
                      : isNext(orderStatus)
                        ? 'bg-custom-orange bg-opacity-75'
                        : 'bg-custom-silverSand'
                  } shrink-0`}
                >
                  {isActive(orderStatus) && <CheckmarkIcon />}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center sm:min-h-[120px] lg:min-h-[100px] xl:min-h-[70px]">
            <p
              className={`text-[0.938rem] font-[400] leading-[1.563rem] ${
                isActive(orderStatus)
                  ? 'text-custom-lightGreen'
                  : isNext(orderStatus)
                    ? 'text-custom-orange text-opacity-75'
                    : 'text-custom-silverSand'
              }`}
            >
              {orderStatus.name}
            </p>
            <p
              className={`text-[0.688rem] font-[400] leading-[1.063rem] ${
                isActive(orderStatus) ? 'text-custom-grey' : 'text-custom-silverSand'
              }`}
            >
              {orderStatus.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default Stepper;
