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
    if(orderStatus.active == true || orderStatus.order < currentStatus.order)
      return true

    return false   
  }

  const isNext = (orderStatus : TicketSecondaryStatus) => {
    if(orderStatus.next === true || orderStatus.order <= currentStatus.order)
      return true

    return false;
  }

  return (
    <ol className="flex items-center w-full">
      <li key={"0"} className="flex flex-col w-full">
        <div
          className={`mb-5 flex w-full items-center after:content-[''] after:w-2/4 after:border-[#0FB900] after:border before:content-[''] before:w-2/4`}
        >
          <div
            className={`border-[3px] rounded-full border-[#0FB900] border-[#0FB900]`}
          >
            <span
              className={`m-1 flex items-center justify-center w-6 h-6 bg-[#0FB900] rounded-full lg:h-8 lg:w-8 dark:bg-[#0FB900] shrink-0`}
            >
              <CheckmarkIcon />
            </span>
          </div>
        </div>

        <div className="text-center sm:min-h-[120px] lg:min-h-[100px] xl:min-h-[70px]">
          <p className="text-[0.938rem] leading-[1.563rem] font-[400] text-[#0FB900]">
            {category === 3 ? "Order" : "Ticket"} Created
          </p>
          <p className="text-[0.688rem] leading-[0.938rem] font-[400] text-[#575757]">
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
                      ? "after:border-[#0FB900]"
                      : "after:border-[#C2C2C2]"
                  } after:border`
                } 
                    before:content-[''] before:w-2/4 ${`${
                      isNext(orderStatus) ||
                      orderStatus.order === 1
                        ? "before:border-[#0FB900]"
                        : "before:border-[#C2C2C2]"
                    } before:border`} 
                    `}
              >
                <div
                  className={`border-[3px] rounded-full ${
                    isActive(orderStatus)
                      ? "border-[#0FB900]"
                      : isNext(orderStatus)
                      ? "border-[#FC762B]"
                      : "border-[#C2C2C2]"
                  }`}
                >
                  <span
                    className={`m-1 flex items-center justify-center w-6 h-6 ${
                      isActive(orderStatus)
                        ? "bg-[#0FB900]"
                        : nextStatus.id == orderStatus.id
                        ? "bg-[#FC762B]"
                        : "bg-[#C2C2C2]"
                    } 
                            rounded-full lg:h-8 lg:w-8 dark:${
                              isActive(orderStatus)
                                ? "bg-[#0FB900]"
                                : isNext(orderStatus)
                                ? "bg-[#FC762B]"
                                : "bg-[#C2C2C2]"
                            } shrink-0`}
                  >
                    <CheckmarkIcon />
                  </span>
                </div>
              </div>

              <div className="text-center sm:min-h-[120px] lg:min-h-[100px] xl:min-h-[70px]">
                <p
                  className={`text-[0.938rem] leading-[1.563rem] font-[400] text-[#0FB900] ${
                    isActive(orderStatus)
                      ? "text-[#0FB900]"
                      : isNext(orderStatus)
                      ? "text-[#FC762B]"
                      : "text-[#C2C2C2]"
                  }`}
                >
                  {orderStatus.name}
                </p>
                <p
                  className={`text-[0.688rem] leading-[1.063rem] font-[400] ${
                    isActive(orderStatus)
                      ? "text-[#575757]"
                      : "text-[#C2C2C2]"
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
