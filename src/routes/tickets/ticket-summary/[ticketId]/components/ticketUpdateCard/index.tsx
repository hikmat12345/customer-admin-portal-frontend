import { TicketUpdate } from "@/types/tickets/types";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import TicketUpdateDescIframe from "./components/ticketUpdateIframe";

const TicketUpdateCard = ({ ticketUpdate }: { ticketUpdate: TicketUpdate }) => {
  const getTicketUpdateTitle = (ticketUpdate: TicketUpdate) => {
    if (ticketUpdate.user)
      return `${ticketUpdate.user.firstName} ${ticketUpdate.user.lastName}`;
    else if (ticketUpdate.administrator)
      return `${ticketUpdate.administrator.firstName} - ${ticketUpdate.ticketUpdateStatus.name}`;
    else return `System - ${ticketUpdate.ticketUpdateStatus.name}`;
  };

  const getTicketUpdateDescription = (ticketUpdate: TicketUpdate) => {
    if (getTicketUpdateTitle(ticketUpdate).includes("Email"))
      return <TicketUpdateDescIframe description={ticketUpdate.description}/>
    else
      return (
        <p className="mt-10 font-[400] text-[1.125rem] leading-[1.361rem]">
          {<div dangerouslySetInnerHTML={{__html : ticketUpdate.description}} />}
        </p>
      );
  };

  return (
    <div
      key={ticketUpdate.id}
      className="flex rounded-lg p-5 bg-[#F8F8F8] mt-5"
    >
      <div className="self-start">
        <div className="h-[4.063rem] w-[4.063rem] bg-[#1D46F3] rounded-full flex items-center justify-center">
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
          <p className="font-[700] text-[1.375rem] leading-[1.664rem]">
            {getTicketUpdateTitle(ticketUpdate)}
          </p>
          <p className="font-[400] text-[1.125rem] leading-[1.361rem]">
            {formatDate(new Date(ticketUpdate.created))}
          </p>
        </div>
        {getTicketUpdateDescription(ticketUpdate)}
      </div>
    </div>
  );
};

export default TicketUpdateCard;
