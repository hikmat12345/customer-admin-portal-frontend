import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../popover'
import { Button } from '@veroxos/design-system/dist/ui/Button/button'
import Image from 'next/image'
import { Command } from '../../command'
import CommandInput from '@veroxos/design-system/dist/ui/CommandInput/commandInput'
import CommandEmpty from '@veroxos/design-system/dist/ui/CommandEmpty/commandEmpty'
import CommandGroup from '@veroxos/design-system/dist/ui/CommandGroup/commandGroup'
import CommandList from '@veroxos/design-system/dist/ui/CommandList/commandList'
import CommandItem from '@veroxos/design-system/dist/ui/CommandItem/commandItem'
import { Check } from 'lucide-react'
import { cn } from '@/utils/utils'
import { FieldProps } from 'formik'

interface FormikSelectProps extends FieldProps {
	error: boolean
	helperText: string
	label: string
}

const FormikSelectComponent = (props: FormikSelectProps) => {
	const {
		form: { setFieldValue, touched, errors, values },
		field: { name },
		field,
		error,
		helperText,
		label,
		...rest
	} = props
	const [open, setOpen] = React.useState(false)

	return (
		<React.Suspense>
			<div className="flex flex-col gap-2">
				<span className="text-[14px] font-semibold text-[#575757]">{label}</span>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild className="bg-custom-background outline-none">
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="w-full justify-between"
							value={12}
						>
							{label}
							<Image
								src={open ? '/svg/select/upChevron.svg' : '/svg/select/downChevron.svg'}
								alt="Chevron Icon"
								width={20}
								height={20}
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-0 w-[100%]">
						<Command>
							<>
								<CommandInput placeholder="Search account..." />
								<CommandEmpty>No data found</CommandEmpty>
							</>
							<CommandGroup>
								<CommandList>
									<CommandItem value={'1'} onSelect={(currentValue) => {}}>
										<Check className={cn('mr-2 h-4 w-4 opacity-100')} />
										123
									</CommandItem>
								</CommandList>
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
		</React.Suspense>
	)
}

export default FormikSelectComponent
