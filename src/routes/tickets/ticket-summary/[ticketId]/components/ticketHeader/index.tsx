/* eslint-disable */
import { TICKET_DATE_FORMAT } from '@/utils/constants/dateFormat.constants';
import { PRIORITY_COLOR_LIST, PRIORITY_LIST } from '@/utils/constants/statusList.constants';
import formatDate from '@/utils/utils';
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';

function TicketHeader({ ticketSummary, ticketSummaryLoading }: any) {
  function HeaderLabel({ label }: { label: string }) {
    return <span className="w-1/4 text-[0.813rem] font-[600] leading-[1.023rem]">{label}</span>;
  }

  function HeaderValue({ value }: { value: string }) {
    return (
      <span className="pl-2 text-[0.813rem] font-[400] leading-[1.023rem] text-[#575757] sm:w-2/4 xl:w-3/4">
        {ticketSummaryLoading ? <Skeleton variant="paragraph" rows={1} /> : ticketSummary && value ? value : '-'}
      </span>
    );
  }

  return (
    <div className="grid w-full gap-2 rounded-lg border border-custom-aluminum bg-custom-white p-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:px-6 2xl:px-12">
      <div className="items-centerw-full flex lg:p-2 xl:p-4">
        <HeaderLabel label="Logged by" />
        <HeaderValue value={`${ticketSummary?.user?.firstName} ${ticketSummary?.user?.lastName}`} />
      </div>
      <div className="flex items-center lg:p-2 xl:p-4">
        <HeaderLabel label="Priority" />
        <div className="pl-2 sm:w-2/4 xl:w-3/4">
          {ticketSummaryLoading ? (
            <Skeleton variant="paragraph" rows={1} />
          ) : (
            <div
              className={`flex h-[2.313rem] w-[2.313rem] items-center justify-center rounded-full text-[0.813rem] font-[400] leading-[1.023rem] text-[#575757] text-custom-white bg-[${
                PRIORITY_COLOR_LIST[ticketSummary?.priority]
              }]`}
            >
              {PRIORITY_LIST[ticketSummary?.priority]}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center lg:p-2 xl:p-4">
        <HeaderLabel label="Behalf of" />
        <HeaderValue value={`${ticketSummary?.onBehalfOf}`} />
      </div>
      <div className="flex items-center lg:p-2 xl:p-4">
        <HeaderLabel label="Client Ref no." />
        <HeaderValue value={`${ticketSummary?.clientReferenceNo}`} />
      </div>
      <div className="flex items-center lg:p-2 xl:p-4">
        <HeaderLabel label="Created" />
        <HeaderValue value={`${formatDate(ticketSummary?.created, TICKET_DATE_FORMAT)}`} />
      </div>
      <div className="flex items-center lg:p-2 xl:p-4">
        <HeaderLabel label="Updated" />
        <HeaderValue value={`${formatDate(ticketSummary?.updated, TICKET_DATE_FORMAT)}`} />
      </div>
    </div>
  );
}

export default TicketHeader;
