import { NEXT_PUBLIC_REPORTING_SERVICE_URL } from 'config/config'
import httpClient from '../httpClient'

const downloadExcelFile = (blob: any, filename: string) => {
	const url = window.URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	document.body.appendChild(a)
	a.click()
	a.remove()
	window.URL.revokeObjectURL(url)
}

export const postF1Report = async (data: any) => {
	return httpClient
		.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F1`, data, { responseType: 'blob' })
		.then(({ data }) => downloadExcelFile(data, 'F1_report.xlsx'))
		.catch((error) => error)
}

export const postF3Report = async (data: any) => {
	return httpClient
		.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F3`, data, { responseType: 'blob' })
		.then(({ data }) => downloadExcelFile(data, 'F3_report.xlsx'))
		.catch((error) => error)
}

export const postF4Report = async (data: any) => {
	return httpClient
		.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F4`, data, { responseType: 'blob' })
		.then(({ data }) => downloadExcelFile(data, 'F4_report.xlsx'))
		.catch((error) => error)
}

export const postF5Report = async (data: any) => {
	return httpClient
		.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F5`, data, { responseType: 'blob' })
		.then(({ data }) => downloadExcelFile(data, 'F5_report.xlsx'))
		.catch((error) => error)
}

export const postF6Report = async (data: any) => {
	return httpClient
		.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F6`, data, { responseType: 'blob' })
		.then(({ data }) => downloadExcelFile(data, 'F6_report.xlsx'))
		.catch((error) => error)
}

export const postF7Report = async (data: any) => {
	return httpClient
		.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F7`, data, { responseType: 'blob' })
		.then(({ data }) => downloadExcelFile(data, 'F7_report.xlsx'))
		.catch((error) => error)
}

export const postF12Report = async (data: any) => {
	return httpClient
		.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F12`, data, { responseType: 'blob' })
		.then(({ data }) => downloadExcelFile(data, 'F12_report.xlsx'))
		.catch((error) => error)
}

export const postF15Report = async (data: any) => {
	return httpClient
		.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F15`, data, { responseType: 'blob' })
		.then(({ data }) => downloadExcelFile(data, 'F15_report.xlsx'))
		.catch((error) => error)
}

export const postI8Report = async (data: any) => {
	return httpClient
		.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I8`, data, { responseType: 'blob' })
		.then(({ data }) => downloadExcelFile(data, 'I8_report.xlsx'))
		.catch((error) => error)
}

export const postI10Report = async (data: any) => {
	return httpClient
		.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I10`, data, { responseType: 'blob' })
		.then(({ data }) => downloadExcelFile(data, 'I10_report.xlsx'))
		.catch((error) => error)
}

export const postI4Report = async (data: any) => {
	return httpClient
		.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/I4`, data, { responseType: 'blob' })
		.then(({ data }) => downloadExcelFile(data, 'I10_report.xlsx'))
		.catch((error) => error)
}
