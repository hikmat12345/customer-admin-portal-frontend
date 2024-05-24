import { getAccountCostTrend, getAccountDetail } from '@/services/accounts/accountsService'
import {  getEmployeeDetail } from '@/services/employee/employee-summary'
 import { useQuery } from '@tanstack/react-query'

export const useGetAccountDetail = (account_id: number) => {
	return useQuery({ queryKey: ['account_detail', account_id], queryFn: getAccountDetail })
}
 
export const useGetAccountCostTrend = (account_id: number) => {
	return useQuery({ queryKey: ['account_cost_trend', account_id], queryFn: getAccountCostTrend })
}