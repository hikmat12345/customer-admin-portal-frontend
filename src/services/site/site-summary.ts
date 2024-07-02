import {
  NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_INVENTORY_SERVICE_URL,
  NEXT_PUBLIC_INVOICE_SERVICE_URL,
  NEXT_PUBLIC_TICKET_SERVICE_URL,
} from 'config/config';
import httpClient from '../httpClient';

export const getServiceSites = async ({ queryKey }: any) => {
  const [, offset, limit, searchQuery, countryId] = queryKey;
  const config = {
    params: {
      offset,
      limit,
      searchQuery,
      countryId,
    },
  };
  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/site`, config).then(({ data }) => data).catch((error) =>  error)
};

export const getSiteDetail = async ({ queryKey }: any) => {
  const [, siteId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/site/site-detail/${siteId}`).then(({ data }) => data);
};

export const getSiteTickets = async ({ queryKey }: any) => {
  const [, siteId, offset, limit] = queryKey;

  return httpClient
    .get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/site-tickets/${siteId}?offset=${offset}&limit=${limit}`)
    .then(({ data }) => data);
};

export const getServiceTypes = async ({ queryKey }: any) => {
  const [, siteId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/service-types/${siteId}`).then(({ data }) => data);
};

export const getCostTrend = async ({ queryKey }: any) => {
  const [, siteId, costTrendLimit] = queryKey;

  return httpClient
    .get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoices/cost-trend/${siteId}?limit=${costTrendLimit}`)
    .then(({ data }) => data);
};

export const getSiteServices = async ({ queryKey }: any) => {
  const [, siteId, offset, limit, showTerminated] = queryKey;
  const config = {
    params: {
      offset,
      limit,
      show_terminated: showTerminated,
    },
  };
  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/site-services/${siteId}`, config).then(({ data }) => data);
};

export const getSiteInvoices = async ({ queryKey }: any) => {
  const [, siteId, offset, limit] = queryKey;

  return httpClient
    .get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoices/site-invoices/${siteId}?offset=${offset}&limit=${limit}`)
    .then(({ data }) => data);
};

export const getSiteInvoiceFile = async ({ queryKey }: any) => {
  const [, invoiceId] = queryKey;
  return httpClient.get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoices/invoice-file/${invoiceId}`).then(({ data }) => data);
};
