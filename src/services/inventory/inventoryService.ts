import { NEXT_PUBLIC_INVENTORY_SERVICE_URL, NEXT_PUBLIC_TICKET_SERVICE_URL } from 'config/config';
import httpClient from '../httpClient';

export const getInventories = async ({ queryKey }: any) => {
  const [, offset, limit, account, vendor, serviceType, serviceStatus, searchQuery] = queryKey;

  const config = {
    params: {
      offset,
      limit,
      account,
      vendor,
      serviceType,
      serviceStatus,
      searchQuery,
    },
  };

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/all`, config).then(({ data }) => data);
};

export const getMonthlyInventory = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/monthly`).then(({ data }) => data);
};

export const getLiveServices = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/live`).then(({ data }) => data);
};

export const getSingleServiceDetail = async ({ queryKey }: any) => {
  const [, serviceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/single-detail/${serviceId}`).then(({ data }) => data);
};

export const getCostPlan = async ({ queryKey }: any) => {
  const [, serviceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/cost-plan/${serviceId}`).then(({ data }) => data);
};
export const getAssets = async ({ queryKey }: any) => {
  const [, serviceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/assets/${serviceId}`).then(({ data }) => data);
};

export const getTicketsRecentActivity = async ({ queryKey }: any) => {
  const [, serviceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/service-tickets/${serviceId}`).then(({ data }) => data);
};

export const getRecentActivity = async ({ queryKey }: any) => {
  const [, serviceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/recent-activity/${serviceId}`).then(({ data }) => data);
};
