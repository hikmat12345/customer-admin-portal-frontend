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

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVENTORY}/inventory/all`, config)
		.then(({ data }) => data)
}

export const getMonthlyInventory = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVENTORY}/inventory/monthly`)
		.then(({ data }) => data)
}

export const getLiveServices = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVENTORY}/inventory/live`)
		.then(({ data }) => data)
}

 export const getSingleServiceDetail = async ({ queryKey }: any) => {
	const [, serviceId] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVENTORY}/inventory/single-detail/${serviceId}`)
		.then(({ data }) => data)
}

 
export const getCostPlan = async ({ queryKey }: any) => {
	const [, serviceId] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVENTORY}/inventory/cost-plan/${serviceId}`)
		.then(({ data }) => data)
}
export const getAssets = async ({ queryKey }: any) => {
	const [, serviceId] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVENTORY}/inventory/assets/${serviceId}`)
		.then(({ data }) => data)
}

///tickets-recent-activity
export const getTicketsRecentActivity = async ({ queryKey }: any) => {
	const [, serviceId] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_TICKETS}/tickets/service-tickets?service_id=${serviceId}`)
		.then(({ data }) => data)
}

export const getRecentActivity = async ({ queryKey }: any) => {
	const [, serviceId] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVENTORY}/inventory/recent-activity/${serviceId}`)
		.then(({ data }) => data)
} 