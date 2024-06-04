import { NEXT_PUBLIC_INVENTORY_SERVICE_URL } from 'config/config'
import httpClient from '../httpClient'

export const getInventories = async ({ queryKey }: any) => {
	const [, offset, limit, account, vendor, serviceType, serviceStatus, searchQuery] = queryKey

	const config = {
		params: {
			offset: offset,
			limit: limit,
			account: account,
			vendor: vendor,
			serviceType: serviceType,
			serviceStatus: serviceStatus,
			searchQuery: searchQuery,
		},
	}

	return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/all`, config).then(({ data }) => data)
}

export const getMonthlyInventory = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/monthly`).then(({ data }) => data)
}

export const getLiveServices = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/live`).then(({ data }) => data)
}
