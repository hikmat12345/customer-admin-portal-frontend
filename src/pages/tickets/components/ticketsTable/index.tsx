'use client'

import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table/table'
import Image from 'next/image'
import { Button } from '@veroxos/design-system'
import { TicketData, Tickets } from '@/types/tickets/types'
import TicketsTableHead from './ticketsTableHead'
import { getTimeDifference } from '@/utils/utils'
import { PRIORITY_COLOR_LIST, TICKETS_STATUS_LIST } from '@/utils/constants/statusList.constants'

const TicketsTable = ({ allTickets }: { allTickets: Tickets }) => {
	const isNoData = allTickets?.tickets?.length === 0

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
							<TableRow>
								<TableCell className="font-medium">
									<a className="text-[#1175BE]" href="/" target="_blank" type="link">{`SUP${ticket.id}`}</a>
								</TableCell>
								<TableCell>{ticket?.clientReferenceNo || '-'}</TableCell>
								<TableCell>{fullName}</TableCell>
								<TableCell>{ticket?.companyNetwork?.vendor.name || '-'}</TableCell>
								<TableCell>{ticket?.workflow?.name}</TableCell>
								<TableCell className={`${ticket?.ticketStatusId === 1 ? 'text-[#1D46F3]' : ''}`}>
									{TICKETS_STATUS_LIST[`${ticket?.ticketStatusId}`]}
								</TableCell>
								<TableCell>{updatedAt}</TableCell>
								<TableCell>
									<div
										className={`flex items-center justify-center w-9 h-9 m-auto rounded-full text-[#FFFFFF] bg-[${
											PRIORITY_COLOR_LIST[ticket?.priority]
										}]`}
									>{`P${ticket?.priority}`}</div>
								</TableCell>
								<TableCell className="text-right">
									<Button className="bg-transparent" size="sm">
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
