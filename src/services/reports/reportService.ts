import { NEXT_PUBLIC_REPORTING_SERVICE_URL } from 'config/config'
import httpClient from '../httpClient'

export const postF1Report = async (data: any) => {
	const headers = {
		'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	}

	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}api/v2/F1`, data, { headers }).then(({ data }) => data)
}

export const postF3Report = async (data: any) => {
	const headers = {
		'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	}
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/api/v2/F3`, data, { headers }).then(({ data }) => data)
}

export const postF4Report = async (data: any) => {
	const headers = {
		'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	}
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/api/v2/F4`, data, { headers }).then(({ data }) => data)
}

export const postF5Report = async (data: any) => {
	const headers = {
		'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	}
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/api/v2/F5`, data, { headers }).then(({ data }) => data)
}

export const postF6Report = async (data: any) => {
	const headers = {
		'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	}
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/api/v2/F6`, data, { headers }).then(({ data }) => data)
}

export const postF7Report = async (data: any) => {
	const headers = {
		'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	}
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/api/v2/F7`, data, { headers }).then(({ data }) => data)
}

export const postF12Report = async (data: any) => {
	const headers = {
		'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	}
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/api/v2/F12`, data, { headers }).then(({ data }) => data)
}

export const postF15Report = async (data: any) => {
	const headers = {
		'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	}
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/api/v2/F15`, data, { headers }).then(({ data }) => data)
}
