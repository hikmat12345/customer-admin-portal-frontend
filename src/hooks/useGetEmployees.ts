import { getEmployeeCostTrend, getEmployeeDetail, getEmployeeTickets } from '@/services/employee/employee-summary'
 import { useQuery } from '@tanstack/react-query'

export const useGetEmployeeDetail = (employee_id: number) => {
	return useQuery({ queryKey: ['employee_detail', employee_id], queryFn: getEmployeeDetail })
}
 
export const useGetEmployeeCostTrend = (account_id: number) => {
	return useQuery({ queryKey: ['account_cost_trend', account_id], queryFn: getEmployeeCostTrend })
}
export const useGetEmployeeTickets = (employee_id: number, offset: number, limit: number) => {
	return useQuery({
		queryKey: ['employee_tickets', employee_id,
			offset,
			limit], queryFn: getEmployeeTickets
	})
}