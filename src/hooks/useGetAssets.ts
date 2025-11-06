import {
  getAssetById,
  getAssetChangeLogsById,
  getAssetDetailedInfoById,
  getAssetKeyDatesById,
  getAssets,
  getAssetSupportById,
  getAssetValueById,
} from '@/services/assets/assetService';
import { useQuery } from '@tanstack/react-query';

export const useGetAssets = (
  offset: number,
  limit: number,
  searchQuery?: string | undefined,
  assetType?: string | undefined,
  status?: string | undefined,
) => {
  return useQuery({
    queryKey: ['assets', offset, limit, searchQuery, assetType, status],
    queryFn: getAssets,
  });
};

export const useGetAssetById = (assetId: number) => {
  return useQuery({
    queryKey: ['asset', assetId],
    queryFn: getAssetById,
  });
};

export const useGetAssetValueById = (assetId: number) => {
  return useQuery({
    queryKey: ['asset-value', assetId],
    queryFn: getAssetValueById,
  });
};

export const useGetAssetSupportById = (assetId: number) => {
  return useQuery({
    queryKey: ['asset-support', assetId],
    queryFn: getAssetSupportById,
  });
};

export const useGetAssetKeyDatesById = (assetId: number) => {
  return useQuery({
    queryKey: ['asset-key-date', assetId],
    queryFn: getAssetKeyDatesById,
  });
};

export const useGetAssetDetailedInfoById = (assetId: number) => {
  return useQuery({
    queryKey: ['asset-detail-info', assetId],
    queryFn: getAssetDetailedInfoById,
  });
};

export const useGetAssetChangeLogById = (assetId: number) => {
  return useQuery({
    queryKey: ['asset-change-logs', assetId],
    queryFn: getAssetChangeLogsById,
  });
};
