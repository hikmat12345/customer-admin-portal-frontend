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
  placeholder: string;
  options: Option[];
}

interface GroupedOption {
  value: string;
  label: string;
  options: Option[]; // Nested options for groups
}

interface SubOption {
  accountNumber: string;
  country: string;
  label: string;
  value: string;
}

function SelectComponent({ menuOption, index }: { menuOption: MenuOption; index: number }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = CreateQueryString();

  const PARAM_NAME: Record<number, string> = {
    0: 'period',
    1: 'serviceType',
    2: 'country',
    3: 'vendor',
    4: 'account',
  };

  const flatMenuOptions = menuOption?.options?.flat();

  const currentParamValue = searchParams?.get(PARAM_NAME[index]) || '';
  const paramValues = currentParamValue
    .split(',')
    .filter((value) => value.trim() !== '')
    .map((value) => value.trim());
  let selectedOptionLabel;

  // Vendor dropdown
  if (index === 3) {
    // Iterate through menuOption.options which could be GroupedOption or Option
    for (const item of menuOption?.options || []) {
      // Check if item has 'options', indicating it's a GroupedOption
      if ('options' in item) {
        const group = item as GroupedOption;
        const foundOption = group.options.find((option: Option) => option.value == paramValues[0]);
        if (foundOption) {
          selectedOptionLabel = foundOption.label;
          break;
        }
      }
    }
  } else if (index === 1) {
    // separate for service type
    selectedOptionLabel = flatMenuOptions?.find(
      (option: { value: string | number; label: string }) => option?.value == paramValues[0],
    )?.label;
  } else {
    selectedOptionLabel = flatMenuOptions?.find(
      (option: { value: string | number; label: string }) => option?.value == paramValues[0],
    )?.label;
  }

  let truncatedLabel = selectedOptionLabel;

  if (truncatedLabel && truncatedLabel.length > 14) {
    truncatedLabel = `${truncatedLabel.slice(0, 14)}...`;
  }

  const reset = () => {
    router.push(`${pathname}?${createQueryString(PARAM_NAME[index], undefined)}`);
    setOpen(false);
  };

  const handleSubOptionSelect = (subOptionLabel: SubOption) => {
    if (subOptionLabel) {
      let selectedOption = null;
      let selectedCountry = null;

      for (const item of menuOption.options) {
        if ('options' in item) {
          const group = item as GroupedOption;

          const foundOption = group.options.find((subOption) => subOption.label === subOptionLabel.label);
          if (foundOption) {
            selectedOption = index === 0 ? group : foundOption;
            selectedCountry = group;
            break;
          }
        }
      }
      if (selectedOption) {
        if (currentParamValue.includes(selectedOption.value.toString())) {
          const paramIndex = paramValues.findIndex((param) => param == selectedOption.value);
          paramValues.splice(paramIndex, 1);
          const joinedParams = paramValues.join(',');
          const updatedQueryString = createQueryString(PARAM_NAME[index], joinedParams);
          router.push(`${pathname}?${updatedQueryString}`);
        } else {
          const queryParamValue = currentParamValue
            ? `${currentParamValue},${selectedOption?.value}`
            : selectedOption?.value;
          const updatedQueryString = createQueryString(PARAM_NAME[index], queryParamValue);
          router.push(`${pathname}?${updatedQueryString}`);
        }
      }
    }
  };

  const handleSingleSelect = (selectedOption: Option) => {
    const updatedQueryString = createQueryString(PARAM_NAME[index], selectedOption.value.toString());
    router.push(`${pathname}?${updatedQueryString}`);
    setOpen(false);
  };

  return (
    <React.Suspense>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="bg-custom-background outline-none">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="mt-4 p-[0.5rem] sm:w-[45%] sm:justify-between md:mt-0 md:w-[8rem] 2md:w-[8.5rem] lg:w-[10rem] 2lg:w-[7.5rem] xl:w-[8.2rem] 2xl:w-[10rem] 3xl:w-[12.125rem]"
          >
            {currentParamValue !== ''
              ? `${truncatedLabel}${paramValues.length - 1 ? ` (+${paramValues.length - 1})` : ''}`
              : menuOption?.name}
            <Image
              src={open ? '/svg/select/upChevron.svg' : '/svg/select/downChevron.svg'}
              alt="Chevron Icon"
              width={20}
              height={20}
              className="h-[1.25rem] w-[1.25rem]"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 lg:w-[10rem] 2lg:w-[12.5rem] 2xl:w-[15.625rem]">
          <Command>
            <CommandInput placeholder={menuOption.placeholder} />
            <CommandEmpty>No data found</CommandEmpty>

            {/* service type dropdown */}
            {index === 1 && (
              <CommandGroup>
                <CommandList>
                  {flatMenuOptions
                    ?.filter((option: Option) => option?.label !== '')
                    .map((option: Option, indexCount: number) => {
                      const optionValue = option?.value.toString();
                      const isSelected = paramValues.includes(optionValue);

                      return (
                        <CommandItem
                          key={`${option?.label}-${indexCount}`}
                          value={option?.label}
                          onSelect={() => {
                            // Toggle selection
                            const updatedValues = isSelected
                              ? paramValues.filter((value) => value !== optionValue)
                              : [...paramValues, optionValue];

                            // Update the query string
                            const joinedParams = updatedValues.join(',');
                            const updatedQueryString = createQueryString(PARAM_NAME[index], joinedParams);
                            router.push(`${pathname}?${updatedQueryString}`);
                          }}
                        >
                          <Check className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                          {option?.label}
                        </CommandItem>
                      );
                    })}
                </CommandList>
              </CommandGroup>
            )}
            {/* country dropdown */}
            {index === 2 && (
              <CommandGroup>
                <CommandList>
                  {flatMenuOptions
                    ?.filter((option: Option) => option?.label !== '')
                    .map((option: any, indexCount: number) => (
                      <CommandItem
                        key={`${option?.label}-${indexCount++}`}
                        value={option?.label}
                        onSelect={(currentValue) => {
                          let selectedOption;
                          if (index === 2) {
                            selectedOption = flatMenuOptions?.find((opt: any) => opt.label === currentValue);
                          } else {
                            selectedOption = menuOption?.options.find((opt: any) => opt['label'] === currentValue);
                          }

                          if (selectedOption) {
                            if (currentParamValue.includes(selectedOption.value.toString())) {
                              const paramIndex = paramValues.findIndex((param) => param == selectedOption.value);
                              paramValues.splice(paramIndex, 1);
                              const joinedParams = paramValues.join(',');
                              const updatedQueryString = createQueryString(PARAM_NAME[index], joinedParams);
                              router.push(`${pathname}?${updatedQueryString}`);
                            } else {
                              const queryParamValue = currentParamValue
                                ? `${currentParamValue},${selectedOption?.value}`
                                : selectedOption?.value;
                              const updatedQueryString = createQueryString(PARAM_NAME[index], queryParamValue);
                              router.push(`${pathname}?${updatedQueryString}`);
                            }
                          }
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            currentParamValue
                              ?.split(',')
                              ?.map((item) => item?.trim())
                              ?.filter((item) => item !== '')
                              ?.map(Number)
                              ?.includes(option?.value)
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {option?.label}
                      </CommandItem>
                    ))}
                </CommandList>
              </CommandGroup>
            )}
            {/* vendor dropdown  */}
            {index === 3 && (
              <CommandGroup>
                <CommandList>
                  {menuOption?.options?.map((option: any, indexCount: number) => (
                    <>
                      <h6 className="px-3 py-3 text-sm font-bold">{option?.value}</h6>
                      {option?.options?.map((subOption: any) => (
                        <CommandItem
                          key={`${option?.label}-${indexCount++}`}
                          value={subOption?.label}
                          onSelect={() => handleSubOptionSelect(subOption)}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              currentParamValue.includes(subOption?.value) ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          {subOption?.value}
                        </CommandItem>
                      ))}
                    </>
                  ))}
                </CommandList>
              </CommandGroup>
            )}
            {/* account dropdown */}
            {index === 4 && (
              <CommandGroup>
                <CommandList>
                  {flatMenuOptions
                    ?.filter((option: Option) => option?.label !== '')
                    .map((option: Option, indexCount: number) => {
                      const optionValue = option?.value.toString();
                      const isSelected = paramValues.includes(optionValue);

                      return (
                        <CommandItem
                          key={`${option?.label}-${indexCount}`}
                          value={option?.label}
                          onSelect={() => {
                            // Toggle selection
                            const updatedValues = isSelected
                              ? paramValues.filter((value) => value !== optionValue)
                              : [...paramValues, optionValue];

                            // Update the query string
                            const joinedParams = updatedValues.join(',');
                            const updatedQueryString = createQueryString(PARAM_NAME[index], joinedParams);
                            router.push(`${pathname}?${updatedQueryString}`);
                          }}
                        >
                          <Check className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                          {option?.label}
                        </CommandItem>
                      );
                    })}
                </CommandList>
              </CommandGroup>
            )}
            <CommandGroup>
              <CommandList>
                {menuOption?.options
                  ?.filter((option: Option) => option?.label !== '')
                  .map((option: Option, indexCount: number) => {
                    const isSelected = currentParamValue === option.value.toString();
                    if (index === 1 || index === 2 || index === 4 || index === 3) return null;
                    return (
                      <CommandItem
                        key={`${option?.label}-${indexCount}`}
                        value={option?.label}
                        onSelect={() => handleSingleSelect(option)}
                      >
                        <Check className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                        {option?.label}
                      </CommandItem>
                    );
                  })}
                {index !== 0 && (
                  <CommandItem
                    onSelect={reset}
                    className="sticky bottom-0 flex cursor-pointer justify-center gap-1 border-t-[1px] border-[#F1F5F9] bg-custom-white py-2 text-[0.875rem] font-[500] leading-[1.063rem]"
                  >
                    <Image src={'/svg/reset.svg'} width={16} height={16} alt="reset icon" />
                    <span>Reset</span>
                  </CommandItem>
                )}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </React.Suspense>
  );
}

export default SelectComponent;
