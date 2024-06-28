import { useState, Suspense, Fragment } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '../../../../utils/utils';
import Command from '@veroxos/design-system/dist/ui/Command/command';
import CommandEmpty from '@veroxos/design-system/dist/ui/CommandEmpty/commandEmpty';
import CommandGroup from '@veroxos/design-system/dist/ui/CommandGroup/commandGroup';
import CommandInput from '@veroxos/design-system/dist/ui/CommandInput/commandInput';
import CommandItem from '@veroxos/design-system/dist/ui/CommandItem/commandItem';
import CommandList from '@veroxos/design-system/dist/ui/CommandList/commandList';
import Popover from '@veroxos/design-system/dist/ui/PopOver/popover';
import PopoverContent from '@veroxos/design-system/dist/ui/PopoverContent/popoverContent';
import PopoverTrigger from '@veroxos/design-system/dist/ui/PopoverTrigger/popoverTrigger';
import Image from 'next/image';
import CreateQueryString from '../../../../utils/createQueryString';

interface Option {
  label: string;
  value: number | string;
}

function SelectComponent({
  menuOption,
  filterName,
  paramName,
  placeholder,
}: {
  menuOption: any;
  filterName: string;
  paramName: string;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParamValue = searchParams?.get(paramName) || '';
  const paramValues = (currentParamValue.length && currentParamValue.split(',')) || [];
  const createQueryString = CreateQueryString();

  const getSelectedOptionLabel = () => {
    const options =
      filterName === 'vendor' ? menuOption?.options?.flatMap((opt: any) => opt.options) : menuOption?.options?.flat();
    const matcherKey = filterName === 'vendor' ? 'label' : 'value';
    const paramMatcher = matcherKey === 'label' ? paramValues[0] : Number(paramValues[0]);
    const optionFound = options?.find((option: any) => option[matcherKey] == paramMatcher);
    return optionFound?.label || '';
  };

  const getTruncatedLabel = () => {
    const label = getSelectedOptionLabel();
    return label && label.length > 17 ? `${label.slice(0, 17)}...` : label;
  };

  const handleOptionSelect = (selectedOptionValue: string) => {
    if (!selectedOptionValue) return;
    const value = selectedOptionValue.toString();
    const paramIndex = paramValues.indexOf(value);
    paramIndex !== -1 ? paramValues.splice(paramIndex, 1) : paramValues.push(value);
    const updatedParams = paramValues.join(',') || undefined;
    router.push(`${pathname}?${createQueryString(paramName, updatedParams)}`);
  };

  const isOptionChecked = (value: number) => currentParamValue.split(',').includes(value.toString());

  const buttonTitle = () => {
    if (!currentParamValue) return menuOption?.name;
    const count = paramValues.length > 1 ? ` +${paramValues.length - 1}` : '';
    return getTruncatedLabel() + count;
  };

  const reset = () => {
    router.push(`${pathname}?${createQueryString(paramName, undefined)}`);
    setOpen(false);
  };

  const renderResetButton = () => {
    return (
      <CommandItem
        onSelect={reset}
        className="sticky bottom-0 flex cursor-pointer justify-center gap-1 border-t-[1px] border-[#F1F5F9] bg-custom-white py-2 text-[0.875rem] font-[500] leading-[1.063rem]"
      >
        <Image src={'/svg/reset.svg'} width={16} height={16} alt="reset icon" />
        <span>Reset</span>
      </CommandItem>
    );
  };

  const renderCheckIcon = (value: number) => (
    <Check className={cn('mr-2 h-4 w-4 opacity-0', isOptionChecked(value) && 'opacity-100')} />
  );

  return (
    <Suspense>
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
            <CommandInput placeholder={placeholder} />
            <CommandEmpty>No data found</CommandEmpty>

            {filterName === 'vendor' && (
              <CommandGroup>
                <CommandList>
                  {menuOption?.options?.map((option: any, indexCount: number) => (
                    <Fragment key={`${option?.value}-${indexCount}`}>
                      <h6 className="px-3 py-3 text-sm font-bold">{option?.value}</h6>
                      {option?.options?.map((subOption: any) => (
                        <CommandItem
                          key={`${option?.label}-${indexCount++}`}
                          value={subOption?.value}
                          onSelect={() => {
                            const currentValue = subOption.label;
                            const selectedOption = menuOption.options
                              .flatMap((opt: any) => opt.options)
                              .find((subOpt: any) => subOpt.label === currentValue);

                            const selectedOptionValue = String(selectedOption?.value) || '';
                            handleOptionSelect(selectedOptionValue);
                          }}
                        >
                          {renderCheckIcon(subOption?.value)}
                          {subOption?.value}
                        </CommandItem>
                      ))}
                    </Fragment>
                  ))}
                  {renderResetButton()}
                </CommandList>
              </CommandGroup>
            )}

            {filterName !== 'vendor' && (
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
                          const selectedOption = menuOption?.options
                            .flat()
                            .find((opt: any) => opt.label === currentValue);

                          const selectedOptionValue = String(selectedOption?.value) || '';
                          handleOptionSelect(selectedOptionValue);
                        }}
                      >
                        {renderCheckIcon(option?.value)}
                        {option?.label}
                      </CommandItem>
                    ))}
                  {renderResetButton()}
                </CommandList>
              </CommandGroup>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </Suspense>
  );
}

export default SelectComponent;
