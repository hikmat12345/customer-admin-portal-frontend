import {
  getInvoiceActivityLog,
  getInvoiceSummary,
  getInvoices,
  getMonthlyInvoices,
  getPaymentInfo,
  getRemittanceAddress,
  getVendorInfo,
} from '@/services/accounts/accountsService';
import { useQuery } from '@tanstack/react-query';

export const useGetMonthlyInvoicesHome = () => useQuery({ queryKey: ['home_monthly_invs_kpis'], queryFn: getMonthlyInvoices });
export const useGetMonthlyInvoices = () => useQuery({ queryKey: ['invoices_monthly_invs_kpis'], queryFn: getMonthlyInvoices });

export const useGetInvoices = (
  offset: number,
  limit: number,
  account_number?: string | null,
  countryId?: number,
  vendor?: string | null,
  searchQuery?: string | null,
) =>
  useQuery({
    queryKey: ['invoices', offset, limit, account_number, countryId, vendor, searchQuery],
    queryFn: getInvoices,
  });

export const useGetInvoiceActivityLog = (invoiceId: number) =>
  useQuery({ queryKey: ['invoice_activity_log', invoiceId], queryFn: getInvoiceActivityLog });
export const useGetRemittanceAddress = (invoiceId: number) =>
  useQuery({ queryKey: ['remittance_address', invoiceId], queryFn: getRemittanceAddress });
export const useGetVendorInfo = (invoiceId: number) => useQuery({ queryKey: ['vendor_info', invoiceId], queryFn: getVendorInfo });
export const useGetPaymentInfo = (invoiceId: number) => useQuery({ queryKey: ['payment_info', invoiceId], queryFn: getPaymentInfo });
export const useGetInvoiceSummary = (invoiceId: number) =>
  useQuery({ queryKey: ['invoice_summary', invoiceId], queryFn: getInvoiceSummary });
