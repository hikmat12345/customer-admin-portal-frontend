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

	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/inventory/all`, config).then(({ data }) => data)
}

export const getMonthlyInventory = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/inventory/services/monthly`).then(({ data }) => data)
}

export const getLiveServices = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/inventory/services/live`).then(({ data }) => data)
}
