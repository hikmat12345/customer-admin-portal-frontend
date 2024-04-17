import { getVendorsByCountries } from '@/services/vendors/vendorService'
import { useQuery } from '@tanstack/react-query'

export const useGetVendorsByCountries = () => {
	return useQuery({ queryKey: ['invoices'], queryFn: getVendorsByCountries })
}
