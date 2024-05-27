import { NEXT_PUBLIC_API_BASE_URL } from 'config/config'
import httpClient from '../httpClient'

export const getCountries = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVENTORY}/countries`).then(({ data }) => data)
}
