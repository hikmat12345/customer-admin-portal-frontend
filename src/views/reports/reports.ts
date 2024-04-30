export interface Report {
	label: string
	reportName: string
	description: string
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
	},
	{
		label: 'F-2',
		reportName: 'CDR Report',
		description: 'Listing of all Call Records (CDRs) for the period and account selected',
	},
	{
		label: 'F-3',
		reportName: 'Inactive Account Report',
		description: 'Lists all Accounts with no cost in the past 3 months',
	},
	{
		label: 'F-4',
		reportName: 'Invoice Payment Report',
		description: 'List of all invoices during the selected period',
	},
	{
		label: 'F-5',
		reportName: 'Account History Report',
		description: 'Monthly spend listed by account for the selected dates',
	},
	{
		label: 'F-6',
		reportName: 'Account Fiscal Period Report',
		description: 'Spend by fiscal period listed by account for the selected dates',
	},
	{
		label: 'F-7',
		reportName: 'Service Cost Breakdown',
		description: 'A breakdown of total costs for the Service by month',
	},
	{
		label: 'F-9',
		reportName: 'Budget Report',
		description: 'Analysis of the budget to date in the fiscal year',
	},
	{
		label: 'F-10',
		reportName: 'Inactive Service Report',
		description: 'List of the services with zero usage',
	},
	{
		label: 'F-11',
		reportName: 'Allocations Report',
		description: 'Analysis of the allocations in the fiscal year',
	},
	{
		label: 'F-12',
		reportName: 'Service Type Cost Report',
		description: 'Analysis of the service type in the fiscal year',
	},
	{
		label: 'F-13',
		reportName: 'Variance Report',
		description: 'Analysis of the variance in the given month',
	},
	{
		label: 'F-15',
		reportName: 'Saving Tracker Report',
		description: 'A list of saving tracker items created for given client in a period',
	},
]

const inventoryReports: Report[] = [
	{
		label: 'I-2',
		reportName: 'Account List',
		description: 'A list of Accounts and their associated details and settings',
	},
	{
		label: 'I-4',
		reportName: 'Client Portal User List',
		description: 'A list of Accounts and their associated details and settings',
	},
	{
		label: 'I-5',
		reportName: 'Employee List',
		description: 'A list of Accounts and their associated details and settings',
	},
	{
		label: 'I-7',
		reportName: 'Service List',
		description: 'A list of Accounts and their associated details and settings',
	},
	{
		label: 'I-8',
		reportName: 'Site List',
		description: 'A list of all sites and their addresses',
	},
	{
		label: 'I-10',
		reportName: 'GL Code List',
		description: 'A list of all GL Codes for a client',
	},
	{
		label: 'I-11',
		reportName: 'Vendor Document List',
		description: 'A list of all documents for a client',
	},
]

const serviceManagementReports: Report[] = [
	{
		label: 'S-1',
		reportName: 'Open Ticket Listing',
		description: 'A listing of all open tickets',
	},
	{
		label: 'S-2',
		reportName: 'Installation Report',
		description: 'A listing of all tickets awaiting installation / delivery',
	},
	{
		label: 'S-4',
		reportName: 'Service Request Analysis',
		description: 'A listing of all Service Requests and the associated installation date and billing verification',
	},
	{
		label: 'S-5',
		reportName: 'Ticket Listing',
		description: 'A listing of all tickets created in the given period',
	},
	{
		label: 'S-6',
		reportName: 'Ticket Feedback',
		description: 'A listing of all ticket feedback created in the given period',
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
