import { NEXT_PUBLIC_TICKET_SERVICE_URL } from 'config/config';
import httpClient from '../httpClient';

export const getAllTickets = async ({ queryKey }: any) => {
	const [, offset, limit, priority, status, accountNumber, searchQuery] = queryKey

	const config = {
		params: {
			offset: offset,
			limit: limit,
			priority: priority,
			status: status,
			accountNumber: accountNumber,
			searchQuery: searchQuery,
		},
	}

	return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/all-tickets`, config).then(({ data }) => data)
}

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

	return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/monthly-tickets`, config).then(({ data }) => data)
}

export const getOpenTickets = async ({ queryKey }: any) => {
  const [,] = queryKey;

	return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/open-tickets`).then(({ data }) => data)
}

export const getVendorAccounts = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/vendor/accounts`).then(({ data }) => data);
};

export const getTicketSummary = async ({ queryKey }: any) => {
  const [, ticketId] = queryKey;

	return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-summary/${ticketId}`).then(({ data }) => data)
}

export const getTicketSecondaryStatuses = async ({ queryKey }: any) => {
  const [,] = queryKey;

	return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-secondary-status`).then(({ data }) => data)
}

export const getTicketUpdateStatuses = async ({ queryKey }: any) => {
  const [,] = queryKey;

	return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-update-status`).then(({ data }) => data)
}

export const postTicketUpdate = async (data: any) =>
  httpClient.post(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/ticket-update`, data).then(({ data }) => data);
