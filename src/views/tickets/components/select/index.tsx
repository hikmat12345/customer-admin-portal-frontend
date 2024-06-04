import * as React from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils/utils'
import { Check } from 'lucide-react'
import CreateQueryString from '@/utils/createQueryString'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@veroxos/design-system/dist/ui/Button/button'

interface Option {
	label: string
	value: number | string
}
interface MenuOption {
	name: string
	value: string
	options: Option[]
}

const SelectComponent = ({ menuOption, index }: { menuOption: MenuOption; index: number }) => {
	const [open, setOpen] = React.useState(false)
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const createQueryString = CreateQueryString()

	const PARAM_NAME: Record<number, string> = {
		0: 'account_number',
		1: 'priority',
		2: 'status',
	}

	const currentParamValue = searchParams?.get(PARAM_NAME[index]) || ''

	const selectedOptionLabel = menuOption?.options
		?.flat()
		.find((option: { value: string | number; label: string }) => option?.value == currentParamValue)?.label

	let truncatedLabel = selectedOptionLabel

	if (truncatedLabel && truncatedLabel.length > 17) {
		truncatedLabel = truncatedLabel.slice(0, 17) + '...'
	}

	return (
		<React.Suspense>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild className="bg-[#F4F7FE] outline-none">
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
						value={12}
					>
						{currentParamValue !== '' ? truncatedLabel : menuOption?.name}
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
						{index === 0 && (
							<>
								<CommandInput placeholder="Search account..." />
								<CommandEmpty>No data found</CommandEmpty>
							</>
						)}
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
													if (index === 0) {
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
					</Command>
				</PopoverContent>
			</Popover>
		</React.Suspense>
	)
}

export default SelectComponent
