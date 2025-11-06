import { fetchAttachmentsMetadata, getAllSavings, getSavingTracker } from '@/services/saving-tracker/savingTrackerService';
import { useQuery } from '@tanstack/react-query';

export const useGetSavingTracker = (
  offset: number,
  limit: number,
  searchQuery?: string | undefined,
  account?: string | null,
  status?: number | null,
  period?: number | undefined,
  serviceType?: string | null,
  vendor?: string | null,
  country?: string | null,
) => {
  return useQuery({
    queryKey: ['saving-tracker', offset, limit, searchQuery, account, status, period, serviceType, vendor, country],
    queryFn: getSavingTracker,
  });
};

export const useGetAllSavings = (period?: number | undefined) => {
  return useQuery({
    queryKey: ['all-savings', period],
    queryFn: getAllSavings,
  });
};

export const useGetAllAttachments = (id: number | undefined) => {
  return useQuery({
    queryKey: ['attachments', id],
    queryFn: fetchAttachmentsMetadata,
  });
};
