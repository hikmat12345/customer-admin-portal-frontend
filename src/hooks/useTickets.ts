import { getAllTickets, getMonthlyTickets, getOpenTickets, getTicketSummary, getVendorAccounts } from '@/services/tickets/ticketsService'
import { useQuery } from '@tanstack/react-query'

export const useGetAllTickets = (
	offset?: number,
	limit?: number,
	priority?: number | null,
	status?: number | null,
	account_number?: string | null
) => {
	return useQuery({
		queryKey: ['tickets', offset, limit, priority, status, account_number],
		queryFn: getAllTickets,
	})
}

export const useGetMonthlyTickets = (year: number, month: number, offset?: number, limit?: number) => {
	return useQuery({
		queryKey: ['monthly_tickets', year, month, offset, limit],
		queryFn: getMonthlyTickets,
	})
}

export const useGetOpenTickets = () => {
	return useQuery({
		queryKey: ['open_tickets'],
		queryFn: getOpenTickets,
		refetchInterval: 12000,
	})
}

export const useGetVendors = () => {
	return useQuery({
		queryKey: ['vendor_accounts'],
		queryFn: getVendorAccounts,
	})
}

export const useGetTicketSummary = (ticketId : number) => {
	return useQuery({
		queryKey: ['ticket_summary', ticketId],
		queryFn: getTicketSummary,
	})
}
