import { getInventories, getLiveServices, getMonthlyInventory } from '@/services/inventory/inventoryService'
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
