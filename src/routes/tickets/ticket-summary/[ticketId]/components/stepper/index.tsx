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
  return (
    <ol className="flex items-center w-full">
      <li key={"0"} className="flex flex-col w-full">
        <div
          className={`mb-6 flex w-full items-center after:content-[''] after:w-2/4 after:border-[#0FB900] after:border before:content-[''] before:w-2/4`}
        >
          <div
            className={`border-[3px] rounded-full border-[#0FB900] border-[#0FB900]`}
          >
            <span
              className={`m-1 flex items-center justify-center w-6 h-6 bg-[#0FB900] rounded-full lg:h-8 lg:w-8 dark:bg-[#0FB900] shrink-0`}
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="text-center sm:min-h-[120px] lg:min-h-[100px] xl:min-h-[70px]">
          <p className="text-[1.125rem] leading-[1.75rem] font-[400] text-[#0FB900]">
            {category === 3 ? "Order" : "Ticket"} Created
          </p>
          <p className="text-[0.875rem] leading-[1.25rem] font-[400] text-[#575757]">
            Your order has been created
          </p>
        </div>
      </li>
      {orderStatuses.map(
        (orderStatus: TicketSecondaryStatus, index: number) => {
          return (
            <li key={orderStatus.id} className="flex flex-col w-full">
              <div
                className={`mb-6 flex w-full items-center after:content-[''] after:w-2/4 ${
                  orderStatuses.length - 1 !== index &&
                  `${
                    orderStatus.active == true ||
                    orderStatus.order < currentStatus.order
                      ? "after:border-[#0FB900]"
                      : "after:border-[#C2C2C2]"
                  } after:border`
                } 
                    before:content-[''] before:w-2/4 ${`${
                      orderStatus.next === true ||
                      orderStatus.order <= currentStatus.order ||
                      orderStatus.order === 1
                        ? "before:border-[#0FB900]"
                        : "before:border-[#C2C2C2]"
                    } before:border`} 
                    `}
              >
                <div
                  className={`border-[3px] rounded-full ${
                    orderStatus.active == true ||
                    orderStatus.order < currentStatus.order
                      ? "border-[#0FB900]"
                      : orderStatus.next === true ||
                        orderStatus.order <= currentStatus.order
                      ? "border-[#FC762B]"
                      : "border-[#C2C2C2]"
                  }`}
                >
                  <span
                    className={`m-1 flex items-center justify-center w-6 h-6 ${
                      orderStatus.active == true ||
                      orderStatus.order < currentStatus.order
                        ? "bg-[#0FB900]"
                        : nextStatus.id == orderStatus.id
                        ? "bg-[#FC762B]"
                        : "bg-[#C2C2C2]"
                    } 
                            rounded-full lg:h-8 lg:w-8 dark:${
                              orderStatus.active == true ||
                              orderStatus.order < currentStatus.order
                                ? "bg-[#0FB900]"
                                : orderStatus.next === true ||
                                  orderStatus.order <= currentStatus.order
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="text-center sm:min-h-[120px] lg:min-h-[100px] xl:min-h-[70px]">
                <p
                  className={`text-[1.125rem] leading-[1.75rem] font-[400] text-[#0FB900] ${
                    orderStatus.active == true ||
                    orderStatus.order < currentStatus.order
                      ? "text-[#0FB900]"
                      : orderStatus.next === true ||
                        orderStatus.order <= currentStatus.order
                      ? "text-[#FC762B]"
                      : "text-[#C2C2C2]"
                  }`}
                >
                  {orderStatus.name}
                </p>
                <p
                  className={`text-[0.875rem] leading-[1.25rem] font-[400] ${
                    orderStatus.active == true ||
                    orderStatus.order < currentStatus.order
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
