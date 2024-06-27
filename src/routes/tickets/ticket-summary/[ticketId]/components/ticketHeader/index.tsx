/* eslint-disable */
import { TICKET_DATE_FORMAT } from '@/utils/constants/dateFormat.constants';
import { PRIORITY_COLOR_LIST, PRIORITY_LIST } from '@/utils/constants/statusList.constants';
import formatDate from '@/utils/utils';
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import Link from 'next/link';

function TicketHeader({ ticketSummary, ticketSummaryLoading }: any) {
  function HeaderLabel({ label }: { label: string }) {
    return <span className="w-1/4 text-[0.813rem] font-[600] leading-[1.023rem]">{label}</span>;
  }

  function HeaderValue({ value, linkUrl }: { value: string; linkUrl?: string }) {
    return (
      <span className="w-3/4 pl-2 text-[0.813rem] font-[400] leading-[1.023rem] text-custom-dimGray">
        {ticketSummaryLoading ? (
          <Skeleton variant="paragraph" rows={1} />
        ) : ticketSummary && value ? (
          value && linkUrl ? (
            <Link
              className="text-[0.813rem] font-[400] leading-[1.06rem] text-custom-dryBlue visited:text-custom-dryBlue active:text-custom-dryBlue"
              href={linkUrl}
            >
              {value}
            </Link>
          ) : (
            value
          )
        ) : (
          '-'
        )}
      </span>
    );
  }

  return (
    <div className="grid w-full rounded-lg border border-custom-aluminum bg-custom-white p-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:px-6 2xl:px-12">
      <div className="flex h-[2.6rem] items-center p-3">
        <HeaderLabel label="Logged by" />
        <HeaderValue value={`${ticketSummary?.user?.firstName} ${ticketSummary?.user?.lastName}`} />
      </div>
      <div className="flex h-[2.6rem] items-center p-3">
        <HeaderLabel label="Priority" />
        <div className="pl-2 sm:w-2/4 xl:w-3/4">
          {ticketSummaryLoading ? (
            <Skeleton variant="paragraph" rows={1} />
          ) : (
            <div
              className={`flex h-[2.313rem] w-[2.313rem] items-center justify-center rounded-full text-[0.813rem] font-[400] leading-[1.023rem] text-custom-dimGray text-custom-white bg-[${
                PRIORITY_COLOR_LIST[ticketSummary?.priority]
              }]`}
            >
              {PRIORITY_LIST[ticketSummary?.priority]}
            </div>
          )}
        </div>
      </div>
      <div className="flex h-[2.6rem] items-center p-3">
        <HeaderLabel label="Behalf of" />
        <HeaderValue value={`${ticketSummary?.onBehalfOf}`} />
      </div>
      <div className="flex h-[2.6rem] items-center p-3">
        <HeaderLabel label="Client Ref no." />
        <HeaderValue value={`${ticketSummary?.clientReferenceNo}`} />
      </div>
      <div className="flex h-[2.6rem] items-center p-3">
        <HeaderLabel label="Created" />
        <HeaderValue value={`${formatDate(ticketSummary?.created, TICKET_DATE_FORMAT)}`} />
      </div>
      <div className="flex h-[2.6rem] items-center p-3">
        <HeaderLabel label="Updated" />
        <HeaderValue value={`${formatDate(ticketSummary?.updated, TICKET_DATE_FORMAT)}`} />
      </div>
      <div className="flex h-[2.6rem] items-center p-3">
        <HeaderLabel label="Service" />
        <HeaderValue
          value={ticketSummary?.service?.serviceNumber}
          linkUrl={`/inventory/${ticketSummary?.service?.id}`}
        />
      </div>
      <div className="flex h-[2.6rem] items-center p-3">
        <HeaderLabel label="Employee" />
        <HeaderValue
          value={ticketSummary?.employee && `${ticketSummary?.employee?.firstName} ${ticketSummary?.employee?.lastName}`}
          linkUrl={`/employees/${ticketSummary?.employee?.id}`}
        />
      </div>
      <div className="flex h-[2.6rem] items-center p-3">
        <HeaderLabel label="Vendor" />
        <HeaderValue
          value={ticketSummary?.companyNetwork?.displayName}
          linkUrl={`/vendors/${ticketSummary?.companyNetwork?.id}`}
        />
      </div>
    </div>
  );
}

export default TicketHeader;
