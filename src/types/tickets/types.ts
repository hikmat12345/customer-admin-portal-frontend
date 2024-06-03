export interface Ticket {
	id: number
	companyId: number
	created?: Date
	updated?: string
	incidentStatusId?: Date
}

export interface TicketSecondaryStatus {
	id: number,
	order: number,
	name: string,
	description: string
	active?: boolean
	next?: boolean
	stage:boolean
}

export interface TicketsData {
	tickets: Ticket[]
	totalMonthTickets: number
	percentageDifference: number
	averageScore: number
}

export interface OpenTicketsData {
	count: number
	tickets: Ticket[]
}

export interface ClosedTicketsLast24HoursData {
	count: number
	tickets: Ticket[]
}

export interface StatusCountsData {
	[status: string]: number
}

export interface OpenTicketSummary {
	openTickets: OpenTicketsData
	closedTicketsLast24Hours: ClosedTicketsLast24HoursData
	statusCounts: StatusCountsData
}

export interface TicketData {
	id: number
	companyId: number
	clientReferenceNo: string
	priority: number
	ticketStatusId: number
	workflowId: number
	updated: string
	created: string
	employee: {
		id: number
		firstName: string
		lastName: string
	} | null
	companyNetwork: {
		id: number
		vendor: {
			id: number
			name: string
		}
	} | null
	workflow: {
		id: number
		name: string
	}
}

export interface Tickets {
	total: number
	tickets: TicketData[]
}

export interface MonthlyTicketsResponse {
	tickets: {
		data: TicketData[]
		count: number
	}
	totalMonthTickets: number
	percentageDifference: number
	difference: number
	averageScore: number
	offset: number
	limit: number
}

export interface VendorAccount {
	id?: number
	networkId?: number
	displayName: string
	account_no: string
}

export interface ReactHtmlParserNode {
	type: string;
	name: string;
	children: ReactHtmlParserNode[];
	data: string;
}

export interface TicketUpdate {
	id: number;
	created: string;
	description: string;
	user?: {
		firstName: string;
		lastName: string;
	};
	ticketUpdateStatus: {
		name: string;
	};
	administrator?: {
		firstName: string;
		lastName: string;
	};
}
