import { useGetLoggedInUserDetails, useGetTicketUpdateStatuses, usePostTicketUpdate } from '@/hooks/useTickets';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import Image from 'next/image';
import toast from 'react-hot-toast';

function PostTicketUpdateForm({
  getTicketSummaryRes,
  setShowAddUpdateForm,
  refetchTicketSummary,
}: {
  getTicketSummaryRes: any;
  setShowAddUpdateForm: any;
  refetchTicketSummary: any;
}) {
  const { data: getTicketUpdateStatusesRes } = useGetTicketUpdateStatuses();
  const { data: getLoggedInUserDetailsRes, isLoading } = useGetLoggedInUserDetails();

  const { mutate, isPending: postUpdateLoading } = usePostTicketUpdate();

  const handlePostTicketUpdate = (e: any) => {
    e.preventDefault();
    const {
      description: { value: description },
      ticketUpdateStatus: { value: ticketUpdateStatusId },
    } = e.target;

    const ticketUpdate = {
      ticketId: getTicketSummaryRes?.data.id,
      workflowId: getTicketSummaryRes?.data.workflow?.id,
      ticketUpdateStatusId: parseInt(ticketUpdateStatusId), // eslint-disable-line radix
      description: description.replace(/(\r\n|\n|\r)/g, '<br/>'),
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
      <div className="mt-4 rounded-lg bg-[#F8F8F8] p-4">
        <div className="flex items-center gap-5">
          <div className="flex h-[3.876rem] w-[3.876rem] items-center justify-center rounded-full bg-custom-blue">
            <Image src="/svg/account.svg" height={36} width={36} alt="account icon" />
          </div>
          {isLoading ? (
            <div className="w-[15rem]">
              <Skeleton variant="paragraph" rows={1} />
            </div>
          ) : (
            <p className="text-[1.188rem] font-[700] leading-[1.477rem]">
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
        <div className="my-4 flex h-[2.563rem] gap-4">
          <select
            required
            name="ticketUpdateStatus"
            className="h-[2.563rem] w-3/5 rounded-lg border border-custom-aluminum bg-custom-white px-[1.063rem] py-[0.563rem] text-[0.688rem] font-[400] leading-[0.873rem] text-[#575757] focus:outline-none"
          >
            {getTicketUpdateStatusesRes?.data.map((ticketUpdateStatus: { id: number; name: string }) => (
              <option key={ticketUpdateStatus.id} value={ticketUpdateStatus.id}>
                {ticketUpdateStatus.name}
              </option>
            ))}
          </select>
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
