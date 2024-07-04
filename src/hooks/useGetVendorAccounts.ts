import { getVendorAccounts } from '@/services/vendors/vendorService';
import { useQuery } from '@tanstack/react-query';

export const useGetVendorAccounts = (
  offset: number,
  limit: number,
  searchQuery?: string | undefined,
  vendor?: string | undefined,
  countryId?: string | undefined,
  showArchived?: string | undefined,
  serviceType?: string,
) =>
  useQuery({
    queryKey: ['all_vendor_accounts', offset, limit, searchQuery, vendor, countryId, showArchived, serviceType],
    queryFn: getVendorAccounts,
  });
