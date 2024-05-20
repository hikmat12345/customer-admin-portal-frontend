import httpClient from '../httpClient'

export const getCountries = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/countries`).then(({ data }) => data)
}

export const getExcel = async ({ queryKey }: any) => {
	const [, from, to] = queryKey
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/account-history/${from}/${to}`

	return httpClient.get(url).then(({ data }) => data)
}
