import { useGetCountries } from '@/hooks/useGetCountries'
import { useGetVendorsByCountries } from '@/hooks/useGetVendorByCountries'
import { useGetVendors } from '@/hooks/useTickets'
import { Country } from '@/types/invoices/types'
import { VendorAccount } from '@/types/tickets/types'

const useGetMenuOptions = () => {
	const { data: vendorAccounts } = useGetVendors()
	const { data } = useGetVendorsByCountries()
	const { data: countries } = useGetCountries()

	const filterVendorAccounts = vendorAccounts?.map((item: VendorAccount) => ({
		value: item?.account_no,
		label: item?.displayName,
	}))

	const filteredCountries = countries?.data?.map((country: Country) => ({
		value: country?.id,
		label: country?.name,
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
			name: 'Country',
			value: 'country',
			options: filteredCountries,
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
			name: 'Account',
			value: 'account',
			options: filterVendorAccounts,
		},
	]

	return menuOptions
}

export default useGetMenuOptions
