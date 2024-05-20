import httpClient from '../httpClient'

export const getVendorsByCountries = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor`).then(({ data }) => data)
}
