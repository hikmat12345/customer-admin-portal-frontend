import {
  NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_INVENTORY_SERVICE_URL,
  NEXT_PUBLIC_INVOICE_SERVICE_URL,
  NEXT_PUBLIC_TICKET_SERVICE_URL,
} from 'config/config';
import httpClient from '../httpClient';

export const getInvoices = async ({ queryKey }: any) => {
  const [, offset, limit, account_number, countryId, vendor, searchQuery] = queryKey;
  const config = {
    params: {
      limit: limit,
      offset: offset,
      account: account_number,
      countryId: countryId,
      vendor: vendor,
      searchQuery: searchQuery,
    },
  };
  return httpClient.get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoices`, config).then(({ data }) => data);
};

export const getMonthlyInvoices = async ({ queryKey }: any) => {
  const [,] = queryKey;
  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/invoices/summary`).then(({ data }) => data);
};

export const getCostSavings = async ({ queryKey }: any) => {
  const [, year] = queryKey;
  const config = {
    params: {
      year: year,
    },
  };
  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/cost-savings`, config).then(({ data }) => data);
};

export const getAccountDetail = async ({ queryKey }: any) => {
  const [, accountId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/account/detail/${accountId}`).then(({ data }) => data);
};
export const getAccountCostTrend = async ({ queryKey }: any) => {
  const [, accountId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoices/account-cost-trend/${accountId}`).then(({ data }) => data);
};

export const getInvoiceActivityLog = async ({ queryKey }: any) => {
  const [, invoiceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoice-summary/activity-log/${invoiceId}`).then(({ data }) => data);
};
export const getRemittanceAddress = async ({ queryKey }: any) => {
  const [, invoiceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoice-summary/remittance-address/${invoiceId}`).then(({ data }) => data);
};

export const getVendorInfo = async ({ queryKey }: any) => {
  const [, vendorId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoice-summary/vendor-info/${vendorId}`).then(({ data }) => data);
};

export const getPaymentInfo = async ({ queryKey }: any) => {
  const [, invoiceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoice-summary/payment-info/${invoiceId}`).then(({ data }) => data);
};

export const getInvoiceSummary = async ({ queryKey }: any) => {
  const [, invoiceId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoice-summary/${invoiceId}`).then(({ data }) => data);
};
export const getAccountInvoices = async ({ queryKey }: any) => {
  const [, accountId, offset, limit] = queryKey;
  return httpClient
    .get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoices/account-invoices/${accountId}?offset=${offset}&limit=${limit}`)
    .then(({ data }) => data);
};
export const getVendorTickets = async ({ queryKey }: any) => {
  const [, vendorId, offset, limit] = queryKey;

  return httpClient
    .get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/vendor-tickets/${vendorId}?offset=${offset}&limit=${limit}`)
    .then(({ data }) => data);
};
export const getServiceLocations = async ({ queryKey }: any) => {
  const [, accountId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/service-locations/${accountId}`).then(({ data }) => data);
};
export const getServiceTypesVendor = async ({ queryKey }: any) => {
  const [, accountId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/service-types-vendor/${accountId}`).then(({ data }) => data);
};
