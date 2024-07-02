import { getServiceSites } from '@/services/site/site-summary';
import { useQuery } from '@tanstack/react-query';

export const useGetServiceSites = (
    offset: number,
    limit: number,
    searchQuery?: string | undefined,
    countryId?: string | undefined,
  ) =>
    useQuery({ queryKey: ['all_service_sites', offset, limit, searchQuery, countryId], queryFn: getServiceSites });