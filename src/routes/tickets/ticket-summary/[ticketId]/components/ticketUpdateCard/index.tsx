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
        <p className="mt-9 font-[400] text-[0.938rem] leading-[1.174rem]">
          {<div dangerouslySetInnerHTML={{__html : ticketUpdate.description}} />}
        </p>
      );
  };

  return (
    <div
      key={ticketUpdate.id}
      className="flex rounded-lg p-4 bg-[#F4F7FE] mt-4"
    >
      <div className="self-start">
        <div className="h-[3.876rem] w-[3.876rem] bg-[#1D46F3] rounded-full flex items-center justify-center">
          <Image
            src={"/svg/account.svg"}
            height={36}
            width={36}
            alt="account icon"
          />
        </div>
      </div>
      <div className="p-4 grow overflow-auto">
        <div className="flex justify-between items-center">
          <p className="font-[700] text-[1.188rem] leading-[1.477rem]">
            {getTicketUpdateTitle(ticketUpdate)}
          </p>
          <p className="font-[400] text-[0.938rem] leading-[1.174rem]">
            {formatDate(new Date(ticketUpdate.created))}
          </p>
        </div>
        {getTicketUpdateDescription(ticketUpdate)}
      </div>
    </div>
  );
};

export default TicketUpdateCard;
