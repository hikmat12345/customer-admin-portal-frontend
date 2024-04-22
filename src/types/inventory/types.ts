import { ReactNode } from 'react'

export interface Inventory {
	id: number
	service_number: string
	live: number
	created: Date
	updated: Date
	service_type: number
	cost_centre: string
	companyNetwork: {
		id: number
		display_name: string
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
