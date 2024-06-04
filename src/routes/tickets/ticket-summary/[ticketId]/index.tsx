"use client";

import Image from "next/image";
import Stepper from "./components/stepper";
import { Button } from "@veroxos/design-system/dist/ui/Button/button";
import {
  useGetTicketSecondaryStatuses,
  useGetTicketSummary,
} from "@/hooks/useTickets";
import React, { useState } from "react";
import { TicketSecondaryStatus, TicketUpdate } from "@/types/tickets/types";
import Skeleton from "@/components/ui/skeleton/skeleton";
import TicketUpdateCard from "./components/ticketUpdateCard";
import TicketDescription from "./components/ticketDescription";
import PostTicketUpdateForm from "./components/postTicketUpdateForm";

const TicketSummary = ({ ticketId }: { ticketId: number }) => {
  const [showAddUpdateForm, setShowAddUpdateForm] = useState(false);

  const { data: getTicketSummaryRes, isLoading: ticketSummaryLoading, refetch : refetchTicketSummary } =
    useGetTicketSummary(ticketId);
  const { data: getTicketSecondaryStatusesRes } =
    useGetTicketSecondaryStatuses();
  
  const renderStepperIfHardwareOrder = () => {
    if (
      getTicketSummaryRes?.data.ticketSecondaryStatusId &&
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
        <div className="mb-13">
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
    <div className="grid grid-auto-flow-column w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg py-7 px-9">
      <h2 className="text-[#000000] text-[1.063rem] leading-[1.326rem] font-[400] mb-7">
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
      <div className="grid grid-auto-flow-column w-full border border-[#D6D6D6] bg-[#FFFFFF] rounded-lg p-6">
        {renderStepperIfHardwareOrder()}
        <div className="grid grid-cols-12 sm:gap-6">
          <div className="xl:col-span-7 order-2 xl:order-1 col-span-12">
            <Button
              disabled={showAddUpdateForm}
              className="bg-[#FC762B] font-[600] leading-[1.023rem] text-[0.813rem] h-[2.563rem]"
              onClick={() => setShowAddUpdateForm(true)}
            >
              Add Update
            </Button>
            {showAddUpdateForm && (
              <PostTicketUpdateForm refetchTicketSummary={refetchTicketSummary} setShowAddUpdateForm={setShowAddUpdateForm} getTicketSummaryRes={getTicketSummaryRes} />
            )}
            {ticketSummaryLoading ? (
              <div className={`w-full mt-5`}>
                <Skeleton variant="paragraph" rows={5} />
              </div>
            ) : (
              getTicketSummaryRes?.data.ticketUpdates?.map(
                (ticketUpdate: TicketUpdate) => {
                  return (
                    <TicketUpdateCard
                      key={ticketUpdate.id}
                      ticketUpdate={ticketUpdate}
                    />
                  );
                }
              )
            )}
          </div>
          <div className="h-fit xl:col-span-5 order-1 xl:order-2 col-span-12 border border-[#D6D6D6] rounded-lg p-6">
            <h3 className="font-[700] text-[1.188rem] leading-[2.438rem] text-[#1D46F3] mb-8">
              {getTicketSummaryRes?.data.ticketSecondaryStatusId &&
              getTicketSummaryRes?.data.workflow?.workflowCategory?.id === 3
                ? "Order"
                : "Ticket"}{" "}
              Details
            </h3>
            {ticketSummaryLoading ? (
              <div className={`w-full mt-6`}>
                <Skeleton variant="paragraph" rows={7} />
              </div>
            ) : (
              <TicketDescription description={getTicketSummaryRes?.data.description}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSummary;
