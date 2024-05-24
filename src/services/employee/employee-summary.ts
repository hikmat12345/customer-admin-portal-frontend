import httpClient from '../httpClient'
  
export const getEmployeeDetail = async ({ queryKey }: any) => {
	const [, employeeId] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_CUSTOMER_ADMIN_PORTAL}/employee/detail/${employeeId}`)
		.then(({ data }) => data)
}
export const getEmployeeCostTrend = async ({ queryKey }: any) => {
	const [, accountId] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVOICE}/invoices/employee-cost-trend/${accountId}`)
		.then(({ data }) => data)
}
 export const getEmployeeTickets = async ({ queryKey }: any) => {
	const [, employeeId, offset, limit] = queryKey

	return httpClient
		.get(`${process.env.NEXT_PUBLIC_BASE_URL_TICKETS}/tickets/employee-tickets/${employeeId}?offset=${offset}&limit=${limit}`)
		.then(({ data }) => data)
}