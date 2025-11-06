import { NEXT_PUBLIC_INVENTORY_SERVICE_URL, NEXT_PUBLIC_INVOICE_SERVICE_URL, NEXT_PUBLIC_TICKET_SERVICE_URL } from 'config/config';
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

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/all`, config).then(({ data }) => data);
};

export const getMonthlyInventory = async ({ queryKey }: any) => {
  const [,] = queryKey;
  const currentPageUrl = window.location.href;
  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/monthly?pageLink=${currentPageUrl}`).then(({ data }) => data);
};

export const getLiveServices = async ({ queryKey }: any) => {
  const [,] = queryKey;
  const currentPageUrl = window.location.href;
  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/live?pageLink=${currentPageUrl}`).then(({ data }) => data);
};

export const getSingleServiceDetail = async ({ queryKey }: any) => {
  const [, serviceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/single-detail/${serviceId}`).then(({ data }) => data);
};

export const getCostPlan = async ({ queryKey }: any) => {
  const [, serviceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/cost-plan/${serviceId}`).then(({ data }) => data);
};

export const getAssetById = async ({ queryKey }: any) => {
  const [, serviceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/assets/${serviceId}`).then(({ data }) => data);
};

export const getTicketsRecentActivity = async ({ queryKey }: any) => {
  const [, serviceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/service-tickets/${serviceId}`).then(({ data }) => data);
};

export const getRecentActivity = async ({ queryKey }: any) => {
  const [, serviceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/recent-activity/${serviceId}`).then(({ data }) => data);
};
export const getServiceCostTrend = async ({ queryKey }: any) => {
  const [, serviceId, costTrendLimit] = queryKey;
  return httpClient
    .get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/service-cost-trend/${serviceId}?limit=${costTrendLimit}`)
    .then(({ data }) => data)
    .catch((error) => error);
};
