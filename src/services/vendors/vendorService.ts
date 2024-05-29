import { NEXT_PUBLIC_API_BASE_URL } from 'config/config'
import httpClient from '../httpClient'

export const getVendorsByCountries = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/vendor`).then(({ data }) => data)
}
 