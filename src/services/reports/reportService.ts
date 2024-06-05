import { NEXT_PUBLIC_REPORTING_SERVICE_URL } from 'config/config'
import httpClient from '../httpClient'

export const postF1Report = async (data: any) => {
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F1`, data).then(({ data }) => data)
}

export const postF3Report = async (data: any) => {
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F3`, data).then(({ data }) => data)
}

export const postF4Report = async (data: any) => {
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F4`, data).then(({ data }) => data)
}

export const postF5Report = async (data: any) => {
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F5`, data).then(({ data }) => data)
}

export const postF6Report = async (data: any) => {
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F6`, data).then(({ data }) => data)
}

export const postF7Report = async (data: any) => {
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F7`, data).then(({ data }) => data)
}

export const postF12Report = async (data: any) => {
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F12`, data).then(({ data }) => data)
}

export const postF15Report = async (data: any) => {
	return httpClient.post(`${NEXT_PUBLIC_REPORTING_SERVICE_URL}/F15`, data).then(({ data }) => data)
}
