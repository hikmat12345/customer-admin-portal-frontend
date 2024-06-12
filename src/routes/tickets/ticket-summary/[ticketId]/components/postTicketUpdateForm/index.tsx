import { SelectComponent } from "@/components/ui/select/index";
import {
  useGetTicketUpdateStatuses,
  usePostTicketUpdate,
} from "@/hooks/useTickets";
import useUserStore from "@/stores/useUserStore";
import { Button } from "@veroxos/design-system/dist/ui/Button/button";
import Image from "next/image";
import toast from "react-hot-toast";

function PostTicketUpdateForm({
  getTicketSummaryRes,
  setShowAddUpdateForm,
  refetchTicketSummary,
}: {
  getTicketSummaryRes: any;
  setShowAddUpdateForm: any;
  refetchTicketSummary: any;
}){
  const { data: getTicketUpdateStatusesRes } = useGetTicketUpdateStatuses();

	const {loggedInUser} = useUserStore((state : any) => ({loggedInUser : state.user}));

  const { mutate, isPending: postUpdateLoading } = usePostTicketUpdate();

  const handlePostTicketUpdate = (e: any) => {
    e.preventDefault();
    const {
      description: { value: description },
      ticketUpdateStatus: { value: ticketUpdateStatusName },
    } = e.target;

    const ticketUpdate = {
      ticketId: getTicketSummaryRes?.data.id,
      workflowId: getTicketSummaryRes?.data.workflow?.id,
      ticketUpdateStatusId: parseInt(getTicketUpdateStatusesRes.data.find((status : any) => status.name == ticketUpdateStatusName ).id),
      description: description.replace(/(\r\n|\n|\r)/g, "<br/>"),
    };

    mutate(ticketUpdate, {
      onSuccess: () => {
        setShowAddUpdateForm(false);
        refetchTicketSummary();
        toast.success('Successfully posted ticket update!');
      },
      onError: () => {
        toast.error('Something went wrong. Please try again later!');
      },
    });
  };

  return (
    <form onSubmit={handlePostTicketUpdate}>
      <div className="rounded-lg p-4 bg-custom-background mt-4">
        <div className="flex items-center gap-5">
          <div className="flex h-[3.876rem] w-[3.876rem] items-center justify-center rounded-full bg-custom-blue">
            <Image src="/svg/account.svg" height={36} width={36} alt="account icon" />
          </div>
            <p className="font-[700] text-[1.188rem] leading-[1.477rem]">
              {`${loggedInUser.firstName} ${loggedInUser.lastName}`}
            </p>
        </div>
        <textarea
          name="description"
          required
          className="mt-4 w-full rounded-lg p-4 focus:outline-none focus-visible:outline-none"
          rows={6}
          placeholder="Type here..."
        />
        <div className="my-4 flex gap-4 h-[2.563rem]">
          <SelectComponent required name="ticketUpdateStatus" className="w-3/5 bg-custom-white h-[2.563rem] border border-custom-aluminum text-custom-grey font-[400] sm:xl:text-[0.813rem] leading-[0.873rem] rounded-lg py-[0.563rem] px-[1.063rem] focus:outline-none"placeholder="Select Status" options={getTicketUpdateStatusesRes?.data.map(
              (ticketUpdateStatus: { id: number; name: string }) => (
                {label : ticketUpdateStatus.name, value: ticketUpdateStatus.id}
              )
            )} />

          <Button
            className="h-full w-1/5 border-custom-blue text-[0.813rem] font-[600] leading-[1.023rem] text-custom-blue hover:text-custom-blue"
            variant="outline"
            onClick={() => setShowAddUpdateForm(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={postUpdateLoading}
            type="submit"
            className="h-full w-1/5 bg-custom-blue text-[0.813rem] font-[600] leading-[1.023rem] text-custom-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostTicketUpdateForm;
