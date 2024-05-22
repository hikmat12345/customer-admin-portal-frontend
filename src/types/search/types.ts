import { ServiceType } from '@/utils/enums/serviceType.enum'

export interface ISearch {
	id: number
	client: number
	result: string
	type: ServiceType
	account: number
}
