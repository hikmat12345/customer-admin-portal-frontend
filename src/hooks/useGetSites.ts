import {
  getCostTrend,
  getServiceTypes,
  getSiteDetail,
  getSiteInvoiceFile,
  getSiteInvoices,
  getSiteServices,
  getSiteTickets,
} from '@/services/site/site-summary';
import { useQuery } from '@tanstack/react-query';

export const useGetSiteDetail = (site_id: number) => useQuery({ queryKey: ['site_detail', site_id], queryFn: getSiteDetail });
export const useGetSiteTickets = (site_id: number, offset: number, limit: number) =>
  useQuery({
    queryKey: ['site_tickets', site_id, offset, limit],
    queryFn: getSiteTickets,
  });
export const useGetServiceTypes = (site_id: number) => useQuery({ queryKey: ['service_types', site_id], queryFn: getServiceTypes });
export const useGetCostTrend = (site_id: number, costTrendLimit: number) =>
  useQuery({ queryKey: ['cost_trend', site_id, costTrendLimit], queryFn: getCostTrend });
export const useGetSiteServices = (site_id: number, offset: number, limit: number, showTerminated: boolean) =>
  useQuery({ queryKey: ['site_services', site_id, offset, limit, showTerminated], queryFn: getSiteServices });
export const useGetSiteInvoices = (site_id: number, offset: number, limit: number) =>
  useQuery({ queryKey: ['site_invoices', site_id, offset, limit], queryFn: getSiteInvoices });
export const useGetSiteInvoiceFile = (invoice_id: string) =>
  useQuery({
    queryKey: ['site_invoice_file', invoice_id],
    queryFn: getSiteInvoiceFile,
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });
