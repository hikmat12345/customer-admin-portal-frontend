import {
  useGetLoggedInUserDetails,
  useGetTicketUpdateStatuses,
  usePostTicketUpdate,
} from "@/hooks/useTickets";
import { Button } from "@veroxos/design-system/dist/ui/Button/button";
import Skeleton from "@veroxos/design-system/dist/ui/Skeleton/skeleton";
import Image from "next/image";

const PostTicketUpdateForm = ({
  getTicketSummaryRes,
  setShowAddUpdateForm,
}: {
  getTicketSummaryRes: any;
  setShowAddUpdateForm: any;
}) => {
  const { data: getTicketUpdateStatusesRes } = useGetTicketUpdateStatuses();
  const { data: getLoggedInUserDetailsRes, isLoading } =
    useGetLoggedInUserDetails();

  const {
    mutate,
    isPending: postUpdateLoading,
    isSuccess,
    isError,
  } = usePostTicketUpdate();

  const handlePostTicketUpdate = (e: any) => {
    e.preventDefault();
    let {
      description: { value: description },
      ticketUpdateStatus: { value: ticketUpdateStatusId },
    } = e.target;

    const ticketUpdate = {
      ticketId: getTicketSummaryRes?.data.id,
      workflowId: getTicketSummaryRes?.data.workflow?.id,
      ticketUpdateStatusId: parseInt(ticketUpdateStatusId),
      description: description.replace(/(\r\n|\n|\r)/g, "<br/>"),
    };

    mutate(ticketUpdate);
  };

  return (
    <form onSubmit={handlePostTicketUpdate}>
      <div className="rounded-lg p-5 bg-[#F8F8F8] mt-5">
        <div className="flex items-center ">
          <div className="h-[4.063rem] w-[4.063rem] bg-[#1D46F3] rounded-full flex items-center justify-center">
            <Image
              src={"/svg/account.svg"}
              height={36}
              width={36}
              alt="account icon"
            />
          </div>
          {isLoading ? (
            <div className={`w-[15rem]`}>
              <Skeleton variant="paragraph" rows={1} />
            </div>
          ) : (
            <p className="pl-5 font-[700] text-[1.375rem] leading-[1.664rem]">
              {`${getLoggedInUserDetailsRes?.data.firstName} ${getLoggedInUserDetailsRes?.data.lastName}`}
            </p>
          )}
        </div>
        <textarea
          name="description"
          required
          className="mt-5 w-full rounded-lg p-5 focus:outline-none focus-visible:outline-none"
          rows={6}
          placeholder="Type here..."
        />
        <div className="my-5 flex gap-4 h-[2.75rem]">
          <select
            required
            name="ticketUpdateStatus"
            className="w-3/5 bg-[#F4F7FE] h-[2.75rem] border border-[#D6D6D6] text-[#575757] font-[400] text-[0.875rem] leading-[1.06rem] rounded-lg py-[0.75rem] px-[1.25rem] focus:outline-none"
          >
            {getTicketUpdateStatusesRes?.data.map(
              (ticketUpdateStatus: { id: number; name: string }) => (
                <option
                  key={ticketUpdateStatus.id}
                  value={ticketUpdateStatus.id}
                >
                  {ticketUpdateStatus.name}
                </option>
              )
            )}
          </select>
          <Button
            className="w-1/5 h-full font-[600] leading-[1.21rem] text-[1rem] border-[#1D46F3] text-[#1D46F3] hover:text-[#1D46F3]"
            variant="outline"
            onClick={() => setShowAddUpdateForm(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={postUpdateLoading}
            type="submit"
            className="w-1/5 h-full font-[600] leading-[1.21rem] text-[1rem]"
          >
            Submit
          </Button>
        </div>
        {isError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Error !</span> Something went wrong. Please try again later.
          </div>
        )}
        {isSuccess && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">Success !</span> Ticket update posted successfully.
          </div>
        )}
      </div>
    </form>
  );
};

export default PostTicketUpdateForm;
