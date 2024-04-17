import httpClient from '../httpClient'

export const getVendorsByCountries = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_INVOICE_SERVICE_URL}/vendors`).then(({ data }) => data)
}
