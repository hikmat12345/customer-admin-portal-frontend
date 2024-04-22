import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ServiceType } from './enums/serviceType.enum'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getTimeDifference(updated: string): string {
	const updatedTime = new Date(updated).getTime()
	const currentTime = new Date().getTime()
	const differenceInSeconds = Math.floor((currentTime - updatedTime) / 1000)
	if (differenceInSeconds < 60) {
		return 'just now'
	} else if (differenceInSeconds < 3600) {
		const minutes = Math.floor(differenceInSeconds / 60)
		return `${minutes} min${minutes > 1 ? 's' : ''} ago`
	} else if (differenceInSeconds < 86400) {
		const hours = Math.floor(differenceInSeconds / 3600)
		return `${hours} hour${hours > 1 ? 's' : ''} ago`
	} else {
		const days = Math.floor(differenceInSeconds / 86400)
		return `${days} day${days > 1 ? 's' : ''} ago`
	}
}

export const getFormattedTotal = (total: number) => {
	if (total >= 1000000) {
		return `${(total / 1000000).toFixed(2)}M`
	} else if (total >= 1000) {
		return `${(total / 1000).toFixed(2)}k`
	} else {
		return total?.toString()
	}
}

export function getServiceType(id: ServiceType): string {
	switch (id) {
		case ServiceType.BILLING:
			return 'Billing'
		case ServiceType.C_CAAS:
			return 'CCaaS'
		case ServiceType.FIXED_VOICE:
			return 'Voice'
		case ServiceType.MOBILE:
			return 'Mobile'
		case ServiceType.FIXED_DATA:
			return 'Fixed Data - Deprecated'
		case ServiceType.DATA_CIRCUIT:
			return 'Data Circuit'
		case ServiceType.PBX:
			return 'PBX Voice'
		case ServiceType.CONFERENCING:
			return 'Conferencing'
		case ServiceType.U_CAAS:
			return 'UCaaS'
		case ServiceType.UNKNOWN:
			return 'Unknown'
		case ServiceType.SUB_ACCOUNT:
			return 'Sub Account'
		case ServiceType.PUBLIC_CLOUD:
			return 'Public Cloud'
		case ServiceType.SERVICE_MANAGEMENT:
			return 'Service Management'
		case ServiceType.MICROSOFT365:
			return 'Microsoft 365 Services'
		case ServiceType.DATA_CENTRE:
			return 'Data Center'
		case ServiceType.OTHER:
			return 'Other'
		case ServiceType.VIRTUAL_FAX:
			return 'Virtual Fax'
		case ServiceType.CABLE_TV:
			return 'Cable TV'
		default:
			return ''
	}
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export const serviceOptions: { id: number; label: string }[] = Object.keys(ServiceType)
	.filter((key: string) => !isNaN(Number(ServiceType[key as keyof typeof ServiceType])))
	.map((key: string) => ({
		id: ServiceType[key as keyof typeof ServiceType],
		label: capitalize(key.toLowerCase().replace(/_/g, ' ')),
	}))
