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

export const postF1Report = async (data: any) =>
  httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F1`, data, { responseType: 'blob' })
    .then(({ data: responseData }) => downloadExcelFile(responseData, 'F1_report.xlsx'))
    .catch((error) => error);

export const postF3Report = async (data: any) =>
  httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F3`, data, { responseType: 'blob' })
    .then(({ data: responseData }) => downloadExcelFile(responseData, 'F3_report.xlsx'))
    .catch((error) => error);

export const postF4Report = async (data: any) =>
  httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F4`, data, { responseType: 'blob' })
    .then(({ data: responseData }) => downloadExcelFile(responseData, 'F4_report.xlsx'))
    .catch((error) => error);

export const postF5Report = async (data: any) =>
  httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F5`, data, { responseType: 'blob' })
    .then(({ data: responseData }) => downloadExcelFile(responseData, 'F5_report.xlsx'))
    .catch((error) => error);

export const postF6Report = async (data: any) =>
  httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F6`, data, { responseType: 'blob' })
    .then(({ data: responseData }) => downloadExcelFile(responseData, 'F6_report.xlsx'))
    .catch((error) => error);

export const postF7Report = async (data: any) =>
  httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F7`, data, { responseType: 'blob' })
    .then(({ data: responseData }) => downloadExcelFile(responseData, 'F7_report.xlsx'))
    .catch((error) => error);

export const postF12Report = async (data: any) =>
  httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F12`, data, { responseType: 'blob' })
    .then(({ data: responseData }) => downloadExcelFile(responseData, 'F12_report.xlsx'))
    .catch((error) => error);

export const postF15Report = async (data: any) =>
  httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F15`, data, { responseType: 'blob' })
    .then(({ data: responseData }) => downloadExcelFile(responseData, 'F15_report.xlsx'))
    .catch((error) => error);

export const postI8Report = async (data: any) =>
  httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I8`, data, { responseType: 'blob' })
    .then(({ data: responseData }) => downloadExcelFile(responseData, 'I-8 Site List.xlsx'))
    .catch((error) => error);

export const postI10Report = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I10`, data, { responseType: 'blob' })
    .then(({ data }) => downloadExcelFile(data, 'I-10 GL Code Listing.xlsx'))
    .catch((error) => error);
};

export const postI2Report = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I2`, data, { responseType: 'blob' })
    .then(({ data }) => downloadExcelFile(data, 'I-2 Account Listing.xlsx'))
    .catch((error) => error);
};

export const postI4Report = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I4`, data, { responseType: 'blob' })
    .then(({ data }) => downloadExcelFile(data, 'I-4 Client Portal Users.xlsx'))
    .catch((error) => error);
};

export const postI5Report = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I5`, data, { responseType: 'blob' })
    .then(({ data }) => downloadExcelFile(data, 'I-5 Employees.xlsx'))
    .catch((error) => error);
};

export const postI11Report = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I11`, data, { responseType: 'blob' })
    .then(({ data }) => downloadExcelFile(data, 'I-11 Vendor Documents.xlsx'))
    .catch((error) => error);
};

export const postS1Report = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S1`, data, { responseType: 'blob' })
    .then(({ data }) => downloadExcelFile(data, 'S-1 Open Ticket Listing.xlsx'))
    .catch((error) => error);
};

export const postS2Report = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S2`, data, { responseType: 'blob' })
    .then(({ data }) => downloadExcelFile(data, 'S-2 Installation Report.xlsx'))
    .catch((error) => error);
};

export const postS4Report = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S4`, data, { responseType: 'blob' })
    .then(({ data }) => downloadExcelFile(data, 'S-4 Service Request Analysis.xlsx'))
    .catch((error) => error);
};

export const postS5Report = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S5`, data, { responseType: 'blob' })
    .then(({ data }) => downloadExcelFile(data, 'S-5 Ticket Listing.xlsx'))
    .catch((error) => error);
};

export const postS6Report = async (data: any) => {
  return httpClient
    .post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/S6`, data, { responseType: 'blob' })
    .then(({ data }) => downloadExcelFile(data, 'S-6 Ticket Feedback.xlsx'))
    .catch((error) => error);
};
