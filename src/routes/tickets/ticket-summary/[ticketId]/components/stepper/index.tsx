import CheckmarkIcon from "@/components/ui/checkmarkIcon";
import { TicketSecondaryStatus } from "@/types/tickets/types";
import React from "react";

const Stepper = ({
  orderStatuses,
  currentStatus,
  nextStatus,
  category,
}: {
  orderStatuses: TicketSecondaryStatus[];
  nextStatus: TicketSecondaryStatus;
  currentStatus: TicketSecondaryStatus;
  category: number;
}) => {

  const isActive = (orderStatus : TicketSecondaryStatus) => {
    if(orderStatus.id == currentStatus.id || orderStatus.order < currentStatus.order)
      return true

    return false   
  }

  const isNext = (orderStatus : TicketSecondaryStatus) => {
    if(orderStatus.id == nextStatus.id)
      return true

    return false;
  }

  return (
    <ol className="flex items-center w-full">
      <li key={"0"} className="flex flex-col w-full">
        <div
          className={`mb-5 flex w-full items-center after:content-[''] after:w-2/4 after:border-custom-lightGreen after:border before:content-[''] before:w-2/4`}
        >
          <div
            className={`border-[3px] rounded-full border-custom-lightGreen border-custom-lightGreen`}
          >
            <span
              className={`m-1 flex items-center justify-center w-6 h-6 bg-custom-lightGreen rounded-full lg:h-8 lg:w-8 dark:bg-custom-lightGreen shrink-0`}
            >
              <CheckmarkIcon />
            </span>
          </div>
        </div>

        <div className="text-center sm:min-h-[120px] lg:min-h-[100px] xl:min-h-[70px]">
          <p className="text-[0.938rem] leading-[1.563rem] font-[400] text-custom-lightGreen">
            {category === 3 ? "Order" : "Ticket"} Created
          </p>
          <p className="text-[0.688rem] leading-[0.938rem] font-[400] text-custom-grey">
            Your order has been created
          </p>
        </div>
      </li>
      {orderStatuses.map(
        (orderStatus: TicketSecondaryStatus, index: number) => {
          return (
            <li key={orderStatus.id} className="flex flex-col w-full">
              <div
                className={`mb-5 flex w-full items-center after:content-[''] after:w-2/4 ${
                  orderStatuses.length - 1 !== index &&
                  `${
                    isActive(orderStatus)
                      ? "after:border-custom-lightGreen"
                      : "after:border-custom-silverSand"
                  } after:border`
                } 
                    before:content-[''] before:w-2/4 ${`${
                      isNext(orderStatus) || isActive(orderStatus)
                        ? "before:border-custom-lightGreen"
                        : "before:border-custom-silverSand"
                    } before:border`} 
                    `}
              >
                <div
                  className={`border-[3px] rounded-full ${
                    isActive(orderStatus)
                      ? "border-custom-lightGreen"
                      : isNext(orderStatus)
                      ? "border-custom-orange"
                      : "border-custom-silverSand"
                  }`}
                >
                  <span
                    className={`m-1 flex items-center justify-center w-6 h-6 ${
                      isActive(orderStatus)
                        ? "bg-custom-lightGreen"
                        : nextStatus.id == orderStatus.id
                        ? "bg-custom-orange"
                        : "bg-custom-silverSand"
                    } 
                            rounded-full lg:h-8 lg:w-8 dark:${
                              isActive(orderStatus)
                                ? "bg-custom-lightGreen"
                                : isNext(orderStatus)
                                ? "bg-custom-orange"
                                : "bg-custom-silverSand"
                            } shrink-0`}
                  >
                    <CheckmarkIcon />
                  </span>
                </div>
              </div>

              <div className="text-center sm:min-h-[120px] lg:min-h-[100px] xl:min-h-[70px]">
                <p
                  className={`text-[0.938rem] leading-[1.563rem] font-[400] ${
                    isActive(orderStatus)
                      ? "text-custom-lightGreen"
                      : isNext(orderStatus)
                      ? "text-custom-orange"
                      : "text-custom-silverSand"
                  }`}
                >
                  {orderStatus.name}
                </p>
                <p
                  className={`text-[0.688rem] leading-[1.063rem] font-[400] ${
                    isActive(orderStatus)
                      ? "text-custom-grey"
                      : "text-custom-silverSand"
                  }`}
                >
                  {orderStatus.description}
                </p>
              </div>
            </li>
          );
        }
      )}
    </ol>
  );
};

export default Stepper;
