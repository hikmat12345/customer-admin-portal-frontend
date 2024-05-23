import { TicketSecondaryStatus } from "@/types/tickets/types";
import React from "react";

const Stepper = ({
  orderStatuses,
  currentStatus,
  nextStatus,
}: {
  orderStatuses: TicketSecondaryStatus[];
  nextStatus: TicketSecondaryStatus;
  currentStatus: TicketSecondaryStatus;
}) => {
  return (
    <ol className="flex items-center w-full">
      {orderStatuses.map(
        (orderStatus: TicketSecondaryStatus, index: number) => {
          return (
            <li
              key={orderStatus.id}
              className="flex flex-col w-full h-[150px] justify-between"
            >
              <div
                className={`flex w-full items-center after:content-[''] after:w-2/4 after:h-1 ${
                  orderStatuses.length - 1 !== index &&
                  `after:border-b ${
                    currentStatus.id == orderStatus.id
                      ? "after:border-[#0FB900]"
                      : "after:border-[#C2C2C2]"
                  } after:border-4 after:inline-block`
                } 
                    before:content-[''] before:w-2/4 before:h-1 ${
                      orderStatus.order !== 1 &&
                      `before:border-b ${
                        orderStatus.id === nextStatus.id
                          ? "before:border-[#0FB900]"
                          : "before:border-[#C2C2C2]"
                      } before:border-4 before:inline-block`
                    } 
                    `}
              >
                <div
                  className={`border-4 rounded-full ${
                    currentStatus.id == orderStatus.id
                      ? "border-[#0FB900]"
                      : nextStatus.id == orderStatus.id
                      ? "border-[#FC762B]"
                      : "border-[#C2C2C2]"
                  }`}
                >
                  <span
                    className={`m-1 flex items-center justify-center w-6 h-6 ${
                      currentStatus.id == orderStatus.id
                        ? "bg-[#0FB900]"
                        : nextStatus.id == orderStatus.id
                        ? "bg-[#FC762B]"
                        : "bg-[#C2C2C2]"
                    } 
                            rounded-full lg:h-8 lg:w-8 dark:${
                              currentStatus.id == orderStatus.id
                                ? "bg-[#0FB900]"
                                : nextStatus.id == orderStatus.id
                                ? "bg-[#FC762B]"
                                : "bg-[#C2C2C2]"
                            } shrink-0`}
                  >
                    <svg
                      className="w-3.5 h-3.5 text-white lg:w-4 lg:h-4 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[18px] leading-[28px] font-[400] text-[#0FB900]">
                  {orderStatus.name}
                </p>
                <p className="text-[14px] leading-[20px] font-[400] text-[#575757]">
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
