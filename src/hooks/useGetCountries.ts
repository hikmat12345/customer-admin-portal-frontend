import { getCountries, getExcel } from '@/services/countries/countriesService'
import { useQuery } from '@tanstack/react-query'

export const useGetCountries = () => {
	return useQuery({ queryKey: ['countries'], queryFn: getCountries })
}

export const useGetExcel = (from: string, to: string) => {
	return useQuery({ queryKey: ['excel', from, to], queryFn: getExcel })
}
