import {
  getAllTickets,
  getMonthlyTickets,
  getOpenTickets,
  getTicketSecondaryStatuses,
  getTicketSummary,
  getTicketUpdateStatuses,
  getUserDetails,
  getVendorAccounts,
  postTicketUpdate,
} from '@/services/tickets/ticketsService';
import { createMutationWithVariables } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

export const useGetAllTickets = (
  offset?: number,
  limit?: number,
  priority?: number | null,
  status?: number | null,
  account_number?: string | null,
  searchQuery?: string | null,
) =>
  useQuery({
    queryKey: ['tickets', offset, limit, priority, status, account_number, searchQuery],
    queryFn: getAllTickets,
  });

export const useGetMonthlyTickets = (year: number, month: number, offset?: number, limit?: number) =>
  useQuery({
    queryKey: ['monthly_tickets', year, month, offset, limit],
    queryFn: getMonthlyTickets,
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

export const useGetLoggedInUserDetails = () =>
  useQuery({
    queryKey: ['user_details'],
    queryFn: getUserDetails,
  });

export const { useMutation: usePostTicketUpdate } = createMutationWithVariables('post-ticket-update', postTicketUpdate);
