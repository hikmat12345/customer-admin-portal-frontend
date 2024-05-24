import httpClient from '../httpClient'
 

// single-detail/service_id 
export const getSiteDetail = async ({ queryKey }: any) => {
	const [, siteId] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL_CUSTOMER_ADMIN_PORTAL}/site/site-detail/${siteId}`)
		.then(({ data }) => data)
}

export const getSiteTickets = async ({ queryKey }: any) => {
	const [, siteId,
		offset,
		limit] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL_TICKETS}/tickets/site-tickets?site_id=${siteId}&offset=${offset}&limit=${limit}`)
		.then(({ data }) => data)
}

 export const getServiceTypes = async ({ queryKey }: any) => {
	const [, siteId] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVENTORY}/inventory/service-types/${siteId}`)
		.then(({ data }) => data)
}

export const getCostTrend = async ({ queryKey }: any) => {
	const [, siteId] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVOICE}/invoices/cost-trend/?site_id=${siteId}`)
		.then(({ data }) => data)
}

export const getSiteServices = async ({ queryKey }: any) => {
	const [, siteId, offset, limit, showTerminated] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVENTORY}/inventory/site-services/${siteId}?offset=${offset}&limit=${limit}&show_terminated=${showTerminated}`)
		.then(({ data }) => data)
}

 export const getSiteInvoices = async ({ queryKey }: any) => {
	const [, siteId, offset, limit] = queryKey

	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVOICE}/invoices/site-invoices?site_id=${siteId}&offset=${offset}&limit=${limit}`)
		.then(({ data }) => data)
}

export const getSiteInvoiceFile = async ({ queryKey }: any) => {
	const [, invoiceId] = queryKey
	return httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL_INVOICE}/invoices/invoice-file?invoice_id=${invoiceId}`)
		.then(({ data }) => data)
}