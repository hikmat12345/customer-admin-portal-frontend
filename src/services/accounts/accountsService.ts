import { NEXT_PUBLIC_API_BASE_URL } from 'config/config'
import httpClient from '../httpClient'

export const getInvoices = async ({ queryKey }: any) => {
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
	return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/invoices`, config).then(({ data }) => data)
}

export const getMonthlyInvoices = async ({ queryKey }: any) => {
	const [,] = queryKey
	return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/invoices/summary`).then(({ data }) => data)
}

export const getCostSavings = async ({ queryKey }: any) => {
	const [, year] = queryKey
	const config = {
		params: {
			year: year,
		},
	}
	return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/cost-savings`, config).then(({ data }) => data)
}
