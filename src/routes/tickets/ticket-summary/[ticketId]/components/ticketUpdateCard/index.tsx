import { TicketUpdate } from '@/types/tickets/types';
import formatDate from '@/utils/utils';
import Image from 'next/image';
import { TICKET_DATE_FORMAT } from '@/utils/constants/dateFormat.constants';
import TicketUpdateDescIframe from './components/ticketUpdateIframe';

function TicketUpdateCard({ ticketUpdate }: { ticketUpdate: TicketUpdate }) {
  const getTicketUpdateTitle = (update: TicketUpdate) => {
    if (update.user) return `${update.user.firstName} ${update.user.lastName}`;
    if (update.administrator) return `${update.administrator.firstName} - ${update.ticketUpdateStatus.name}`;
    return `System - ${update.ticketUpdateStatus.name}`;
  };

  const getTicketUpdateDescription = (update: TicketUpdate) => {
    if (getTicketUpdateTitle(update).includes('Email'))
      return <TicketUpdateDescIframe description={update.description} />;
    return (
      <div
        className="mt-9 text-[0.938rem] font-[400] leading-[1.174rem]"
        dangerouslySetInnerHTML={{ __html: update.description }}
      />
    );
  };

  return (
    <div key={ticketUpdate.id} className="mt-4 flex rounded-lg bg-custom-background p-4">
      <div className="self-start">
        <div className="flex h-[3.876rem] w-[3.876rem] items-center justify-center rounded-full bg-custom-blue">
          <Image src="/svg/account.svg" height={36} width={36} alt="account icon" />
        </div>
      </div>
      <div className="grow overflow-auto p-4">
        <div className="flex items-center justify-between">
          <p className="text-[1.188rem] font-[700] leading-[1.477rem]">{getTicketUpdateTitle(ticketUpdate)}</p>
          <p className="text-[1.125rem] font-[400] leading-[1.361rem]">
            {formatDate(ticketUpdate.created, TICKET_DATE_FORMAT)}
          </p>
        </div>
        {getTicketUpdateDescription(ticketUpdate)}
      </div>
    </div>
  );
}

export default TicketUpdateCard;
