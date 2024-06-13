import {
  getAccountCostTrend,
  getAccountDetail,
  getAccountInvoices,
  getServiceLocations,
  getServiceTypesVendor,
  getVendorTickets,
} from '@/services/accounts/accountsService';
import { useQuery } from '@tanstack/react-query';

export const useGetAccountDetail = (account_id: number) =>
  useQuery({ queryKey: ['account_detail', account_id], queryFn: getAccountDetail });

export const useGetAccountCostTrend = (account_id: number, costTrendLimit:number) =>
  useQuery({ queryKey: ['account_cost_trend', account_id, costTrendLimit], queryFn: getAccountCostTrend });
export const useGetAccountInvoices = (account_id: number, offset: number, limit: number) =>
  useQuery({
    queryKey: ['account_invoices', account_id, offset, limit],
    queryFn: getAccountInvoices,
  });

//
export const useGetAccountTickets = (vendorId: number, offset: number, limit: number) =>
  useQuery({
    queryKey: ['account_tickets', vendorId, offset, limit],
    queryFn: getVendorTickets,
  });

export const useGetServiceLocations = (accountId: number) =>
  useQuery({
    queryKey: ['service_locations', accountId],
    queryFn: getServiceLocations,
  });

export const useGetServiceTypesVendor = (accountId: number) =>
  useQuery({
    queryKey: ['service_types_vendor', accountId],
    queryFn: getServiceTypesVendor,
  });
