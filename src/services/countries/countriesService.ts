import { NEXT_PUBLIC_API_BASE_URL } from 'config/config'
import httpClient from '../httpClient'

export const getCountries = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/countries`).then(({ data }) => data)
}

export const getExcel = async ({ queryKey }: any) => {
	const [, from, to] = queryKey
	const url = `${NEXT_PUBLIC_API_BASE_URL}/account-history/${from}/${to}`

	return httpClient.get(url).then(({ data }) => data)
}
