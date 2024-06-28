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
  0: 'vendor',
  1: 'country',
  2: 'show_archived',
};

function SelectComponent({ menuOption, index }: { menuOption: any; index: number }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParamValue = searchParams?.get(PARAM_NAME[index]) || '';
  const paramValues = currentParamValue.split(',');
  const createQueryString = CreateQueryString();

  const getSelectedOptionLabel = () => {
    let selectedOptLabel = '';

    if (index === 0) {
      for (const parentOpt of menuOption?.options) {
        const optFound = parentOpt.options.find((subOption: any) => subOption.label === paramValues[0]);
        if (optFound) {
          selectedOptLabel = optFound.label;
          break;
        }
      }
    } else {
      selectedOptLabel = menuOption?.options
        ?.flat()
        .find((option: { value: string | number; label: string }) => option?.value == paramValues[0])?.label;
    }

    return selectedOptLabel;
  };

  const getTruncatedLabel = () => {
    let truncLabel = getSelectedOptionLabel();

    if (truncLabel && truncLabel.length > 17) {
      truncLabel = `${truncLabel.slice(0, 17)}...`;
    }

    return truncLabel;
  };

  const PLACEHOLDER_NAME = {
    0: 'Search country...',
    1: 'Search...',
    2: 'Search service...',
  };

  const handleSubOptionSelect = (subOptionLabel: string) => {
    if (subOptionLabel) {
      let selectedOption = null;

      for (const option of menuOption.options) {
        const foundOption = option.options.find((subOption: any) => subOption.label === subOptionLabel);
        if (foundOption) {
          selectedOption = foundOption;
          break;
        }
      }

      if (selectedOption) {
        if (paramValues.includes(selectedOption.value.toString())) {
          const paramIndex = paramValues.findIndex((param) => param == selectedOption.value);
          paramValues.splice(paramIndex, 1);
          const updatedParams = paramValues.length > 0 ? paramValues.join(',') : undefined;
          const updatedQueryString = createQueryString(PARAM_NAME[index], updatedParams);
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

  const reset = () => {
    router.push(`${pathname}?${createQueryString(PARAM_NAME[index], undefined)}`);
    setOpen(false);
  };

  const isOptionChecked = (value: number) => {
    const paramsArray = currentParamValue.split(',');
    return paramsArray.includes(value.toString());
  };

  const buttonTitle = () => {
    if (currentParamValue === '') return menuOption?.name;

    let count: string | number = paramValues.length - 1;
    count = count === 0 ? '' : ` +${count}`;
    let truncatedLabel = getTruncatedLabel();
    return truncatedLabel + count;
  };

  return (
    <React.Suspense>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="bg-custom-background outline-none">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[160px] max-w-fit justify-between"
          >
            {buttonTitle()}
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
            {index === 0 ? (
              <CommandGroup>
                <CommandList>
                  {menuOption?.options?.map((option: any, indexCount: number) => (
                    <>
                      <h6 className="px-3 py-3 text-sm font-bold">{option?.value}</h6>
                      {option?.options?.map((subOption: any) => (
                        <CommandItem
                          key={`${option?.label}-${indexCount++}`}
                          value={subOption?.value}
                          onSelect={() => handleSubOptionSelect(subOption.label)}
                        >
                          <Check
                            className={cn('mr-2 h-4 w-4 opacity-0', isOptionChecked(subOption?.value) && 'opacity-100')}
                          />
                          {subOption?.value}
                        </CommandItem>
                      ))}
                    </>
                  ))}
                  <CommandItem
                    onSelect={reset}
                    className="sticky bottom-0 flex cursor-pointer justify-center gap-1 border-t-[1px] border-[#F1F5F9] bg-custom-white py-2 text-[0.875rem] font-[500] leading-[1.063rem]"
                  >
                    <Image src={'/svg/reset.svg'} width={16} height={16} alt="reset icon" />
                    <span>Reset</span>
                  </CommandItem>
                </CommandList>
              </CommandGroup>
            ) : (
              <CommandGroup>
                <CommandList>
                  {menuOption?.options
                    ?.flat()
                    ?.filter((option: Option) => option?.label !== '')
                    .map((option: any, indexCount: number) => (
                      <CommandItem
                        key={`${option?.label}-${indexCount++}`}
                        value={option?.value}
                        onSelect={(currentValue: any) => {
                          let selectedOption;

                          if (index === 0) {
                            selectedOption = menuOption?.options.flat().find((opt: any) => opt.label === currentValue);
                          }
                          if (index === 1) {
                            selectedOption = menuOption?.options.flat().find((opt: any) => opt.label === currentValue);
                          }
                          if (index === 2) {
                            selectedOption = menuOption?.options.flat().find((opt: any) => {
                              return opt.label === currentValue;
                            });
                          }
                          if (index === 3) {
                            selectedOption = menuOption?.options.flat().find((opt: any) => opt.label === currentValue);
                          }

                          if (selectedOption) {
                            if (paramValues.includes(selectedOption.value.toString())) {
                              const paramIndex = paramValues.findIndex((param) => param == selectedOption.value);
                              paramValues.splice(paramIndex, 1);
                              const updatedParams = paramValues.length > 0 ? paramValues.join(',') : undefined;
                              const updatedQueryString = createQueryString(PARAM_NAME[index], updatedParams);
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
                          className={cn('mr-2 h-4 w-4 opacity-0', isOptionChecked(option?.value) && 'opacity-100')}
                        />
                        {option?.label}
                      </CommandItem>
                    ))}
                  <CommandItem
                    onSelect={reset}
                    className="sticky bottom-0 flex cursor-pointer justify-center gap-1 border-t-[1px] border-[#F1F5F9] bg-custom-white py-2 text-[0.875rem] font-[500] leading-[1.063rem]"
                  >
                    <Image src={'/svg/reset.svg'} width={16} height={16} alt="reset icon" />
                    <span>Reset</span>
                  </CommandItem>
                </CommandList>
              </CommandGroup>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </React.Suspense>
  );
}

export default SelectComponent;
