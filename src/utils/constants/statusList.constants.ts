export const TICKETS_STATUS_LIST: Record<string, string> = Object.freeze({
	'1': 'Open',
	'2': 'Closed',
	'3': 'Awaiting Client',
	'4': 'Awaiting Vendor',
	'5': 'Awaiting Reminder',
	'6': 'Awaiting Invoice',
	'7': 'Awaiting Approval',
	'8': 'Awaiting Shipping',
})

export const PRIORITY_LIST: Record<string, string> = Object.freeze({
	'1': 'P1',
	'2': 'P2',
	'3': 'P3',
	'4': 'P4',
})

export const PRIORITY_COLOR_LIST: Record<number, string> = Object.freeze({
	1: '#E41323',
	2: '#DB7527',
	3: '#219653',
	4: '#219653',
})

export const TICKETS_STATUS_COLOR_LIST : Record<string, string> = Object.freeze({
	1: '#1D46F3',
	2: '#575757',
	3: '#000000',
	4: '#000000',
	5: '#000000',
	6: '#000000',
	7: '#000000',
	8: '#000000',
})
