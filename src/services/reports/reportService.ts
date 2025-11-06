import { NEXT_PUBLIC_REPORTING_SERVICE_URL } from 'config/config';
import httpClient from '../httpClient';

const downloadExcelFile = (blob: any, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

const postReport = async (url: string, data: any) => {
  try {
    const response = await httpClient.post(url, data, { responseType: 'blob' });
    const contentDisposition = response.headers['content-disposition'];
    let filename = '';
    if (contentDisposition && contentDisposition.includes('attachment')) {
      const matches = /filename="([^"]+)"/.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1];
      }
    }
    downloadExcelFile(response.data, filename);
  } catch (error) {
    console.error('Error in postReport catch block:', error);
    throw error; // Propagating error like this so react query can catch it
  }
};

export const postF1Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F1`, data);

export const postF3Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F3`, data);

export const postF4Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F4`, data);

export const postF5Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F5`, data);

export const postF6Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F6`, data);

export const postF7Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F7`, data);

export const postF12Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F12`, data);

export const postF15Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F15`, data);

export const postI8Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I8`, data);

export const postI10Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I10`, data);

export const postI2Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I2`, data);

export const postI7Report = async (data: any) =>
  httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I7`, data, { responseType: 'blob' })
    .then(({ data: responseData }) => downloadExcelFile(responseData, 'I7_report.xlsx'))
    .catch((error) => error);

export const postI4Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I4`, data);

export const postI5Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I5`, data);

export const postI11Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I11`, data);

export const postS1Report = (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S1`, data);

export const postS2Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S2`, data);

export const postS4Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S4`, data);

export const postS5Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S5`, data);

export const postS6Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S6`, data);

export const getScheduledReports = async ({ queryKey }: any) => {
  const [, searchQuery, frequency, status] = queryKey;
  const config = {
    params: {
      searchQuery,
      ...(frequency && { frequency: frequency }),
      status,
    },
  };

  return httpClient
    .get(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/scheduled-report/all`, config)
    .then(({ data }) => data)
    .catch((error) => error);
};

export const removeScheduledReports = async (data: any) => {
  return httpClient
    .delete(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/scheduled-report/remove`, { data: { id: data } })
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const postScheduledReportDownloadUrl = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/scheduled-report/presigned-url`, data)
    .then(({ data }) => data)
    .catch((error) => error);
};

export const postScheduleReport = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/scheduled-report/create`, data)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const updateScheduleReport = async ({ reportId, data }: any) => {
  return httpClient
    .put(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/scheduled-report/update/${reportId}`, data)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const getReportByCode = async ({ queryKey }: any) => {
  const [, code] = queryKey;

  if (!code) return null;

  return httpClient
    .get(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/scheduled-report/details/${code}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const getReportResults = async ({ queryKey }: any) => {
  const [, id] = queryKey;

  if (!id) return null;

  return httpClient
    .get(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/scheduled-report/results/${id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const getReportsList = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient
    .get(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/list/all`)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

export const getReportsLog = async ({ queryKey }: any) => {
  const [,] = queryKey;

  return httpClient
    .get(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/logs/all`)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};
