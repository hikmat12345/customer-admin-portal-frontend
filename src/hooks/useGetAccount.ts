import { getAccountCostTrend, getAccountDetail, getAccountInvoices } from '@/services/accounts/accountsService'
  import { useQuery } from '@tanstack/react-query'

export const useGetAccountDetail = (account_id: number) => {
	return useQuery({ queryKey: ['account_detail', account_id], queryFn: getAccountDetail })
}
 
export const useGetAccountCostTrend = (account_id: number) => {
	return useQuery({ queryKey: ['account_cost_trend', account_id], queryFn: getAccountCostTrend })
}
export const useGetAccountInvoices = (
	account_id: number,
	offset: number,
	limit: number
) => {
	return useQuery({
		queryKey: ['account_invoices', account_id, offset, limit],
		queryFn: getAccountInvoices,
	})
}