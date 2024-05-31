export interface ReportField {
	type: 'text' | 'select' | 'datePicker'
	name: string
	label?: string
	placeholder?: string
}

export interface Report {
	label: string
	reportName: string
	description: string
	title: string
	fields: ReportField[]
}

export interface ReportCategory {
	categoryName: string
	value: string
	reports: Report[]
}

interface AllReports {
	financeReports: ReportCategory
	inventoryReports: ReportCategory
	serviceManagementReports: ReportCategory
}

const financeReports: Report[] = [
	{
		label: 'F-1',
		reportName: 'Accrual Report',
		description: 'Estimate of the recommended amount to accrue at the end of a period',
		title: 'F-1 Accrual Report',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'F-3',
		reportName: 'Inactive Account Report',
		description: 'Lists all Accounts with no cost in the past 3 months',
		title: 'F-3 Inactive Account Report',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'F-4',
		reportName: 'Invoice Payment Report',
		description: 'List of all invoices during the selected period',
		title: 'F-4 Invoice Payment Report',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'F-5',
		reportName: 'Account History Report',
		description: 'Monthly spend listed by account for the selected dates',
		title: 'F-5 Account History Report',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'F-6',
		reportName: 'Account Fiscal Period Report',
		description: 'Spend by fiscal period listed by account for the selected dates',
		title: 'F-6 Account Fiscal Period Report',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'F-7',
		reportName: 'Service Cost Breakdown',
		description: 'A breakdown of total costs for the Service by month',
		title: 'F-7 Service Cost Breakdown',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
			{ type: 'select', name: 'serviceType', label: 'Service type' },
			{ type: 'select', name: 'currency', label: 'Currency' },
			{ type: 'select', name: 'reportPeriod', label: 'Report period' },
		],
	},
	{
		label: 'F-11',
		reportName: 'Allocations Report',
		description: 'Analysis of the allocations in the fiscal year',
		title: 'F-11 Allocations Report',
		fields: [
			{ type: 'select', name: 'account', label: 'Account' },
			{ type: 'select', name: 'year', label: 'Year' },
			{ type: 'select', name: 'currency', label: 'Currency' },
		],
	},
	{
		label: 'F-12',
		reportName: 'Service Type Cost Report',
		description: 'Analysis of the service type in the fiscal year',
		title: 'F-12 Service Type Cost Report',
		fields: [
			{ type: 'select', name: 'year', label: 'Year' },
			{ type: 'select', name: 'currency', label: 'Currency' },
		],
	},
	{
		label: 'F-13',
		reportName: 'Variance Report',
		description: 'Analysis of the variance in the given month',
		title: 'F-13 Variance Report',
		fields: [
			{ type: 'select', name: 'month', label: 'Month' },
			{ type: 'select', name: 'currency', label: 'Currency' },
			{
				type: 'text',
				name: 'variancePercentage',
				label: 'Variance percentage',
				placeholder: 'Enter variance percentage',
			},
			{
				type: 'text',
				name: 'variantDifference',
				label: 'Variant Difference',
				placeholder: 'Enter variance difference amount',
			},
		],
	},
	{
		label: 'F-15',
		reportName: 'Saving Tracker Report',
		description: 'A list of saving tracker items created for given client in a period',
		title: 'F-15 Saving Tracker Report',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
]

const inventoryReports: Report[] = [
	{
		label: 'I-2',
		reportName: 'Account List',
		description: 'A list of Accounts and their associated details and settings',
		title: 'I-2 Account List',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'I-4',
		reportName: 'Client Portal User List',
		description: 'A list of Accounts and their associated details and settings',
		title: 'I-4 Client Portal User List',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'I-5',
		reportName: 'Employee List',
		description: 'A list of Accounts and their associated details and settings',
		title: 'I-5 Employee List',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'I-7',
		reportName: 'Service List',
		description: 'A list of Accounts and their associated details and settings',
		title: 'I-7 Service List',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'I-8',
		reportName: 'Site List',
		description: 'A list of all sites and their addresses',
		title: 'I-8 Site List',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'I-10',
		reportName: 'GL Code List',
		description: 'A list of all GL Codes for a client',
		title: 'I-10 GL Code List',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'I-11',
		reportName: 'Vendor Document List',
		description: 'A list of all documents for a client',
		title: 'I-11 Vendor Document List',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
]

const serviceManagementReports: Report[] = [
	{
		label: 'S-1',
		reportName: 'Open Ticket Listing',
		description: 'A listing of all open tickets',
		title: 'S-1 Open Ticket Listing',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'S-2',
		reportName: 'Installation Report',
		description: 'A listing of all tickets awaiting installation / delivery',
		title: 'S-2 Installation Report',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'S-4',
		reportName: 'Service Request Analysis',
		description: 'A listing of all Service Requests and the associated installation date and billing verification',
		title: 'S-4 Service Request Analysis',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'S-5',
		reportName: 'Ticket Listing',
		description: 'A listing of all tickets created in the given period',
		title: 'S-5 Ticket Listing',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
	{
		label: 'S-6',
		reportName: 'Ticket Feedback',
		description: 'A listing of all ticket feedback created in the given period',
		title: 'S-6 Ticket Feedback',
		fields: [
			{ type: 'datePicker', name: 'From' },
			{ type: 'datePicker', name: 'To' },
		],
	},
]

const allReports: AllReports = {
	financeReports: {
		categoryName: 'Finance Reports',
		value: 'finance',
		reports: financeReports,
	},
	inventoryReports: {
		categoryName: 'Inventory Reports',
		value: 'inventory',
		reports: inventoryReports,
	},
	serviceManagementReports: {
		categoryName: 'Service Management Reports',
		value: 'service',
		reports: serviceManagementReports,
	},
}

export default allReports
