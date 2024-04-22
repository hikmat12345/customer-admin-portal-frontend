import { getInvoices, getMonthlyInvoices } from '@/services/accounts/accountsService'
import { useQuery } from '@tanstack/react-query'

export const useGetMonthlyInvoices = () => {
	return useQuery({ queryKey: ['monthly_invoices'], queryFn: getMonthlyInvoices })
}

export const useGetInvoices = (
	offset: number,
	limit: number,
	account_number?: string | null,
	countryId?: number,
	vendor?: string | null,
	searchQuery?: string | null
) => {
	return useQuery({
		queryKey: ['invoices', offset, limit, account_number, countryId, vendor, searchQuery],
		queryFn: getInvoices,
	})
}
