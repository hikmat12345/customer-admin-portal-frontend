import { NEXT_PUBLIC_API_BASE_URL } from 'config/config';
import httpClient from '../httpClient';

export const getUserDetails = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/user/profile`).then(({ data }) => data);
};

export const getUserSettings = async ({ queryKey }: any) => {
  const [,] = queryKey;
  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/user/settings`).then(({ data }) => data);
};

export const getUserPagePreferenceSettings = async ({ queryKey }: any) => {
  const [,] = queryKey;
  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/user/settings/page-preferences`).then(({ data }) => data);
};

export const getUserCompanyNetworkPreferenceSettings = async ({ queryKey }: any) => {
  const [,] = queryKey;
  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/user/settings/company-network-preferences`).then(({ data }) => data);
};

export const postPagePreferenceUpdate = async (data: any) =>
  httpClient.post(`${NEXT_PUBLIC_API_BASE_URL}/user/settings/page-preferences`, data).then(({ data }) => data);

export const postCompanyNetworkPreferenceUpdate = async (data: any) =>
  httpClient.post(`${NEXT_PUBLIC_API_BASE_URL}/user/settings/company-network-preferences`, data).then(({ data }) => data);
