import { getAPFAccounts, getAPFDetail, getAPFFiles, getAPFInvoices } from '@/services/accountPayableFeed/APFAccountService';
import { createMutationWithVariables } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

export const useGetAPFAccount = (
  offset: number,
  limit: number,
  searchQuery?: string | undefined,
  fiscalMonth?: string | undefined,
  accountGroup?: string | undefined,
  fiscalYear?: string | undefined,
) =>
  useQuery({
    queryKey: ['all_apf_accounts', offset, limit, searchQuery, fiscalMonth, accountGroup, fiscalYear],
    queryFn: getAPFAccounts,
  });

// useGetAPFDetail
export const useGetAPFDetail = (apfId: number) =>
  useQuery({
    queryKey: ['apf_detail', apfId],
    queryFn: getAPFDetail,
  });

export const useGetAPFInvoices = (apfId: number, offset: number, limit: number) =>
  useQuery({
    queryKey: ['apf_invoices', apfId, offset, limit],
    queryFn: getAPFInvoices,
  });

export const { useMutation: useGetAPFDetailFiles } = createMutationWithVariables('get-apf-attachment', getAPFFiles);
