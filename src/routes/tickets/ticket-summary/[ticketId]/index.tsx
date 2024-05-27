"use client";

import Image from "next/image";
import Stepper from "./components/stepper";
import { Button } from "@veroxos/design-system/dist/ui/Button/button";
import {
  useGetLoggedInUserDetails,
  useGetTicketSecondaryStatuses,
  useGetTicketSummary,
  useGetTicketUpdateStatuses,
  usePostTicketUpdate,
} from "@/hooks/useTickets";
import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import {
  ReactHtmlParserNode,
  TicketSecondaryStatus,
  TicketUpdate,
} from "@/types/tickets/types";
import Skeleton from "@/components/ui/skeleton/skeleton";
import TicketUpdateCard from "./components/ticketUpdateCard";

const TicketSummary = ({ ticketId }: { ticketId: number }) => {
  const [showAddUpdateForm, setShowAddUpdateForm] = useState(false);

  const { data: getTicketSummaryRes, isLoading: ticketSummaryLoading } =
    useGetTicketSummary(ticketId);
  const { data: getTicketSecondaryStatusesRes } =
    useGetTicketSecondaryStatuses();
  const { data: getTicketUpdateStatusesRes } = useGetTicketUpdateStatuses();
  const { data: getLoggedInUserDetailsRes } = useGetLoggedInUserDetails();

  const postTicketUpdateMutation = usePostTicketUpdate();

  const collectTdElements = (
    node: ReactHtmlParserNode,
    tdElements: ReactHtmlParserNode[]
  ) => {
    if (node.type === "tag" && node.name === "td") {
      tdElements.push(node);
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach((child: ReactHtmlParserNode) =>
        collectTdElements(child, tdElements)
      );
    }
  };

  // Function to parse ticket description from HTML
  const parseTicketDescription = (html: string) => {
    const parsedData = [];
    const tdElements: ReactHtmlParserNode[] = [];

    // Parse HTML and collect <td> elements
    ReactHtmlParser(html, {
      transform: (node: any) => {
        collectTdElements(node, tdElements);
        return node;
      },
    });

    // Process the <td> elements in pairs
    for (let i = 0; i < tdElements.length; i += 2) {
      const keyElement = tdElements[i];
      const valueElement = tdElements[i + 1];

      if (keyElement && valueElement) {
        const key = keyElement.children[0]?.data.trim();
        const value = valueElement.children[0]?.data.trim();
        parsedData.push({ label: key, value });
      }
    }

    return parsedData;
  };

  const handlePostTicketUpdate = (e: any) => {
    e.preventDefault();
    let {
      description: { value: description },
      ticketUpdateStatus: { value: ticketUpdateStatusId },
    } = e.target;

    const ticketUpdate = {
      ticketId: getTicketSummaryRes?.data.id,
      workflowId: getTicketSummaryRes?.data.workflow?.id,
      ticketUpdateStatusId: parseInt(ticketUpdateStatusId),
      description: description.replace(/(\r\n|\n|\r)/g, "<br/>"),
    };

    postTicketUpdateMutation.mutate(ticketUpdate);
  };

  const renderStepperIfHardwareOrder = () => {
    if (
      getTicketSummaryRes?.data.workflow?.workflowCategory?.id === 3 &&
      getTicketSecondaryStatusesRes?.data.length > 0
    ) {
      const ticketSecondaryStauses = getTicketSecondaryStatusesRes?.data;
      const defaultStatus = {
        id: 0,
        name: "",
        order: 0,
        description: "",
      };
      let currentStatus: TicketSecondaryStatus = defaultStatus,
        nextStatus: TicketSecondaryStatus = defaultStatus;

      const statuses = ticketSecondaryStauses.map(
        (status: TicketSecondaryStatus) => {
          // find the current status of the order
          if (status.id === getTicketSummaryRes?.data.ticketSecondaryStatusId) {
            currentStatus = status;
            status.active = true;
          }

          // find the next status of the order
          if (status.order === currentStatus.order + 1) {
            nextStatus = status;
            status.next = true;
          }

          return status;
        }
      );

      return (
        <div className="mb-14">
          <Stepper
            orderStatuses={statuses}
            currentStatus={currentStatus}
            nextStatus={nextStatus}
            category={getTicketSummaryRes?.data?.workflow?.workflowCategory?.id}
          />
        </div>
      );
    }
  };

  return (
    <div className="grid grid-auto-flow-column w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg py-8 px-10">
      <h2 className="text-[#000000] text-[1.25rem] leading-[1.513rem] font-[400] mb-8">
        <div className="flex items-center gap-5">
          <span className="flex gap-2 text-[#1D46F3]">
            <Image
              src="/svg/receipt.svg"
              width={24}
              height={24}
              alt="receipt icon"
            />
            Ticket no.
          </span>
          SUP
          {ticketSummaryLoading ? (
            <div className={`w-[15rem]`}>
              <Skeleton variant="paragraph" rows={1} />
            </div>
          ) : (
            `${getTicketSummaryRes?.data.id} - ${getTicketSummaryRes?.data.workflow?.name}`
          )}
        </div>
      </h2>
      <div className="grid grid-auto-flow-column w-full border border-[#D6D6D6] bg-[#FFFFFF] rounded-lg p-7">
        {renderStepperIfHardwareOrder()}
        <div className="grid grid-cols-12 sm:gap-6">
          <div className="xl:col-span-7 order-2 xl:order-1 col-span-12">
            <Button
              disabled={showAddUpdateForm}
              className="bg-[#FC762B] font-[600] leading-[1.21rem] text-[1rem] h-[2.75rem]"
              onClick={() => setShowAddUpdateForm(true)}
            >
              Add Update
            </Button>
            {showAddUpdateForm && (
              <form onSubmit={handlePostTicketUpdate}>
                <div className="rounded-lg p-5 bg-[#F8F8F8] mt-5">
                  <div className="flex items-center ">
                    <div className="h-[4.063rem] w-[4.063rem] bg-[#1D46F3] rounded-full flex items-center justify-center">
                      <Image
                        src={"/svg/account.svg"}
                        height={36}
                        width={36}
                        alt="account icon"
                      />
                    </div>
                    <p className="pl-5 font-[700] text-[1.375rem] leading-[1.664rem]">
                      {`${getLoggedInUserDetailsRes?.data.firstName} ${getLoggedInUserDetailsRes?.data.lastName}`}
                    </p>
                  </div>
                  <textarea
                    name="description"
                    required
                    className="mt-5 w-full rounded-lg p-5 focus:outline-none focus-visible:outline-none"
                    rows={6}
                    placeholder="Type here..."
                  />
                  <div className="my-5 flex gap-4 h-[2.75rem]">
                    <select
                      required
                      name="ticketUpdateStatus"
                      className="w-3/5 bg-[#F4F7FE] h-[2.75rem] border border-[#D6D6D6] text-[#575757] font-[400] text-[0.875rem] leading-[1.06rem] rounded-lg py-[0.75rem] px-[1.25rem] focus:outline-none"
                    >
                      {getTicketUpdateStatusesRes?.data.map(
                        (ticketUpdateStatus: { id: number; name: string }) => (
                          <option
                            key={ticketUpdateStatus.id}
                            value={ticketUpdateStatus.id}
                          >
                            {ticketUpdateStatus.name}
                          </option>
                        )
                      )}
                    </select>
                    <Button
                      className="w-1/5 h-full font-[600] leading-[1.21rem] text-[1rem] border-[#1D46F3] text-[#1D46F3] hover:text-[#1D46F3]"
                      variant="outline"
                      onClick={() => setShowAddUpdateForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="w-1/5 h-full font-[600] leading-[1.21rem] text-[1rem]"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            )}
            {ticketSummaryLoading ? (
              <div className={`w-full mt-6`}>
                <Skeleton variant="paragraph" rows={5} />
              </div>
            ) : (
              getTicketSummaryRes?.data.ticketUpdates?.map(
                (ticketUpdate: TicketUpdate) => {
                  return <TicketUpdateCard key={ticketUpdate.id} ticketUpdate={ticketUpdate} />;
                }
              )
            )}
          </div>
          <div className="h-fit xl:col-span-5 order-1 xl:order-2 col-span-12 border border-[#D6D6D6] rounded-lg p-7">
            <h3 className="font-[700] text-[1.375rem] leading-[2.625rem] text-[#1D46F3] mb-9">
              {getTicketSummaryRes?.data.workflow?.workflowCategory?.id === 3
                ? "Order"
                : "Ticket"}{" "}
              Details
            </h3>
            {ticketSummaryLoading ? (
              <div className={`w-full mt-6`}>
                <Skeleton variant="paragraph" rows={7} />
              </div>
            ) : (
              parseTicketDescription(getTicketSummaryRes?.data.description).map(
                (
                  element: { label: string; value: string },
                  index: number,
                  array: { label: string; value: string }[]
                ) => {
                  return (
                    <div
                      key={element.label}
                      className={`flex items-center text-[1rem] leading-[1.21rem] font-[600] ${
                        index + 1 < array.length ? "mb-7" : ""
                      }`}
                    >
                      <p className="w-3/5">{element.label}</p>
                      <p className="ml-2 w-2/5 font-[400] text-[#575757]">
                        {element.value}
                      </p>
                    </div>
                  );
                }
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSummary;
