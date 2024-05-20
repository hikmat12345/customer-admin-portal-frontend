'use client'

import SearchField from '@/components/ui/search-field'
import React, { useEffect } from 'react'
import ReportsCard from './components/reportsCard'
import TabsList from '@veroxos/design-system/dist/ui/TabsList/tabsList'
import TabsTrigger from '@veroxos/design-system/dist/ui/TabsTrigger/tabsTrigger'
import TabsContent from '@veroxos/design-system/dist/ui/TabsContent/tabsContent'
import Tabs from '@veroxos/design-system/dist/ui/Tabs/tabs'
import allReports, { ReportCategory } from './reports'
import CreateQueryString from '@/utils/createQueryString'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const ReportsPage = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const defaultTabValue = searchParams?.get('tab') || 'finance'
	const router = useRouter()
	const createQueryString = CreateQueryString()

	const handleTabChange = (value: string) => {
		router.push(`${pathname}?${createQueryString('tab', value)}`)
	}

	useEffect(() => {
		router.push(`${pathname}?${createQueryString('tab', 'finance')}`)
	}, [])

	return (
		<div>
			<div className="grid grid-auto-flow-column w-full bg-[#FFFFFF] border-[#ECECEC] rounded-lg px-9 py-5 gap-8">
				<div className="flex justify-start relative">
					<Tabs defaultValue={defaultTabValue} onValueChange={handleTabChange}>
						<TabsList className="flex gap-8 w-full justify-start">
							<TabsTrigger
								value="recent"
								className="px-3  data-[state=active]:bg-[#1D46F333] data-[state=active]:text-[#1D46F3] data-[state=active]:shadow"
							>
								Recent
							</TabsTrigger>
							<TabsTrigger value="finance" className="px-3">
								Finance Reports
							</TabsTrigger>
							<TabsTrigger value="inventory" className="px-3">
								Inventory Reports
							</TabsTrigger>
							<TabsTrigger value="service" className="px-3">
								Service Management Reports
							</TabsTrigger>
						</TabsList>
						{Object.values(allReports).map((category: ReportCategory) => (
							<TabsContent key={category.categoryName} value={category.value} className="mt-10">
								<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 h-[69vh] overflow-y-scroll">
									{category?.reports?.map((report) => (
										<ReportsCard
											key={report.label}
											label={report.label}
											description={report.description}
											reportName={report.reportName}
										/>
									))}
								</div>
							</TabsContent>
						))}
					</Tabs>
					<div className="absolute right-0">
						<SearchField
							className="rounded-none bg-transparent border-b ml-2 outline-none focus:border-[#44444480] w-[500px] xl:min-w-[350px] font-normal"
							iconWidth={16}
							iconHeight={16}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReportsPage
