import { NEXT_PUBLIC_TICKET_SERVICE_URL } from 'config/config';
import httpClient from '../httpClient';

export const getAllTickets = async ({ queryKey }: any) => {
  const [, offset, limit, priority, status, account_number, searchQuery] = queryKey;

  const config = {
    params: {
      offset,
      limit,
      priority,
      status,
      account_number,
      searchQuery,
    },
  };

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket/all`, config).then(({ data }) => data);
};

export const getMonthlyTickets = async ({ queryKey }: any) => {
  const [, year, month, offset, limit] = queryKey;

  const config = {
    params: {
      month,
      year,
      offset,
      limit,
    },
  };

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket`, config).then(({ data }) => data);
};

export const getOpenTickets = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket/open`).then(({ data }) => data);
};

export const getVendorAccounts = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/vendor/accounts`).then(({ data }) => data);
};

export const getTicketSummary = async ({ queryKey }: any) => {
  const [, ticketId] = queryKey;

  return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket/ticket-summary/${ticketId}`).then(({ data }) => data);
};

export const getTicketSecondaryStatuses = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-secondary-status/all`).then(({ data }) => data);
};

export const getTicketUpdateStatuses = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-update-status/all`).then(({ data }) => data);
};

export const getUserDetails = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/user/user-details`).then(({ data }) => data);
};

export const postTicketUpdate = async (data: any) =>
  httpClient.post(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-update`, data).then(({ data }) => data);
