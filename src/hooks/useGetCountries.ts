import { getCountries } from '@/services/countries/countriesService'
import { useQuery } from '@tanstack/react-query'

export const useGetCountries = () => {
	return useQuery({ queryKey: ['countries'], queryFn: getCountries })
}
