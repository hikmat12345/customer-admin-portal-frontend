import { NEXT_PUBLIC_API_BASE_URL } from 'config/config';
import httpClient from '../httpClient';

export const getCountries = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`https://customer-admin-api.dev.v2.veroxos.com/api/v2/customer-admin/countries`).then(({ data }) => data);
};

export const getExcel = async ({ queryKey }: any) => {
  const [, from, to] = queryKey;
  const url = `${NEXT_PUBLIC_API_BASE_URL}/account-history/${from}/${to}`;

  return httpClient.get(url).then(({ data }) => data);
};
