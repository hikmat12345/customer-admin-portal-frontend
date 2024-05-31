'use client'

import React from 'react'
import Image from 'next/image'
import { TicketData, Tickets } from '@/types/tickets/types'
import TicketsTableHead from './ticketsTableHead'
import { getTimeDifference } from '@/utils/utils'
import { PRIORITY_COLOR_LIST, TICKETS_STATUS_LIST } from '@/utils/constants/statusList.constants'
import Table from '@veroxos/design-system/dist/ui/Table/table'
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption'
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody'
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow'
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell'
import { Button } from '@veroxos/design-system/dist/ui/Button/button'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const TicketsTable = ({ allTickets }: { allTickets: Tickets }) => {
	const isNoData = allTickets?.tickets?.length === 0
	const router = useRouter();
	const pathname = usePathname();
	return (
		<div className="overflow-auto lg:max-h-[215px] xl:max-h-full">
			<Table>
				<TicketsTableHead />
				{isNoData && <TableCaption>No tickets available.</TableCaption>}

				<TableBody>
					{allTickets?.tickets?.map((ticket: TicketData) => {
						const fullName = ticket.employee ? `${ticket?.employee?.firstName} ${ticket?.employee?.lastName}` : '-'
						const updatedAt = getTimeDifference(ticket?.updated)

						return (
							<TableRow key={ticket.id}>
								<TableCell className="font-medium"> 
									<Link className="text-[#1175BE]" href={`${pathname}/ticket-summary/${ticket.id}`}>{`SUP${ticket.id}`}</Link>
								</TableCell>
								<TableCell>{ticket?.clientReferenceNo || '-'}</TableCell>
								<TableCell>{fullName}</TableCell>
								<TableCell>{ticket?.companyNetwork?.vendor?.name || '-'}</TableCell>
								<TableCell>{ticket?.workflow?.name}</TableCell>
								<TableCell className={`${ticket?.ticketStatusId === 1 ? 'text-[#1D46F3]' : ''}`}>
									{TICKETS_STATUS_LIST[`${ticket?.ticketStatusId}`]}
								</TableCell>
								<TableCell>{updatedAt}</TableCell>
								<TableCell>
									<div
										className={`flex items-center justify-center w-9 h-9 m-auto rounded-full text-[#FFFFFF]`}
										style={{ backgroundColor: PRIORITY_COLOR_LIST[ticket?.priority] }}
									>{`P${ticket?.priority}`}</div>
								</TableCell>
								<TableCell className="text-right">
									<Button variant="null" size="sm" 
									onClick={() => router.push(`${pathname}/ticket-summary/${ticket.id}`)}
									>
										<Image src="/svg/eye.svg" alt="Eye icon" width={18} height={18} />
									</Button>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}

export default TicketsTable
