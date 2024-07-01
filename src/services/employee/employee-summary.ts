import {
  NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_INVENTORY_SERVICE_URL,
  NEXT_PUBLIC_INVOICE_SERVICE_URL,
  NEXT_PUBLIC_TICKET_SERVICE_URL,
} from 'config/config';
import httpClient from '../httpClient';

export const getEmployeeDetail = async ({ queryKey }: any) => {
  const [, employeeId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/employee/detail/${employeeId}`).then(({ data }) => data);
};
export const getEmployeeCostTrend = async ({ queryKey }: any) => {
  const [, accountId, costTrendLimit] = queryKey;

  return httpClient
    .get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/invoices/employee-cost-trend/${accountId}?limit=${costTrendLimit}`)
    .then(({ data }) => data);
};
export const getEmployeeTickets = async ({ queryKey }: any) => {
  const [, employeeId, offset, limit] = queryKey;

  return httpClient
    .get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/employee-tickets/${employeeId}?offset=${offset}&limit=${limit}`)
    .then(({ data }) => data);
};
// getEmployeeServiceTypes
export const getEmployeeServiceTypes = async ({ queryKey }: any) => {
  const [, employeeId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/service-types-employee/${employeeId}`).then(({ data }) => data);
};
// getEmployeeServices
export const getEmployeeServices = async ({ queryKey }: any) => {
  const [, employeeId, offset, limit, showTerminated] = queryKey;

  return httpClient
    .get(
      `${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/inventory/site-services-employee/${employeeId}?offset=${offset}&limit=${limit}&showTerminated=${showTerminated}`,
    )
    .then(({ data }) => data);
};

export const getAllEmployees = async ({ queryKey }: any) => {
  const [, offset, limit, status, searchQuery] = queryKey;

  const config = {
    params: {
      offset,
      limit,
      status,
      searchQuery,
    },
  };

  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/employee`, config).then(({ data }) => data);
};
