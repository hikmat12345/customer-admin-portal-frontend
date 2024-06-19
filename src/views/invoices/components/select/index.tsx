import * as React from 'react';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import Command from '@veroxos/design-system/dist/ui/Command/command';
import CommandEmpty from '@veroxos/design-system/dist/ui/CommandEmpty/commandEmpty';
import CommandGroup from '@veroxos/design-system/dist/ui/CommandGroup/commandGroup';
import CommandInput from '@veroxos/design-system/dist/ui/CommandInput/commandInput';
import CommandItem from '@veroxos/design-system/dist/ui/CommandItem/commandItem';
import CommandList from '@veroxos/design-system/dist/ui/CommandList/commandList';
import Popover from '@veroxos/design-system/dist/ui/PopOver/popover';
import PopoverContent from '@veroxos/design-system/dist/ui/PopoverContent/popoverContent';
import PopoverTrigger from '@veroxos/design-system/dist/ui/PopoverTrigger/popoverTrigger';
import { Check } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import CreateQueryString from '../../../../utils/createQueryString';
import { cn } from '../../../../utils/utils';

interface Option {
  label: string;
  value: number | string;
}
interface MenuOption {
  name: string;
  value: string;
  options: Option[];
}

const PARAM_NAME: Record<number, string> = {
  0: 'country',
  1: 'vendor',
  2: 'account',
};

function SelectComponent({ menuOption, index }: { menuOption: any; index: number }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = CreateQueryString();

  const currentParamValue = searchParams?.get(PARAM_NAME[index]) || '';
  const paramValues = currentParamValue.split(',');
  const selectedOptionLabel = menuOption?.options
    ?.flat()
    .find((option: { value: string | number; label: string }) => option?.value == currentParamValue)?.label;

  const selectedVendorOptionLabel = menuOption?.options
    ?.flat()
    .find((option: { value: string | number; label: string }) => {
      if (index === 1) {
        return option?.value === currentParamValue;
      }
      return true;
    })?.label;

  let truncatedLabel = selectedOptionLabel || selectedVendorOptionLabel;
  if (truncatedLabel && truncatedLabel.length > 14) {
    truncatedLabel = `${truncatedLabel.slice(0, 14)}...`;
  }

  const PLACEHOLDER_NAME = {
    0: 'Search country...',
    1: 'Search vendor...',
    2: 'Search account...',
  };

  const handleSubOptionSelect = (subOptionLabel: any) => {
    if (subOptionLabel) {
      let selectedOption = null;
      let selectedCountry = null;

      for (const country of menuOption.options) {
        const foundOption = country.options.find((subOption: any) => subOption.label === subOptionLabel.label);
        if (foundOption) {
          selectedOption = index === 0 ? country : foundOption;
          selectedCountry = country;
          break;
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

  const resetFilters = () => {
    router.push(`${pathname}?${createQueryString(PARAM_NAME[index], undefined)}`);
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
            className="w-[200px] justify-between"
            value={12}
          >
            {currentParamValue !== ''
              ? `${truncatedLabel ? truncatedLabel : menuOption?.name}${paramValues.length - 1 ? ` (+${paramValues.length - 1})` : ''}`
              : menuOption?.name}{' '}
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

            {/* country dropdown */}
            {index === 0 && (
              <CommandGroup>
                <CommandList>
                  {menuOption?.options
                    ?.flat()
                    ?.filter((option: Option) => option?.label !== '')
                    .map((option: any, indexCount: number) => (
                      <CommandItem
                        key={`${option?.label}-${indexCount++}`}
                        value={option?.label}
                        onSelect={(currentValue) => {
                          let selectedOption;
                          if (index === 0) {
                            selectedOption = menuOption?.options.flat().find((opt: any) => opt.label === currentValue);
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
                            currentParamValue.includes(option?.value) ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {option?.label}
                      </CommandItem>
                    ))}
                </CommandList>
              </CommandGroup>
            )}
            {/* vendor dropdown  */}
            {index === 1 && (
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
            {index == 2 && (
              <CommandGroup>
                <CommandList>
                  {menuOption?.options
                    ?.flat()
                    ?.filter((option: Option) => option?.label !== '')
                    .map((option: any, indexCount: number) => (
                      <CommandItem
                        key={`${option?.label}-${indexCount++}`}
                        value={option?.label}
                        onSelect={(currentValue) => {
                          let selectedOption;
                          if (index === 2) {
                            selectedOption = menuOption?.options.flat().find((opt: any) => opt.label === currentValue);
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
                            currentParamValue.includes(option?.value) ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {option?.label}
                      </CommandItem>
                    ))}
                </CommandList>
              </CommandGroup>
            )}
            <CommandGroup>
              <div className="border-t py-2 text-center">
                <Button className="bg-transparent text-sm font-bold text-slate-700" onClick={resetFilters}>
                  <Image src="/svg/timer-reset.svg" height={14} width={14} alt="" />
                  <span className="text-sm">Reset</span>
                </Button>
              </div>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </React.Suspense>
  );
}

export default SelectComponent;
