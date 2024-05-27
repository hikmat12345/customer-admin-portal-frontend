import Table from '@veroxos/design-system/dist/ui/Table/table'
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption'
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell'
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody'
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow'
import InventoryTableHead from './inventoryTableHead'
import { Inventory } from '@/types/inventory/types'
import { getServiceType } from '@/utils/utils'
import { Button } from '@veroxos/design-system/dist/ui/Button/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const InventoryTable = ({ data }: any) => {
	const STATUS_NAME: Record<number, string> = {
		0: 'Terminated',
		1: 'Live',
	}
    const router = useRouter()
	const isNoData = data?.length === 0
//    go with service_id whehn click 
   const handleServiceClick = (id: number) => {
 		router.push(`/inventory/service-summary?service_id=${id}`)
	}
	return (
		<div className="overflow-auto lg:max-h-[225px] xl:max-h-full">
			<Table>
				<InventoryTableHead />
				{isNoData && <TableCaption>No inventories available.</TableCaption>} 
				<TableBody>
					{data?.map((inventory: Inventory) => {
						return (
							<TableRow key={inventory.id}>
								<TableCell className="font-normal py-[19px]">{inventory?.id}</TableCell>
								<TableCell>{inventory?.serviceNumber || '-'}</TableCell>
								<TableCell>{inventory?.companyNetwork?.network?.name}</TableCell>
								<TableCell>{getServiceType(inventory?.serviceType) || '-'}</TableCell>
								<TableCell>{STATUS_NAME[inventory?.live]}</TableCell>
								<TableCell>{'-'}</TableCell>
								<TableCell>{inventory?.costCentre || '-'}</TableCell>
								<TableCell>
									<div className="flex items-center justify-end">
										<Button variant="null" size="sm">
 											<Image src="/svg/pencil.svg" alt="Pencil icon" width={18} height={18} />
										</Button>
										<Button variant="null" size="sm" onClick={() => handleServiceClick(inventory.id)}>
 											<Image src="/svg/eye.svg" alt="Eye icon" width={18} height={18} />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}

export default InventoryTable
