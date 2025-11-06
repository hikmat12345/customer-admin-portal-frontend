import { NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_INVOICE_SERVICE_URL } from 'config/config';
import httpClient from '../httpClient';

const downloadFile = (blob: any, filename: string) => {
  const a = document.createElement('a');
  a.href = blob.data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(blob.data);
};
export const getAPFAccounts = async ({ queryKey }: any) => {
  const [, offset, limit, searchQuery, fiscalMonth, accountGroup, fiscalYear] = queryKey;
  const config = {
    params: {
      offset,
      limit,
      searchQuery,
      fiscalMonth,
      accountGroup,
      fiscalYear,
    },
  };
  return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/account-payable-feed`, config).then(({ data }) => data);
};

// getAPFDetail
export const getAPFDetail = async ({ queryKey }: any) => {
  const [, apfId] = queryKey;
  return httpClient
    .get(`${NEXT_PUBLIC_API_BASE_URL}/account-payable-feed/${apfId}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw error.response.data;
    });
};

const downloadApfAttachment = async (apfId: number, file: string, fileName: string) => {
  try {
    const response = await httpClient.post(`${NEXT_PUBLIC_API_BASE_URL}/account-payable-feed/files/${apfId}`);
    downloadFile(response.data, fileName);
  } catch (error) {
    console.error('Error in postReport catch block:', error);
    throw error;
  }
};

export const getAPFFiles = async ({ file, apfId, fileName }: any) => {
  await downloadApfAttachment(apfId, file, fileName);
};

export const getAPFInvoices = async ({ queryKey }: any) => {
  const [, apfId, offset, limit] = queryKey;
  const config = {
    params: {
      offset,
      limit,
    },
  };
  return httpClient
    .get(`${NEXT_PUBLIC_INVOICE_SERVICE_URL}/account-payable-feed-invoices/${apfId}`, config)
    .then(({ data }) => data)
    .catch((error) => {
      throw error.response.data;
    });
};
