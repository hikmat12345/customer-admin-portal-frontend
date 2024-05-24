'use client'
import React from 'react'
import { Separator } from "@/components/ui/separator"
import TableData, { CostTable, PlanTable } from './components/table/table'
import { useGetAssets, useGetCostPlan, useGetSingleServiceDetail, useGetTickets, useGetRecentActivity } from '@/hooks/useGetInventories'
import { useSearchParams } from 'next/navigation'
import TableBodySkeleton from '@/components/ui/table/tableBodySkeleton'
import { Table } from '@/components/ui/table/table'
import GeneralInfo from './components/general-info'
import { DeviceInfoCard } from './components/device-info-card'


const InventoryDetailPage = () => {
	const searchParams = useSearchParams()
	const [isActive, setActive] = React.useState('info')
	const search_id = searchParams.get('service_id')
	const { data: singleServiceData, isLoading: isServiceInfoLoader } = useGetSingleServiceDetail(Number(search_id))
	const { data: costPlanData, isLoading: isCostPlanLoading } = useGetCostPlan(Number(search_id))
	const { data: assetsData, isLoading: isAssetLoader } = useGetAssets(Number(search_id))	
	const { data: ticketsRecentActivityData, isLoading: isTicketsRecentActivityLoader } = useGetTickets(Number(search_id))
	const { data: recentActivityData, isLoading: isRecentActivityLoader } = useGetRecentActivity(Number(search_id))

	// const { id, service_number, cost_centre, service_type, spare, zero_usage_allowed, contract_start_date, contract_end_date, termination_date, scheduled_termination_date, scheduled_suspension_date, note, purpose_of_service, account_number, vendor, EmployeeData, serviceDescription}
	const {id, serviceNumber, costCentre, serviceType, spare, zeroUsageAllowed, contractStartDate, contractEndDate, terminationDate, scheduledTerminationDate, scheduledSuspensionDate, note, purposeOfService, accountNumber, vendor, employee, serviceDescription}= singleServiceData?.data?.general_info || {}
	 const site = singleServiceData?.data?.site || {}
	const { deviceid, simNumber, datePurchased, deviceName, status, image } = assetsData?.data[0] || {}
	
	const scrollToSection = (id: string) => {
		const section = document.getElementById(id);
		if (section) {
			setActive(id)
			section.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	// make image url from base64 string
	const base64String = image ? Buffer.from(image).toString('base64') : null;
	const imageUrl = base64String ? `data:image/png;base64,${base64String}` : "/device-image.png";

	return (
		<div className='w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg py-5 px-7 '>
			{/* tabs for navigation */}
			<ul className='w-[828px] max-lg:w-[100%]  h-[19px] justify-start items-start gap-[30px] max-lg:gap-[5px] max-lg:mb-5 flex-wrap inline-flex pb-12'>
				<button className={`py-1 px-2 text-zinc-600 lg:text-[14px] xl:text-[16px] font-normal ${isActive === 'general-info' && 'active-tab'}`} onClick={() => scrollToSection("general-info")}  >General Information</button>
				<button className={`py-1 px-2 text-zinc-600 lg:text-[14px] xl:text-[16px] font-normal ${isActive === 'device-information' && 'active-tab'}`} onClick={() => scrollToSection('device-information')} >Device Information</button>
				<button className={`py-1 px-2 text-zinc-600 lg:text-[14px] xl:text-[16px] font-normal ${isActive === 'cost-and-plan' && 'active-tab'}`} onClick={() => scrollToSection('cost-and-plan')} >Plans & Features</button>
				<button className={`py-1 px-2 text-zinc-600 lg:text-[14px] xl:text-[16px] font-normal ${isActive === 'tickets' && 'active-tab'}`} onClick={() => scrollToSection('tickets')} >Tickets</button>
				<button className={`py-1 px-2 text-zinc-600 lg:text-[14px] xl:text-[16px] font-normal ${isActive === 'activity' && 'active-tab'}`} onClick={() => scrollToSection('activity')} >Recent Activity</button>
			</ul>
			<div className='mt-2 rounded-lg border border-neutral-300 p-5  overflow-y-scroll h-[75vh]'>

				<div id="general-info">
					<GeneralInfo
						label='General Information'
						isLoading={isServiceInfoLoader}
						data={{
							veroxosId: id,
							serviceNumber: serviceNumber,
							vendor,
							account: accountNumber,
							serviceType: serviceType,
							serviceDescription: serviceDescription?.name,
							employee: employee,
							purposeOfService: purposeOfService,
							contractStartDate: contractStartDate,
							contractEndDate: contractEndDate,
							spare: spare,
							zeroUsageAllowed: zeroUsageAllowed,
							terminationDate: terminationDate,
							scheduledTerminationDate: scheduledTerminationDate,
							scheduledSuspensionDate: scheduledSuspensionDate,
							notes: note,
							site: site,
						}}
					/>
					<Separator className='h-[1.5px] bg-[#5d5b5b61]' />
				</div>
 
				<div id="device-information">
					<DeviceInfoCard
						label="Device Information"
						imageUrl={imageUrl}
						deviceName={deviceName}
						datePurchased={datePurchased}
						status={status?.name}
						deviceid={deviceid}
						simNumber={simNumber}
						isAssetLoader={isAssetLoader}
					/>
				</div>
 
				<div id="cost-and-plan">
					<div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pt-8 '>Plan & Cost</div>
					  {isCostPlanLoading ? <Table><TableBodySkeleton rowCount={2} columnCount={2} /></Table> :
						<>
							<PlanTable data={costPlanData?.data?.plan} />
							<CostTable data={costPlanData?.data?.cost} costCenter={costCentre} />
						</>}
					<Separator className='h-[2.2px] mt-4 bg-[#5d5b5b61]' />
				</div>
 
				<div id="tickets">
					<TableData
						label="Tickets"
						loading={isTicketsRecentActivityLoader}
						data={ticketsRecentActivityData?.data?.tickets}
					/>
					<Separator className='h-[2.0px] bg-[#5d5b5b61]  mt-8' />
				</div>
 
				<div id="activity">
					<TableData
						label="Recent Activity"
						data={recentActivityData?.data?.recent_activity}
						loading={isRecentActivityLoader}
					/>
				</div>
			</div>
		</div>
	)
}

export default InventoryDetailPage
