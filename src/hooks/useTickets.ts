import { getAllTickets, getMonthlyTickets, getOpenTickets, getVendorAccounts } from '@/services/tickets/ticketsService'
import { useQuery } from '@tanstack/react-query'

export const useGetAllTickets = (
	offset?: number,
	limit?: number,
	priority?: number | null,
	status?: number | null,
	account_number?: string | null,
	searchQuery?: string | null
) => {
	return useQuery({
		queryKey: ['tickets', offset, limit, priority, status, account_number, searchQuery],
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
		refetchInterval: 20000,
	})
}

export const useGetVendors = () => {
	return useQuery({
		queryKey: ['vendor_accounts'],
		queryFn: getVendorAccounts,
	})
}
