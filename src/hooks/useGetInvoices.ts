import { getInvoiceActivityLog, getInvoiceSummary, getInvoices, getMonthlyInvoices, getPaymentInfo, getRemittanceAddress, getVendorInfo } from '@/services/accounts/accountsService'
import { useQuery } from '@tanstack/react-query'

export const useGetMonthlyInvoices = () => {
	return useQuery({ queryKey: ['monthly_invoices'], queryFn: getMonthlyInvoices })
}

export const useGetInvoices = (
	offset: number,
	limit: number,
	account_number?: string | null,
	countryId?: number,
	vendor?: string | null,
	searchQuery?: string | null
) => {
	return useQuery({
		queryKey: ['invoices', offset, limit, account_number, countryId, vendor, searchQuery],
		queryFn: getInvoices,
	})
}
  
export const useGetInvoiceActivityLog = (invoiceId: number) => {
	return useQuery({ queryKey: ['invoice_activity_log', invoiceId], queryFn: getInvoiceActivityLog })
}
export const useGetRemittanceAddress = (invoiceId: number) => {
	return useQuery({ queryKey: ['remittance_address', invoiceId], queryFn: getRemittanceAddress })
}
export const useGetVendorInfo = (invoiceId: number) => {
	return useQuery({ queryKey: ['vendor_info', invoiceId], queryFn: getVendorInfo })
}
export const useGetPaymentInfo = (invoiceId: number) => {
	return useQuery({ queryKey: ['payment_info', invoiceId], queryFn: getPaymentInfo })
}
export const useGetInvoiceSummary = (invoiceId: number) => {
	return useQuery({ queryKey: ['invoice_summary', invoiceId], queryFn: getInvoiceSummary })
}