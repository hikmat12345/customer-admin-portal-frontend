"use client";

import Image from "next/image";
import Stepper from "./components/stepper";
import { Button } from "@veroxos/design-system/dist/ui/Button/button";
import { useGetTicketSummary } from "@/hooks/useTickets";
import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { formatDate } from "@/utils/utils";
import { TicketSecondaryStatus } from "@/types/tickets/types";

const TicketSummary = ({ ticketId }: { ticketId: number }) => {
  const [showAddUpdateForm, setShowAddUpdateForm] = useState(false);
  const { data } = useGetTicketSummary(ticketId);

  const collectTdElements = (node: any, tdElements: any) => {
    if (node.type === "tag" && node.name === "td") {
      tdElements.push(node);
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach((child: any) =>
        collectTdElements(child, tdElements)
      );
    }
  };

  // Function to parse ticket description from HTML
  const parseTicketDescription = (html: any) => {
    const parsedData = [];
    const tdElements: any = [];

    // Parse HTML and collect <td> elements
    ReactHtmlParser(html, {
      transform: (node) => {
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

  const renderStepperIfHardwareOrder = () => {
    if (data?.data.ticketSummary.ticketSecondaryStatus) {
      const ticketSecondaryStauses = data?.data.ticketSecondaryStatuses;
      const defaultStatus = {
        id: 0,
        name: "",
        order: 0,
        description: "",
      };
      let currentStatus: TicketSecondaryStatus = defaultStatus,
        nextStatus: TicketSecondaryStatus = defaultStatus;

      ticketSecondaryStauses.forEach((status: TicketSecondaryStatus) => {
        if (status.id === data.data.ticketSummary.ticketSecondaryStatus)
          currentStatus = status;
        if (status.order + 1 === currentStatus.order + 1) nextStatus = status;
      });

      return (
        <Stepper
          orderStatuses={ticketSecondaryStauses}
          currentStatus={currentStatus}
          nextStatus={nextStatus}
        />
      );
    }
  };

  const getTicketUpdateTitle = (ticketUpdate: any) => {
    if (ticketUpdate.user)
      return `${ticketUpdate.user.firstName} ${ticketUpdate.user.lastName}`;
    else if (ticketUpdate.administrator)
      return `${ticketUpdate.administrator.firstName} - ${ticketUpdate.ticketUpdateStatus.name}`;
    else return `System - ${ticketUpdate.ticketUpdateStatus.name}`;
  };

  const getTicketUpdateDescription = (ticketUpdate: any) => {
    if (getTicketUpdateTitle(ticketUpdate).includes("Email"))
      return (
        <iframe
          width="100%"
          height="350"
          srcDoc={`
                <html>
                <head>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
                </head>
                <body>
                <style>
                    iframe {
                        margin-top: 20px;
                    }
                    body {
                        font-family:Inter;
                        font-weight:400;
                        font-size:18px;
                        line-height:21.78px;
                    }
                </style>
                ${ticketUpdate.description}
                </body></html>`}
        ></iframe>
      );
    else
      return (
        <p className="mt-10 font-[400] text-[18px] leading-[21.78px]">
          {ReactHtmlParser(ticketUpdate.description)}
        </p>
      );
  };

  return (
    <div className="grid grid-auto-flow-column gap-3 w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg p-5">
      <h2 className="text-[#000000] text-[20px] leading-[24.2px] font-[400] mt-5 mb-5">
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
          SUP{data?.data.ticketSummary.id} -{" "}
          {data?.data.ticketSummary.workflow?.name}
        </div>
      </h2>
      <div className="grid grid-auto-flow-column gap-3 w-full border border-[#D6D6D6] bg-[#FFFFFF] rounded-lg p-5">
        {renderStepperIfHardwareOrder()}
        <div className="xl:mt-8 grid grid-cols-12 gap-8 xl:gap-4">
          <div className="xl:col-span-7 order-2 xl:order-1 col-span-12">
            <Button
              disabled={showAddUpdateForm}
              className="bg-[#FC762B]"
              onClick={() => setShowAddUpdateForm(true)}
            >
              Add Update
            </Button>
            {showAddUpdateForm && (
              <div className="rounded-lg p-5 bg-[#F8F8F8] mt-5">
                <div className="flex items-center ">
                  <div className="h-[65px] w-[65px] bg-[#1D46F3] rounded-full flex items-center justify-center">
                    <Image
                      src={"/svg/account.svg"}
                      height={36}
                      width={36}
                      alt="account icon"
                    />
                  </div>
                  <p className="pl-5 font-[700] text-[22px] leading-[26.63px]">
                    Forrest Lundeen
                  </p>
                </div>
                <textarea
                  className="mt-5 w-full rounded-lg p-5"
                  rows={6}
                  placeholder="Type here..."
                />
                <div className="my-5 flex gap-4 h-[44px]">
                  <select className="w-3/5 bg-[#F4F7FE] h-[44px] border border-[#D6D6D6] text-[#575757] font-[400] text-[14px] leading-[16.96px] rounded-lg py-[12px] px-[20px]">
                    <option selected>Update</option>
                  </select>
                  <Button
                    className="w-1/5 h-full border-[#1D46F3] text-[#1D46F3]"
                    variant="outline"
                    onClick={() => setShowAddUpdateForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="w-1/5 h-full">Submit</Button>
                </div>
              </div>
            )}
            {data?.data.ticketSummary.ticketUpdates.map((ticketUpdate: any) => {
              return (
                <div className="flex rounded-lg p-5 bg-[#F8F8F8] mt-5">
                  <div className="self-start">
                    <div className="h-[65px] w-[65px] bg-[#1D46F3] rounded-full flex items-center justify-center">
                      <Image
                        src={"/svg/account.svg"}
                        height={36}
                        width={36}
                        alt="account icon"
                      />
                    </div>
                  </div>
                  <div className="p-5 grow overflow-auto">
                    <div className="flex justify-between items-center">
                      <p className="font-[700] text-[22px] leading-[26.63px]">
                        {getTicketUpdateTitle(ticketUpdate)}
                      </p>
                      <p className="font-[400] text-[18px] leading-[21.78px]">
                        {formatDate(new Date(ticketUpdate.createdAt))}
                      </p>
                    </div>
                    {getTicketUpdateDescription(ticketUpdate)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-fit xl:col-span-5 order-1 xl:order-2 col-span-12 border border-[#D6D6D6] rounded-lg p-5">
            <h3 className="font-[700] text-[22px] leading-[42px] text-[#1D46F3] mb-5">
              Order Details
            </h3>
            {parseTicketDescription(data?.data.ticketSummary.description).map(
              (element: any) => {
                return (
                  <div className="flex text-[16px] leading-[19.36px] font-[600] mb-5">
                    <p className="w-3/5">{element.label}</p>
                    <p className="ml-2 w-2/5 font-[400] text-[#575757]">
                      {element.value}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSummary;
