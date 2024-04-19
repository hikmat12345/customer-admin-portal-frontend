import React from 'react'
import AlertsTableHead from './alertsTableHead'
import Image from 'next/image'
import Table from '@veroxos/design-system/dist/ui/Table/table'
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody'
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell'
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow'

const AlertsTable = () => {
	return (
		<div className="overflow-auto lg:max-h-[220px] xl:max-h-full">
			<Table>
				<AlertsTableHead />
				{/* {isNoData && <TableCaption>No tickets available.</TableCaption>} */}
				<TableBody>
					<TableRow>
						<TableCell className="font-normal p-5 text-sm xl:text-base">High Spend Alert</TableCell>
						<TableCell className="font-normal text-justify p-5 text-sm xl:text-base">
							Lorem ipsum dolor sit amet consectetur. Eu viverra aenean amet lacinia sed ac malesuada in. Et pretium sit
							id sed amet enim.
						</TableCell>
						<TableCell className="font-normal p-5 text-sm xl:text-base">01/15/2024</TableCell>
						<TableCell className="">
							<Image
								src="/svg/highlightedCheckbox.svg"
								alt="Checked"
								width={20}
								height={20}
								style={{ alignSelf: 'center', margin: 'auto' }}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-normal p-5 text-sm xl:text-base">Saving Recommendation</TableCell>
						<TableCell className="font-normal text-justify p-5 text-sm xl:text-base">
							Lorem ipsum dolor sit amet consectetur. Eu viverra aenean amet lacinia sed ac malesuada in. Et pretium sit
							id sed amet enim.
						</TableCell>
						<TableCell className="font-normal p-5 text-sm xl:text-base">02/09/2024</TableCell>
						<TableCell className="">
							<Image
								src="/svg/disabledCheckbox.svg"
								alt="Checked"
								width={20}
								height={20}
								style={{ alignSelf: 'center', margin: 'auto' }}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-normal text-sm xl:text-base">Upgrade Approval</TableCell>
						<TableCell className="font-normal text-justify text-sm xl:text-base">
							Office ipsum you must be muted. 30,000ft incompetent wiggle resources level diarize.
						</TableCell>
						<TableCell className="font-normal text-sm xl:text-base">03/11/2024</TableCell>
						<TableCell>
							<Image
								src="/svg/highlightedCheckbox.svg"
								alt="Checked"
								width={20}
								height={20}
								style={{ alignSelf: 'center', margin: 'auto' }}
							/>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

export default AlertsTable
