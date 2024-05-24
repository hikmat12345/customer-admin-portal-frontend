import httpClient from '../httpClient'

export const getAccountInvoices = async ({ queryKey }: any) => {
	const [, offset, limit, account_number, countryId, vendor, searchQuery] = queryKey
	const config = {
		params: {
			limit: limit,
			offset: offset,
			account: account_number,
			countryId: countryId,
			vendor: vendor,
			searchQuery: searchQuery,
		},
	}
	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVOICE}/invoices`, config).then(({ data }) => data)
}

 
export const getAccountDetail = async ({ queryKey }: any) => {
	const [, accountId] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_CUSTOMER_ADMIN_PORTAL}/account/detail/${accountId}`)
		.then(({ data }) => data)
}
export const getAccountCostTrend = async ({ queryKey }: any) => {
	const [, accountId] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVOICE}/invoices/account-cost-trend/${accountId}`)
		.then(({ data }) => data)
}
 export const getAccountTickets = async ({ queryKey }: any) => {
	const [, accountId, offset, limit] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_TICKETS}/tickets/account-tickets/${accountId}?offset=${offset}&limit=${limit}`)
		.then(({ data }) => data)
}