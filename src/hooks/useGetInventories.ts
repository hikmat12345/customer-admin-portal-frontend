import { getAssets, getCostPlan, getInventories, getLiveServices, getMonthlyInventory, getRecentActivity, getSingleServiceDetail, getTicketsRecentActivity } from '@/services/inventory/inventoryService'
import { useQuery } from '@tanstack/react-query'
export const useGetInventories = (
	offset: number,
	limit: number,
	account?: string | null,
	vendor?: string | null,
	serviceType?: number,
	serviceStatus?: number,
	searchQuery?: string | null
) => {
	return useQuery({
		queryKey: ['inventories', offset, limit, account, vendor, serviceType, serviceStatus, searchQuery],
		queryFn: getInventories,
	})
} 
export const useGetMonthlyInventoryCount = () => {
	return useQuery({ queryKey: ['monthly_service'], queryFn: getMonthlyInventory })
} 
export const useGetLiveServices = () => {
	return useQuery({ queryKey: ['live_services'], queryFn: getLiveServices })
} 
export const useGetSingleServiceDetail = (serviceId: number) => {
	return useQuery({ queryKey: ['single_service', serviceId], queryFn: getSingleServiceDetail })
} 
export const useGetCostPlan = (serviceId: number) => {
	return useQuery({ queryKey: ['cost_plan', serviceId], queryFn: getCostPlan })
} 
 export const useGetAssets = (serviceId: number) => {
	return useQuery({ queryKey: ['assets', serviceId], queryFn: getAssets })
}
export const useGetTickets = (serviceId: number) => {
	return useQuery({ queryKey: ['tickets_recent_activity', serviceId], queryFn: getTicketsRecentActivity })
} 
  export const useGetRecentActivity = (serviceId: number) => {
  	return useQuery({ queryKey: ['recent_activity', serviceId], queryFn: getRecentActivity })
}