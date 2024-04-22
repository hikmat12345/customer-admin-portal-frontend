import { useGetVendorsByCountries } from '@/hooks/useGetVendorByCountries'
import { useGetVendors } from '@/hooks/useTickets'
import { VendorAccount } from '@/types/tickets/types'
import { serviceOptions } from '@/utils/utils'

const useGetMenuOptions = () => {
	const { data: vendorAccounts } = useGetVendors()
	const { data } = useGetVendorsByCountries()

	const filterVendorAccounts = vendorAccounts?.map((item: VendorAccount) => ({
		value: item?.account_no,
		label: item?.displayName,
	}))

	const filterServiceType = serviceOptions?.map((item: { id: number; label: string }) => ({
		value: item?.id,
		label: item?.label,
	}))

	const vendorOptions: { [key: string]: any[] } = {}

	if (data && typeof data === 'object') {
		Object.entries(data).forEach(([country, vendors]) => {
			;(vendors as any[]).forEach((vendor: any) => {
				const vendorName = vendor.network.name
				if (!vendorOptions[country]) {
					vendorOptions[country] = []
				}
				if (!vendorOptions[country].find((existingVendor) => existingVendor.label === vendorName)) {
					vendorOptions[country].push({
						label: vendorName,
						value: vendorName,
						account_number: vendor?.account_number,
						country: vendor?.network?.country?.name,
					})
				}
			})
		})
	}

	const menuOptions = [
		{
			name: 'Account',
			value: 'account',
			options: filterVendorAccounts,
		},
		{
			name: 'Vendor',
			value: 'vendor',
			options: Object.entries(vendorOptions).map(([country, vendors]) => ({
				value: country,
				label: country,
				options: vendors,
			})),
		},
		{
			name: 'Service Type',
			value: 'serviceType',
			options: filterServiceType,
		},
		{
			name: 'Service Status',
			value: 'serviceStatus',
			options: [
				{ value: 0, label: 'Terminated' },
				{ value: 1, label: 'Live' },
			],
		},
	]

	return menuOptions
}

export default useGetMenuOptions
