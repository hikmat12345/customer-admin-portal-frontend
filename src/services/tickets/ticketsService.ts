import { NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_TICKET_SERVICE_URL } from 'config/config';
import httpClient from '../httpClient';

const downloadFile = (blob: any, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

const downloadTicketUpdateAttachment = async (ticketUpdateId: number, fileName: string) => {
  try {
    const response = await httpClient.post(
      `${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-update-attachment/${ticketUpdateId}`,
      {},
      { responseType: 'blob' },
    );
    downloadFile(response.data, fileName);
  } catch (error) {
    console.error('Error in postReport catch block:', error);
    throw error;
  }
};

export const getTicketUpdateAttachment = async ({ ticketUpdateId, fileName }: any) =>
  await downloadTicketUpdateAttachment(ticketUpdateId, fileName);

export const getAllTickets = async ({ queryKey }: any) => {
  const [, offset, limit, priority, status, accountNumber, searchQuery] = queryKey;

  const config = {
    params: {
      offset: offset,
      limit: limit,
      priority: priority,
      status: status,
      accountNumber: accountNumber,
      searchQuery: searchQuery,
    },
  };

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/all-tickets`, config).then(({ data }) => data);
};

export const getAllTicketsByAssetId = async ({ queryKey }: any) => {
  const [, assetId] = queryKey;

  const config = {
    params: {
      assetId: assetId,
    },
  };

  return httpClient
    .get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket`, config)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
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

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/monthly-tickets`, config).then(({ data }) => data);
};

export const getMonthlyTicketsStats = async ({ queryKey }: any) => {
  const [, year, month] = queryKey;

  const config = {
    params: {
      month,
      year,
    },
  };

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/monthly-tickets-stats`, config).then(({ data }) => data);
};

export const getOpenTickets = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/open-tickets`).then(({ data }) => data);
};

export const getVendorAccounts = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/vendor/accounts`).then(({ data }) => data);
};

export const getTicketSummary = async ({ queryKey }: any) => {
  const [, ticketId] = queryKey;

  return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-summary/${ticketId}`).then(({ data }) => data);
};

export const getTicketSecondaryStatuses = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-secondary-status`).then(({ data }) => data);
};

export const getTicketUpdateStatuses = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-update-status`).then(({ data }) => data);
};

export const postTicketUpdate = async (data: any) =>
  httpClient.post(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-update`, data).then(({ data }) => data);
