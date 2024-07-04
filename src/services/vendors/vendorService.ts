import { NEXT_PUBLIC_API_BASE_URL } from 'config/config';
import httpClient from '../httpClient';

export const getVendorsByCountries = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/vendor`).then(({ data }) => data);
};

export const getVendorAccounts = async ({ queryKey }: any) => {
  const [, offset, limit, searchQuery, vendor, countryId, showArchived, serviceType] = queryKey;
  const config = {
    params: {
      offset,
      limit,
      searchQuery,
      vendor,
      countryId,
      showArchived,
      serviceType,
    },
  };
  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/vendor/accounts/all`, config).then(({ data }) => data);
};
