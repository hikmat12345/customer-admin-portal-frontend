import {
  useGetLoggedInUserDetails,
  useGetTicketUpdateStatuses,
  usePostTicketUpdate,
} from "@/hooks/useTickets";
import { Button } from "@veroxos/design-system/dist/ui/Button/button";
import Skeleton from "@veroxos/design-system/dist/ui/Skeleton/skeleton";
import Image from "next/image";
import toast from "react-hot-toast";

const PostTicketUpdateForm = ({
  getTicketSummaryRes,
  setShowAddUpdateForm,
  refetchTicketSummary,
}: {
  getTicketSummaryRes: any;
  setShowAddUpdateForm: any;
  refetchTicketSummary : any;
}) => {
  const { data: getTicketUpdateStatusesRes } = useGetTicketUpdateStatuses();
  const { data: getLoggedInUserDetailsRes, isLoading } =
    useGetLoggedInUserDetails();

  const {
    mutate,
    isPending: postUpdateLoading,
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

    mutate(ticketUpdate, {
      onSuccess: () => {
        setShowAddUpdateForm(false);
        refetchTicketSummary();
        toast.success("Successfully posted ticket update!");
      },
      onError: () => {
        toast.error("Something went wrong. Please try again later!");
      },
    });
  };

  return (
    <form onSubmit={handlePostTicketUpdate}>
      <div className="rounded-lg p-4 bg-[#F8F8F8] mt-4">
        <div className="flex items-center gap-5">
          <div className="h-[3.876rem] w-[3.876rem] bg-custom-blue rounded-full flex items-center justify-center">
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
            <p className="font-[700] text-[1.188rem] leading-[1.477rem]">
              {`${getLoggedInUserDetailsRes?.data.firstName} ${getLoggedInUserDetailsRes?.data.lastName}`}
            </p>
          )}
        </div>
        <textarea
          name="description"
          required
          className="mt-4 w-full rounded-lg p-4 focus:outline-none focus-visible:outline-none"
          rows={6}
          placeholder="Type here..."
        />
        <div className="my-4 flex gap-4 h-[2.563rem]">
          <select
            required
            name="ticketUpdateStatus"
            className="w-3/5 bg-custom-white h-[2.563rem] border border-custom-aluminum text-[#575757] font-[400] text-[0.688rem] leading-[0.873rem] rounded-lg py-[0.563rem] px-[1.063rem] focus:outline-none"
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
            className="w-1/5 h-full font-[600] leading-[1.023rem] text-[0.813rem] border-custom-blue text-custom-blue hover:text-custom-blue"
            variant="outline"
            onClick={() => setShowAddUpdateForm(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={postUpdateLoading}
            type="submit"
            className="w-1/5 h-full font-[600] leading-[1.023rem] text-[0.813rem]"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PostTicketUpdateForm;
