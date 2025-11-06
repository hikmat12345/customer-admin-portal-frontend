import { NEXT_PUBLIC_API_BASE_URL } from 'config/config';
import httpClient from '../httpClient';

export const getSavingTracker = async ({ queryKey }: any) => {
  const [, offset, limit, searchQuery, account, status, period, serviceType, vendor, country] = queryKey;

  const config = {
    params: {
      offset: offset,
      limit: limit,
      searchQuery: searchQuery,
      account: account,
      status: status,
      period: period,
      serviceType: serviceType,
      vendor: vendor,
      countryId: country,
    },
  };

  return httpClient
    .get(`${NEXT_PUBLIC_API_BASE_URL}/saving-tracker`, config)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const getAllSavings = async ({ queryKey }: any) => {
  const [, period] = queryKey;

  const config = {
    params: {
      period: period,
    },
  };

  return httpClient
    .get(`${NEXT_PUBLIC_API_BASE_URL}/saving-tracker/all`, config)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const fetchAttachmentsMetadata = async ({ queryKey }: any) => {
  try {
    const [, id] = queryKey;

    const response = await httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/saving-tracker/attachments?id=${id}`);
    return response.data; // Metadata including file names
  } catch (error) {
    console.error('Error fetching attachments metadata:', error);
    throw error;
  }
};

export const getAttachmentBlob = async (id: number, fileName: string) => {
  try {
    const response = await httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/saving-tracker/attachment?id=${id}&fileName=${fileName}`, {
      responseType: 'blob', // Specify that you expect a Blob response
    });
    const blob = response.data;
    return blob;
  } catch (error) {
    console.error('Error fetching attachment:', error);
    throw error;
  }
};
