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
    console.error('Error downloading the report:', error);
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

export const postI4Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I4`, data);

export const postI5Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I5`, data);

export const postI11Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I11`, data);

export const postS1Report = (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S1`, data);

export const postS2Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S2`, data);

export const postS4Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S4`, data);

export const postS5Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S5`, data);

export const postS6Report = async (data: any) => postReport(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S6`, data);
