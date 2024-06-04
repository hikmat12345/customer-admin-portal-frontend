import * as React from 'react'
import { Button } from '@veroxos/design-system/dist/ui/Button/button'
import Command from '@veroxos/design-system/dist/ui/Command/command'
import CommandEmpty from '@veroxos/design-system/dist/ui/CommandEmpty/commandEmpty'
import CommandGroup from '@veroxos/design-system/dist/ui/CommandGroup/commandGroup'
import CommandInput from '@veroxos/design-system/dist/ui/CommandInput/commandInput'
import CommandItem from '@veroxos/design-system/dist/ui/CommandItem/commandItem'
import CommandList from '@veroxos/design-system/dist/ui/CommandList/commandList'
import Popover from '@veroxos/design-system/dist/ui/PopOver/popover'
import PopoverContent from '@veroxos/design-system/dist/ui/PopoverContent/popoverContent'
import PopoverTrigger from '@veroxos/design-system/dist/ui/PopoverTrigger/popoverTrigger'
import { cn } from '../../../../utils/utils'
import { Check } from 'lucide-react'
import CreateQueryString from '../../../../utils/createQueryString'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

interface Option {
	label: string
	value: number | string
}
interface MenuOption {
	name: string
	value: string
	options: Option[]
}

const PARAM_NAME: Record<number, string> = {
	0: 'country',
	1: 'vendor',
	2: 'account',
}

const SelectComponent = ({ menuOption, index }: { menuOption: any; index: number }) => {
	const [open, setOpen] = React.useState(false)
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const createQueryString = CreateQueryString()

	const currentParamValue = searchParams?.get(PARAM_NAME[index]) || ''

	const selectedOptionLabel = menuOption?.options
		?.flat()
		.find((option: { value: string | number; label: string }) => option?.value == currentParamValue)?.label

	const selectedVendorOptionLabel = menuOption?.options
		?.flat()
		.find((option: { value: string | number; label: string }) => {
			if (index === 1) {
				return option?.value === currentParamValue
			} else {
				return true
			}
		})?.label

	let truncatedLabel = selectedOptionLabel || selectedVendorOptionLabel

	if (truncatedLabel && truncatedLabel.length > 17) {
		truncatedLabel = truncatedLabel.slice(0, 17) + '...'
	}

	const PLACEHOLDER_NAME = {
		0: 'Search country...',
		1: 'Search vendor...',
		2: 'Search account...',
	}

	const handleSubOptionSelect = (subOptionLabel: string) => {
		if (subOptionLabel) {
			let selectedOption = null
			let selectedCountry = null

			for (const country of menuOption.options) {
				const foundOption = country.options.find((subOption: any) => subOption.label === subOptionLabel)
				if (foundOption) {
					selectedOption = foundOption
					selectedCountry = country
					break
				}
			}

			if (selectedOption && selectedCountry) {
				if (currentParamValue === selectedOption.value) {
					const updatedQueryString = createQueryString(PARAM_NAME[index], undefined)
					router.push(`${pathname}?${updatedQueryString}`)
				} else {
					const queryParamValue = selectedOption.value
					const updatedQueryString = createQueryString(PARAM_NAME[index], queryParamValue)
					router.push(`${pathname}?${updatedQueryString}`)
				}
			}
		}
		setOpen(false)
	}

	return (
		<React.Suspense>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild className="bg-custom-background outline-none">
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
						value={12}
					>
						{currentParamValue !== '' ? truncatedLabel || currentParamValue : menuOption?.name}
						<Image
							src={open ? '/svg/select/upChevron.svg' : '/svg/select/downChevron.svg'}
							alt="Chevron Icon"
							width={20}
							height={20}
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						{(index === 0 || index === 1 || index === 2) && (
							<>
								<CommandInput placeholder={PLACEHOLDER_NAME[index as 0 | 1 | 2]} />
								<CommandEmpty>No data found</CommandEmpty>
							</>
						)}
						{index === 1 ? (
							<CommandGroup>
								<CommandList>
									{menuOption?.options?.map((option: any, indexCount: number) => {
										return (
											<>
												<h6 className="text-sm px-3 py-3 font-bold">{option?.value}</h6>
												{option?.options?.map((subOption: any) => {
													return (
														<CommandItem
															key={`${option?.label}-${indexCount++}`}
															value={subOption?.value}
															onSelect={() => handleSubOptionSelect(subOption.label)}
														>
															<Check
																className={cn(
																	'mr-2 h-4 w-4',
																	(+currentParamValue || currentParamValue) == subOption?.value
																		? 'opacity-100'
																		: 'opacity-0'
																)}
															/>
															{subOption?.value}
														</CommandItem>
													)
												})}
											</>
										)
									})}
								</CommandList>
							</CommandGroup>
						) : (
							<CommandGroup>
								<CommandList>
									{menuOption?.options
										?.flat()
										?.filter((option: Option) => option?.label !== '')
										.map((option: any, indexCount: number) => {
											return (
												<CommandItem
													key={`${option?.label}-${indexCount++}`}
													value={option?.value}
													onSelect={(currentValue) => {
														let selectedOption
														if (index === 2) {
															selectedOption = menuOption?.options.flat().find((opt: any) => opt.value === currentValue)
														} else {
															selectedOption = menuOption?.options.find((opt: any) => opt['label'] === currentValue)
														}
														if (currentParamValue == selectedOption?.value) {
															const updatedQueryString = createQueryString(PARAM_NAME[index], undefined)
															router.push(`${pathname}?${updatedQueryString}`)
														} else {
															const queryParamValue = selectedOption?.value
															const updatedQueryString = createQueryString(PARAM_NAME[index], queryParamValue)
															router.push(`${pathname}?${updatedQueryString}`)
														}
														setOpen(false)
													}}
												>
													<Check
														className={cn(
															'mr-2 h-4 w-4',
															(+currentParamValue || currentParamValue) == option?.value ? 'opacity-100' : 'opacity-0'
														)}
													/>
													{option?.label}
												</CommandItem>
											)
										})}
								</CommandList>
							</CommandGroup>
						)}
					</Command>
				</PopoverContent>
			</Popover>
		</React.Suspense>
	)
}

export default SelectComponent
