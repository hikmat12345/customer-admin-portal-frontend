import {
  getAllTickets,
  getAllTicketsByAssetId,
  getMonthlyTickets,
  getMonthlyTicketsStats,
  getOpenTickets,
  getTicketSecondaryStatuses,
  getTicketSummary,
  getTicketUpdateAttachment,
  getTicketUpdateStatuses,
  getVendorAccounts,
  postTicketUpdate,
} from '@/services/tickets/ticketsService';
import { getUserDetails } from '@/services/users/usersService';
import { createMutationWithVariables } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

export const useGetAllTickets = (
  offset?: number,
  limit?: number,
  priority?: string | null,
  status?: string | null,
  accountNumber?: string | null,
  searchQuery?: string | null,
) => {
  return useQuery({
    queryKey: ['tickets', offset, limit, priority, status, accountNumber, searchQuery],
    queryFn: getAllTickets,
  });
};

export const useGetMonthlyTickets = (year: number, month: number, offset?: number, limit?: number) =>
  useQuery({
    queryKey: ['monthly_tickets', year, month, offset, limit],
    queryFn: getMonthlyTickets,
  });

export const useGetMonthlyTicketsStats = (year: number, month: number) =>
  useQuery({
    queryKey: ['monthly_tickets_stats', year, month],
    queryFn: getMonthlyTicketsStats,
  });

export const useGetOpenTickets = () =>
  useQuery({
    queryKey: ['open_tickets'],
    queryFn: getOpenTickets,
    refetchInterval: 20000,
  });

export const useGetVendors = () =>
  useQuery({
    queryKey: ['vendor_accounts'],
    queryFn: getVendorAccounts,
  });

export const useGetTicketsByAssetId = (assetId: number) => {
  return useQuery({
    queryKey: ['asset-tickets', assetId],
    queryFn: getAllTicketsByAssetId,
  });
};

export const useGetTicketSummary = (ticketId: number) =>
  useQuery({
    queryKey: ['ticket_summary', ticketId],
    queryFn: getTicketSummary,
  });

export const useGetTicketSecondaryStatuses = () =>
  useQuery({
    queryKey: ['ticket_secondary_statuses'],
    queryFn: getTicketSecondaryStatuses,
  });

export const useGetTicketUpdateStatuses = () =>
  useQuery({
    queryKey: ['ticket_update_statuses'],
    queryFn: getTicketUpdateStatuses,
  });

export const useGetLoggedInUserDetails = () => {
  return useQuery({
    queryKey: ['user_details'],
    queryFn: getUserDetails,
  });
};

export const { useMutation: usePostTicketUpdate } = createMutationWithVariables('post-ticket-update', postTicketUpdate);
export const { useMutation: useGetTicketUpdateAttachment } = createMutationWithVariables(
  'get-ticket-update-attachment',
  getTicketUpdateAttachment,
);
