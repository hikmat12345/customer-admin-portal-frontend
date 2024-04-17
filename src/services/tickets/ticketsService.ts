import httpClient from '../httpClient'

export const getAllTickets = async ({ queryKey }: any) => {
	const [, offset, limit, priority, status, account_number] = queryKey

	const config = {
		params: {
			offset: offset,
			limit: limit,
			priority: priority,
			status: status,
			account_number: account_number,
		},
	}

	return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/tickets/all`, config).then(({ data }) => data)
}

export const getMonthlyTickets = async ({ queryKey }: any) => {
	const [, year, month, offset, limit] = queryKey

	const config = {
		params: {
			month: month,
			year: year,
			offset: offset,
			limit: limit,
		},
	}

	return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/tickets`, config).then(({ data }) => data)
}

export const getOpenTickets = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/tickets/open`).then(({ data }) => data)
}

export const getVendorAccounts = async ({ queryKey }: any) => {
	const [,] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_TICKET_SERVICE_URL}/vendor/accounts`).then(({ data }) => data)
}
