import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ServiceType } from './enums/serviceType.enum'
import moment from 'moment';

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

// replacer all 
export function stringFindAndReplaceAll(str: string, find: string, replace: string, position: number = 0): string {
	const replaceData = str.split(find);
	return replaceData[position];
}

// Create number formatter.
export const moneyFormatter = (value: number, currency: string = 'USD') => {

	if (isNaN(value)) {
		return '-';
	}
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});

	return formatter.format(value);
}


export function downloadFile(givenFileType: string, response: { data:string , filetype: string }, invoice_id: string) {
	let base64String: string | null = null;
	let mimeType: string | null = null;
	let fileExtension: string | null = null;
    console.log(response , "response data",)
	if (givenFileType === "pdf") {
		base64String = response?.data ? Buffer.from(response?.data).toString('base64') : null;
		mimeType = "application/pdf";
		fileExtension = "pdf";
	} else if (givenFileType === "xls") {
		base64String = response?.data ? Buffer.from(response?.data).toString('base64') : null;
		mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		fileExtension = response?.filetype === "xls" ? "xls" : "xlsx";
	} else if(givenFileType === "docs") {
		base64String = response?.data ? Buffer.from(response?.data).toString('base64') : null;
		mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
		fileExtension = "csv";
	}

	if (base64String && mimeType && fileExtension) {
		const fileUrl = `data:${mimeType};base64,${base64String}`;
		const link = document.createElement('a');
		link.href = fileUrl;
		link.download = `${invoice_id}_invoice.${fileExtension}`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}

// Function to format a date in the specified format
const formatDate = (date: Date, format: string = 'DD/MM/YYYY HH:mm A'): string => {
  return moment(date).format(format);
};

export default formatDate;

//this will be like Jun 27, 2025
export const formatSeperateDate = (date: Date): string => {
  return moment(date).format('MMM DD, YYYY');
}

// utils/utils.ts
export const getServiceTypeColor = (serviceType: number) => {
    switch(serviceType) {
        case 1: return 'bg-[#F45E09]';
        case 14: return 'bg-[#4D077C]';
        case 15: return 'bg-[#282692]';
        case 2: return 'bg-[#e48d5b]';
        case 3: return 'bg-[#8febf4]';
        case 4: return 'bg-[#47f166]';
        case 5: return 'bg-[#f7af15]';
        case 6: return 'bg-[#f74443]';
        case 16: return 'bg-[#555400]';
        case 7: return 'bg-[#c0b6a1]';
        case 8: return 'bg-[#a0f0d7]';
        case 9: return 'bg-[#e4b5f1]';
        case 10: return 'bg-[#fc7474]';
        case 11: return 'bg-[#affaff]';
        case 12: return 'bg-[#56cd34]';
        case 13: return 'bg-[#818073]';
        case 17: return 'bg-[#868686]';
        case 18: return 'bg-[#f7af15]';
        default: return 'bg-blue-700';
    }
};

export const getServiceTypeSubColor = (serviceType: number) => {
    switch(serviceType) {
        case 1: return 'bg-[#F7AF1659]';
        case 14: return 'bg-[#f6e9ffcf]';
        case 2: return 'bg-[#F7AF1659]';
        case 3: return 'bg-[#8febf459]';
        case 4: return 'bg-[#bbf1c559]';
        case 5: return 'bg-[#f7af1511]';
        case 6: return 'bg-[#f7444399]';
        case 16: return 'bg-[#5554000a]';
        case 7: return 'bg-[#c0b6a1]';
        case 8: return 'bg-[#a0f0d7]';
        case 9: return 'bg-[#b6b5f1]';
        case 10: return 'bg-[#f1c4c4]';
        case 11: return 'bg-[#affaff]';
        case 12: return 'bg-[#e1fada]';
        case 13: return 'bg-[#818073]';
        case 17: return 'bg-[#ababab]';
        case 18: return 'bg-[#f7af15]';
        default: return 'bg-[#D2DAFD]';
    }
};

export const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]
