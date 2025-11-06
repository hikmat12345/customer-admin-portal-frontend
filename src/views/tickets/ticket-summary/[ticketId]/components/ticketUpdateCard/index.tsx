import { TicketUpdate } from '@/types/tickets/types';
import { convertToTimeZone } from '@/utils/utils';
import Image from 'next/image';
import TicketUpdateDescIframe from './components/ticketUpdateIframe';
import { TICKET_DATE_FORMAT } from '@/utils/constants/dateFormat.constants';
import useUserStore from '@/stores/useUserStore';
import { useGetTicketUpdateAttachment } from '@/hooks/useTickets';
import toast from 'react-hot-toast';

const TicketUpdateCard = ({ ticketUpdate }: { ticketUpdate: TicketUpdate }) => {
  const { loggedInUser } = useUserStore((state: any) => ({ loggedInUser: state.user }));
  const { mutate: getTicketUpdateAttachment, isPending } = useGetTicketUpdateAttachment({
    onSuccess: (data) => {
      toast.success('Attachment downloaded successfully.');
    },
    onError: (error) => {
      console.error('Error:', error);
      toast.error('Failed to download attachment.');
    },
    onMutate: () => {
      toast.loading('Downloading...', { duration: 1000 });
    },
  });

  const getTicketUpdateTitle = (ticketUpdate: TicketUpdate) => {
    if (ticketUpdate.user) return `${ticketUpdate.user.firstName} ${ticketUpdate.user.lastName}`;
    else if (ticketUpdate.administrator)
      return `${ticketUpdate.administrator.firstName} - ${ticketUpdate.ticketUpdateStatus.name}`;
    else return `System - ${ticketUpdate.ticketUpdateStatus.name}`;
  };

  const getTicketUpdateIcon = (ticketUpdate: TicketUpdate) => {
    let src, alt;
    if (ticketUpdate?.ticketUpdateAttachment && !ticketUpdate?.description) {
      src = '/svg/attachment.svg';
      alt = 'attachment icon';
    } else {
      const title = getTicketUpdateTitle(ticketUpdate);
      src = '/svg/account.svg';
      alt = 'account icon';
      if (title.includes('Email')) {
        src = '/svg/emailUpdate.svg';
        alt = 'email icon';
      } else if (title.includes('System')) {
        src = '/svg/systemUpdate.svg';
        alt = 'veroxos system icon';
      }
    }

    return <Image src={src} height={36} width={36} alt={alt} />;
  };

  const getTicketUpdateDescription = (ticketUpdate: TicketUpdate) => {
    if (ticketUpdate?.ticketUpdateAttachment && !ticketUpdate?.description) {
      return (
        <div
          onClick={() =>
            getTicketUpdateAttachment({
              ticketUpdateId: ticketUpdate.id,
              fileName: ticketUpdate?.ticketUpdateAttachment?.fileName,
            })
          }
          className="mt-9 flex cursor-pointer items-center"
        >
          <Image src={'/svg/blueBgDownload.svg'} height={24} width={24} alt="download icon" />
          <span className="pl-4 text-[0.813rem] font-[500] leading-[1.023rem] text-custom-dryBlue">
            {ticketUpdate?.ticketUpdateAttachment?.fileName}
          </span>
        </div>
      );
    } else {
      if (getTicketUpdateTitle(ticketUpdate).includes('Email'))
        return <TicketUpdateDescIframe description={ticketUpdate.description} />;
      else
        return (
          <div
            className="mt-9 text-[0.938rem] font-[400] leading-[1.174rem]"
            dangerouslySetInnerHTML={{ __html: ticketUpdate.description }}
          />
        );
    }
  };

  return (
    <div key={ticketUpdate.id} className="mt-4 flex rounded-lg bg-custom-background p-4">
      <div className="self-start">
        <div className="flex h-[3.876rem] w-[3.876rem] items-center justify-center rounded-full bg-custom-blue">
          {getTicketUpdateIcon(ticketUpdate)}
        </div>
      </div>
      <div className="grow overflow-auto p-4">
        <div className="flex items-center justify-between">
          <p className="text-[1.188rem] font-[700] leading-[1.477rem]">{getTicketUpdateTitle(ticketUpdate)}</p>
          <p className="text-[0.938rem] font-[400] leading-[1.361rem]">
            {convertToTimeZone(ticketUpdate?.created, TICKET_DATE_FORMAT, loggedInUser?.timezone?.name)}
          </p>
        </div>
        {getTicketUpdateDescription(ticketUpdate)}
      </div>
    </div>
  );
};

export default TicketUpdateCard;
