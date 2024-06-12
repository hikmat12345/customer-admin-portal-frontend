import { TicketUpdate } from "@/types/tickets/types";
import { convertToTimeZone } from "@/utils/utils";
import Image from "next/image";
import TicketUpdateDescIframe from "./components/ticketUpdateIframe";
import { TICKET_DATE_FORMAT } from "@/utils/constants/dateFormat.constants";
import useUserStore from "@/stores/useUserStore";

const TicketUpdateCard = ({ ticketUpdate }: { ticketUpdate: TicketUpdate }) => {
  const loggedInUser = useUserStore((state: any) => state.user)

  const getTicketUpdateTitle = (ticketUpdate: TicketUpdate) => {
    if (ticketUpdate.user)
      return `${ticketUpdate.user.firstName} ${ticketUpdate.user.lastName}`;
    else if (ticketUpdate.administrator)
      return `${ticketUpdate.administrator.firstName} - ${ticketUpdate.ticketUpdateStatus.name}`;
    else return `System - ${ticketUpdate.ticketUpdateStatus.name}`;
  };

  const getTicketUpdateIcon = (ticketUpdate : TicketUpdate) => {
    const title  = getTicketUpdateTitle(ticketUpdate);
    let src='/svg/account.svg';
    let alt='account icon'
    if(title.includes('Email')){
      src = '/svg/emailUpdate.svg'
      alt = 'email icon'
    }
    else if(title.includes('System')){
      src = '/svg/systemUpdate.svg'
      alt = 'veroxos system icon'
    }

    return <Image
    src={src}
    height={36}
    width={36}
    alt={alt}
  />
  }

  const getTicketUpdateDescription = (ticketUpdate: TicketUpdate) => {
    if (getTicketUpdateTitle(ticketUpdate).includes("Email"))
      return <TicketUpdateDescIframe description={ticketUpdate.description} />;
    else
      return (
        <div
          className="mt-9 font-[400] text-[0.938rem] leading-[1.174rem]"
          dangerouslySetInnerHTML={{ __html: ticketUpdate.description }}
        />
      );
  };

  return (
    <div
      key={ticketUpdate.id}
      className="flex rounded-lg p-4 bg-custom-background mt-4"
    >
      <div className="self-start">
        <div className="h-[3.876rem] w-[3.876rem] bg-custom-blue rounded-full flex items-center justify-center">
          {getTicketUpdateIcon(ticketUpdate)}
        </div>
      </div>
      <div className="p-4 grow overflow-auto">
        <div className="flex justify-between items-center">
          <p className="font-[700] text-[1.188rem] leading-[1.477rem]">
            {getTicketUpdateTitle(ticketUpdate)}
          </p>
          <p className="font-[400] text-[0.938rem] leading-[1.361rem]">
            {convertToTimeZone(loggedInUser?.timezone?.name, new Date(ticketUpdate.created), TICKET_DATE_FORMAT)}
          </p>
        </div>
        {getTicketUpdateDescription(ticketUpdate)}
      </div>
    </div>
  );
};

export default TicketUpdateCard;
