import * as React from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/utils';
import { Check } from 'lucide-react';
import CreateQueryString from '@/utils/createQueryString';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';

interface Option {
  label: string;
  value: number | string;
}
interface MenuOption {
  name: string;
  value: string;
  options: Option[];
}

function SelectComponent({ menuOption, index }: { menuOption: MenuOption; index: number }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = CreateQueryString();

	const PARAM_NAME: Record<number, string> = {
		0: 'accountNumber',
		1: 'priority',
		2: 'status',
	}

	const currentParamValue = searchParams?.get(PARAM_NAME[index]) || ''
	const paramValues = currentParamValue.split(',');

	const selectedOptionLabel = menuOption?.options
		?.flat()
		.find((option: { value: string | number; label: string }) => option?.value == paramValues[0])?.label

  let truncatedLabel = selectedOptionLabel;

  if (truncatedLabel && truncatedLabel.length > 17) {
    truncatedLabel = `${truncatedLabel.slice(0, 17)}...`;
  }

	const reset = () => {
		router.push(`${pathname}?${createQueryString(PARAM_NAME[index], undefined)}`)
		setOpen(false);
	}

	return (
		<React.Suspense>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild className="bg-custom-background outline-none">
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="lg:w-[200px] 2xl:w-[250px] justify-between"
						value={12}
					>
						{currentParamValue !== '' ? `${truncatedLabel}${paramValues.length - 1 ? ` (+${paramValues.length - 1})` : ''}` : menuOption?.name}
						<Image
							src={open ? '/svg/select/upChevron.svg' : '/svg/select/downChevron.svg'}
							alt="Chevron Icon"
							width={20}
							height={20}
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="lg:w-[200px] 2xl:w-[250px] p-0">
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
												value={option?.label}
												onSelect={(currentValue) => {
													let selectedOption
													if (index === 0) {
														selectedOption = menuOption?.options.flat().find((opt: any) => opt.label === currentValue)
													} else {
														selectedOption = menuOption?.options.find((opt: any) => opt['label'] === currentValue)
													}

													if(selectedOption){
														if (currentParamValue.includes(selectedOption.value.toString())) {
															const paramIndex = paramValues.findIndex(param => param == selectedOption.value);
															paramValues.splice(paramIndex, 1);
															const joinedParams = paramValues.join(",")
															const updatedQueryString = createQueryString(PARAM_NAME[index], joinedParams)
															router.push(`${pathname}?${updatedQueryString}`)
														} else {
															const queryParamValue = currentParamValue ? `${currentParamValue},${selectedOption?.value}` : selectedOption?.value
															const updatedQueryString = createQueryString(PARAM_NAME[index], queryParamValue)
															router.push(`${pathname}?${updatedQueryString}`)
														}
													}
												}}
											>
												<Check
													className={cn(
														'mr-2 h-4 w-4',
														currentParamValue.includes(option?.value) ? 'opacity-100' : 'opacity-0'
													)}
												/>
												{option?.label}
											</CommandItem>
										)
									})}
									<CommandItem onSelect={reset} className='border-t-[1px] border-[#F1F5F9] cursor-pointer bg-custom-white sticky bottom-0 flex gap-1 justify-center text-[0.875rem] leading-[1.063rem] font-[500] py-2'>
										<Image src={"/svg/reset.svg"} width={16} height={16} alt='reset icon'/>
										<span>Reset</span>
									</CommandItem>
							</CommandList>
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		</React.Suspense>
	)
}

export default SelectComponent;
