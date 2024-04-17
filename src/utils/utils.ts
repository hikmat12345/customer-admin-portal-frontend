import { type ClassValue, clsx } from 'clsx'
import { difference } from 'next/dist/build/utils'
import { twMerge } from 'tailwind-merge'

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
