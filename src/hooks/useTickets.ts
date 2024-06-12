import {
  getAllTickets,
  getMonthlyTickets,
  getOpenTickets,
  getTicketSecondaryStatuses,
  getTicketSummary,
  getTicketUpdateStatuses,
  getVendorAccounts,
  postTicketUpdate,
} from "@/services/tickets/ticketsService";
import { getUserDetails } from "@/services/users/usersService";
import { createMutationWithVariables } from "@/utils/query";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTickets = (
  offset?: number,
  limit?: number,
  priority?: string | null,
  status?: string | null,
  accountNumber?: string | null,
  searchQuery?: string | null
) => {
  return useQuery({
    queryKey: [
      "tickets",
      offset,
      limit,
      priority,
      status,
      accountNumber,
      searchQuery,
    ],
    queryFn: getAllTickets,
  });
};

export const useGetMonthlyTickets = (
  year: number,
  month: number,
  offset?: number,
  limit?: number
) => {
  return useQuery({
    queryKey: ["monthly_tickets", year, month, offset, limit],
    queryFn: getMonthlyTickets,
  });
};

export const useGetOpenTickets = () => {
  return useQuery({
    queryKey: ["open_tickets"],
    queryFn: getOpenTickets,
    refetchInterval: 20000,
  });
};

export const useGetVendors = () => {
  return useQuery({
    queryKey: ["vendor_accounts"],
    queryFn: getVendorAccounts,
  });
};

export const useGetTicketSummary = (ticketId: number) => {
  return useQuery({
    queryKey: ["ticket_summary", ticketId],
    queryFn: getTicketSummary,
  });
};

export const useGetTicketSecondaryStatuses = () => {
  return useQuery({
    queryKey: ["ticket_secondary_statuses"],
    queryFn: getTicketSecondaryStatuses,
  });
};

export const useGetTicketUpdateStatuses = () => {
  return useQuery({
    queryKey: ["ticket_update_statuses"],
    queryFn: getTicketUpdateStatuses,
  });
};

export const useGetLoggedInUserDetails = () => {  
  return useQuery({
    queryKey: ["user_details"],
    queryFn: getUserDetails,
  });
};

export const { useMutation: usePostTicketUpdate } = createMutationWithVariables(
  "post-ticket-update",
  postTicketUpdate
);
