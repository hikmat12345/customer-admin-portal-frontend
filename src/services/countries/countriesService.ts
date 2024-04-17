import httpClient from '../httpClient'

export const getCountries = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_INVOICE_SERVICE_URL}/countries`).then(({ data }) => data)
}
