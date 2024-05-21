import { ReactNode } from 'react'

export interface Inventory {
	id: number
	serviceNumber: string
	live: number
	created: Date
	updated: Date
	serviceType: number
	costCentre: string
	companyNetwork: {
		id: number
		displayName: string
		network: {
			id: number
			name: string
		}
	}
}

export interface InventoryCardData {
	id: number
	title: string
	description: string
	data: ReactNode
}
