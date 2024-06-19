import { getVendorsByCountries } from '@/services/vendors/vendorService';
import { useQuery } from '@tanstack/react-query';

export const useGetVendorsByCountries = () => useQuery({ queryKey: ['invoices'], queryFn: getVendorsByCountries });
