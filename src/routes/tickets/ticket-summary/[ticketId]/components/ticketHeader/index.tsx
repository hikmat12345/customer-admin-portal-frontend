import {
  PRIORITY_COLOR_LIST,
  PRIORITY_LIST,
} from "@/utils/constants/statusList.constants";
import { formatDate } from "@/utils/utils";
import Skeleton from "@veroxos/design-system/dist/ui/Skeleton/skeleton";

const TicketHeader = ({
  ticketSummary,
  ticketSummaryLoading,
}: any) => {
  const HeaderLabel = ({ label }: { label: string }) => {
    return (
      <span className="w-1/4 font-[600] text-[0.813rem] leading-[1.023rem]">
        {label}
      </span>
    );
  };

  const HeaderValue = ({ value }: { value: string }) => {
    return (
      <span className="sm:w-2/4 xl:w-3/4  font-[400] text-[#575757] text-[0.813rem] leading-[1.023rem] pl-2">
        {ticketSummaryLoading ? (
          <Skeleton variant="paragraph" rows={1} />
        ) : (
          ticketSummary && value ? value : '-'
        )}
      </span>
    );
  };

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 w-full border border-custom-aluminum bg-custom-white rounded-lg p-4 xl:px-6 2xl:px-12">
      <div className="flex items-centerw-full lg:p-2 xl:p-4">
        <HeaderLabel label="Logged by" />
        <HeaderValue
          value={`${ticketSummary?.user?.firstName} ${ticketSummary?.user?.lastName}`}
        />
      </div>
      <div className="flex items-center lg:p-2 xl:p-4">
        <HeaderLabel label="Priority" />
        <div className="sm:w-2/4 xl:w-3/4 pl-2">
          {ticketSummaryLoading ? <Skeleton variant="paragraph" rows={1} /> : <div
            className={`flex items-center justify-center h-[2.313rem] w-[2.313rem] font-[400] text-[#575757] text-[0.813rem] text-custom-white leading-[1.023rem] rounded-full bg-[${
              PRIORITY_COLOR_LIST[ticketSummary?.priority]
            }]`}
          >
            {PRIORITY_LIST[ticketSummary?.priority]}
          </div>}
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
        <HeaderValue
          value={`${formatDate(new Date(ticketSummary?.created))}`}
        />
      </div>
      <div className="flex items-center lg:p-2 xl:p-4">
        <HeaderLabel label="Updated" />
        <HeaderValue
          value={`${formatDate(new Date(ticketSummary?.updated))}`}
        />
      </div>
    </div>
  );
};

export default TicketHeader;
