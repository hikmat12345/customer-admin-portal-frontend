import { NEXT_PUBLIC_INVENTORY_SERVICE_URL } from 'config/config';
import httpClient from '../httpClient';

export const getAssets = async ({ queryKey }: any) => {
  const [, offset, limit, searchQuery, assetType, status] = queryKey;

  const config = {
    params: {
      offset: offset,
      limit: limit,
      searchQuery: searchQuery,
      assetType: assetType,
      status: status,
    },
  };

  return httpClient
    .get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/assets/all`, config)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const getAssetById = async ({ queryKey }: any) => {
  const [, assetId] = queryKey;

  const config = {
    params: {
      asset_Id: assetId,
    },
  };

  return httpClient
    .get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/asset`, config)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const getAssetValueById = async ({ queryKey }: any) => {
  const [, assetId] = queryKey;

  const config = {
    params: {
      asset_Id: assetId,
    },
  };

  return httpClient
    .get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/asset/value`, config)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const getAssetSupportById = async ({ queryKey }: any) => {
  const [, assetId] = queryKey;

  const config = {
    params: {
      asset_Id: assetId,
    },
  };

  return httpClient
    .get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/asset/support`, config)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const getAssetKeyDatesById = async ({ queryKey }: any) => {
  const [, assetId] = queryKey;

  const config = {
    params: {
      asset_Id: assetId,
    },
  };

  return httpClient
    .get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/asset/key-dates-client-info`, config)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const getAssetDetailedInfoById = async ({ queryKey }: any) => {
  const [, assetId] = queryKey;

  const config = {
    params: {
      asset_Id: assetId,
    },
  };

  return httpClient
    .get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/asset/detailed-info`, config)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const getAssetChangeLogsById = async ({ queryKey }: any) => {
  const [, assetId] = queryKey;

  const config = {
    params: {
      asset_Id: assetId,
    },
  };

  return httpClient
    .get(`${NEXT_PUBLIC_INVENTORY_SERVICE_URL}/asset/change-log`, config)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};
