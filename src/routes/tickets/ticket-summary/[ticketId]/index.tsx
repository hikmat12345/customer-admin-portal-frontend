'use client';

import Image from 'next/image';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { useGetTicketSecondaryStatuses, useGetTicketSummary } from '@/hooks/useTickets';
import React, { useState } from 'react';
import { TicketSecondaryStatus, TicketUpdate } from '@/types/tickets/types';
import Skeleton from '@/components/ui/skeleton/skeleton';
import { TICKETS_STATUS_COLOR_LIST } from '@/utils/constants/statusList.constants';
import { ORDER_UPGRADE_WORKFLOW_CATEGORY_ID } from '@/utils/constants/constants';
import TicketUpdateCard from './components/ticketUpdateCard';
import TicketDescription from './components/ticketDescription';
import PostTicketUpdateForm from './components/postTicketUpdateForm';
import TicketHeader from './components/ticketHeader';
import Stepper from './components/stepper';

function TicketSummary({ ticketId }: { ticketId: number }) {
  const [showAddUpdateForm, setShowAddUpdateForm] = useState(false);

  const {
    data: getTicketSummaryRes,
    isLoading: ticketSummaryLoading,
    refetch: refetchTicketSummary,
  } = useGetTicketSummary(ticketId);
  const { data: getTicketSecondaryStatusesRes } = useGetTicketSecondaryStatuses();

  const getCategoryLabel = () => {
    if (getTicketSummaryRes?.data.workflow?.workflowCategory?.id === ORDER_UPGRADE_WORKFLOW_CATEGORY_ID) return 'order';
    return 'ticket';
  };

  const getUserTicketUpdate = () => ({
    id: 0,
    user: getTicketSummaryRes?.data.user,
    description: `${getTicketSummaryRes?.data.user?.firstName} ${
      getTicketSummaryRes?.data.user?.lastName
    } placed a new ${getCategoryLabel()}`,
    created: getTicketSummaryRes?.data.created,
    ticketUpdateStatus: { name: '' },
  });

  function renderStepperIfHardwareOrder() {
    if (getTicketSummaryRes?.data.ticketSecondaryStatusId && getTicketSecondaryStatusesRes?.data.length > 0) {
      const ticketSecondaryStauses = getTicketSecondaryStatusesRes?.data;
      const defaultStatus = {
        id: 0,
        name: '',
        order: 0,
        description: '',
      };
      let currentStatus: TicketSecondaryStatus = defaultStatus;
      let nextStatus: TicketSecondaryStatus = defaultStatus;

      const activeStatus = ticketSecondaryStauses.find(
        (status: TicketSecondaryStatus) => status.id === getTicketSummaryRes?.data.ticketSecondaryStatusId,
      );

      if (getTicketSummaryRes?.data.secondaryStatusStage) {
        currentStatus = activeStatus;
        if (activeStatus.id !== ticketSecondaryStauses[ticketSecondaryStauses.length - 1].id)
          nextStatus = ticketSecondaryStauses.find(
            (status: TicketSecondaryStatus) => status.order === activeStatus.order + 1,
          );
      } else {
        if (activeStatus.id !== ticketSecondaryStauses[0].id)
          currentStatus = ticketSecondaryStauses.find(
            (status: TicketSecondaryStatus) => status.order === activeStatus.order - 1,
          );
        nextStatus = activeStatus;
      }

      return (
        <div className="mb-13">
          <Stepper
            orderStatuses={ticketSecondaryStauses}
            currentStatus={currentStatus}
            nextStatus={nextStatus}
            category={getTicketSummaryRes?.data?.workflow?.workflowCategory?.id}
          />
        </div>
      );
    }

    return null; // Explicitly return null if the condition is not met
  }

  return (
    <div className="grid-auto-flow-column grid w-full rounded-lg border border-custom-lightGray bg-custom-white px-9 py-7">
      <h2 className="mb-7 flex items-center justify-between text-[1.063rem] font-[400] leading-[1.326rem] text-custom-black">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 text-custom-blue">
            <Image src="/svg/receipt.svg" width={24} height={24} alt="receipt icon" />
            <span>Veroxos REF</span>
          </span>
          {ticketSummaryLoading ? (
            <div className="w-[15rem]">
              <Skeleton variant="paragraph" rows={1} />
            </div>
          ) : (
            <span>
              SUP{getTicketSummaryRes?.data.id} - {getTicketSummaryRes?.data.workflow?.name}
            </span>
          )}
        </div>
        <div className="flex text-[0.813rem]">
          <span className="mr-2 text-custom-orange">Status:</span>
          {ticketSummaryLoading ? (
            <div className="w-[10rem]">
              <Skeleton variant="paragraph" rows={1} />
            </div>
          ) : (
            <span className={`text-[${TICKETS_STATUS_COLOR_LIST[getTicketSummaryRes?.data.ticketStatus?.id]}]`}>
              {getTicketSummaryRes?.data.ticketStatus?.name}
            </span>
          )}
        </div>
      </h2>
      <div className="grid-auto-flow-column grid w-full rounded-lg border border-custom-aluminum bg-custom-white p-6">
        {renderStepperIfHardwareOrder()}
        <TicketHeader ticketSummary={getTicketSummaryRes?.data} ticketSummaryLoading={ticketSummaryLoading} />
        <div className="mt-5 grid grid-cols-12 sm:gap-6">
          <div className="order-2 col-span-12 xl:order-1 xl:col-span-7">
            <Button
              disabled={showAddUpdateForm}
              className="h-[2.563rem] bg-custom-orange text-[0.813rem] font-[600] leading-[1.023rem] text-custom-white"
              onClick={() => setShowAddUpdateForm(true)}
            >
              Add Update
            </Button>
            {showAddUpdateForm && (
              <PostTicketUpdateForm
                refetchTicketSummary={refetchTicketSummary}
                setShowAddUpdateForm={setShowAddUpdateForm}
                getTicketSummaryRes={getTicketSummaryRes}
              />
            )}
            {ticketSummaryLoading ? (
              <div className="mt-5 w-full">
                <Skeleton variant="paragraph" rows={5} />
              </div>
            ) : (
              <>
                {getTicketSummaryRes?.data.ticketUpdates?.map((ticketUpdate: TicketUpdate) => (
                  <TicketUpdateCard key={ticketUpdate.id} ticketUpdate={ticketUpdate} />
                ))}
                <TicketUpdateCard key={0} ticketUpdate={getUserTicketUpdate()} />
              </>
            )}
          </div>
          <div className="order-1 col-span-12 h-fit max-h-[34.375rem] overflow-auto rounded-lg border border-custom-aluminum p-6 xl:order-2 xl:col-span-5">
            {ticketSummaryLoading ? (
              <>
                <div className="w-[11rem]">
                  <Skeleton variant="paragraph" rows={1} />
                </div>
                <div className="mt-6 w-full">
                  <Skeleton variant="paragraph" rows={7} />
                </div>
              </>
            ) : (
              <>
                <h3 className="mb-8 text-[1.188rem] font-[700] capitalize leading-[2.438rem] text-custom-blue">
                  {`${getCategoryLabel()} Details`}
                </h3>
                <TicketDescription description={getTicketSummaryRes?.data.description} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketSummary;
