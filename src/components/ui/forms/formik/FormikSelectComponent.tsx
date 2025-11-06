import React from 'react';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import Image from 'next/image';
import CommandInput from '@veroxos/design-system/dist/ui/CommandInput/commandInput';
import CommandEmpty from '@veroxos/design-system/dist/ui/CommandEmpty/commandEmpty';
import CommandGroup from '@veroxos/design-system/dist/ui/CommandGroup/commandGroup';
import CommandList from '@veroxos/design-system/dist/ui/CommandList/commandList';
import CommandItem from '@veroxos/design-system/dist/ui/CommandItem/commandItem';
import { Check } from 'lucide-react';
import { cn } from '@/utils/utils';
import { FieldProps, getIn } from 'formik';
import { useSearchParams } from 'next/navigation';
import { Command } from '../../command';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import TooltipText from '../../textbox';

interface FormikSelectProps extends FieldProps {
  error: boolean;
  helperText: string;
  reportValue?: string;
  label: string;
  placeholder?: string;
  options: any[];
  onChange?: any;
  isMultiSelect?: boolean;
}

function FormikSelectComponent(props: FormikSelectProps) {
  const {
    form: { setFieldValue, touched, errors, values },
    field: { name },
    field,
    helperText,
    reportValue,
    label,
    placeholder,
    options,
    onChange,
    isMultiSelect = true,
    ...rest
  } = props;
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const currentParamValue = (reportValue && searchParams?.get(reportValue)) || '';
  const currentValue = getIn(values, name);

  const isTouched = getIn(touched, name);
  const error = getIn(errors, field.name);
  let selectedOptions = options?.filter((option) => currentValue?.includes(option.value));
  if (!isMultiSelect && currentValue) {
    selectedOptions = options?.filter((option) => currentValue == option.value);
  }

  const handleSelect = (optionValue: string) => {
    if (optionValue === 'all') {
      const allValues = options.map((option) => option.value);
      setFieldValue(name, currentValue?.length === allValues.length ? [] : allValues);
      if (onChange) onChange(name, currentValue?.length === allValues.length ? [] : allValues);
    } else if (name === 'accounts' || name === 'serviceType') {
      const newValue = currentValue?.includes(optionValue)
        ? currentValue?.filter((value: string) => value !== optionValue)
        : [...currentValue, optionValue];
      setFieldValue(name, newValue);
      if (onChange) onChange(name, newValue);
    } else {
      setFieldValue(name, optionValue);
      if (onChange) onChange(name, optionValue);
    }
    setOpen(false);
  };

  return (
    <React.Suspense>
      <div className="flex flex-col gap-2">
        <span className="text-[0.875rem] font-semibold text-[#575757]">
          {label} <span className="text-rose-500"> *</span>
        </span>
        <Popover open={open} onOpenChange={setOpen} modal={true}>
          <PopoverTrigger asChild className="bg-custom-background outline-none">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-full justify-between ${((isTouched && error) || error) && 'border-2 border-rose-500'} `}
              value={12}
            >
              {selectedOptions?.length > 0 ? (
                selectedOptions.length === 1 ? (
                  <TooltipText text={selectedOptions[0].label} maxLength={25} />
                ) : (
                  <div className="flex items-center gap-2">
                    <TooltipText text={selectedOptions[0].label} maxLength={25} />
                    {`(+${selectedOptions.length - 1})`}
                  </div>
                )
              ) : (
                placeholder || label
              )}
              <Image
                src={open ? '/svg/select/upChevron.svg' : '/svg/select/downChevron.svg'}
                alt="Chevron Icon"
                width={20}
                height={20}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[100%] p-0">
            <Command>
              <>
                <CommandInput placeholder={placeholder} />
                <CommandEmpty>No data found</CommandEmpty>
              </>
              <CommandGroup>
                <CommandList>
                  {(name === 'accounts' || name === 'serviceType') && (
                    <CommandItem key="all" value="All" onSelect={() => handleSelect('all')}>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          currentValue?.length === options?.length ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      All
                    </CommandItem>
                  )}
                  {options?.map((option, index) => (
                    <CommandItem
                      key={`${option?.label}-${index++}`}
                      value={option.label}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          (!isMultiSelect ? currentValue == option?.value : currentValue?.includes(option?.value))
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {error && <span className="text-[0.75rem] text-rose-500">{error}</span>}
      </div>
    </React.Suspense>
  );
}

export default FormikSelectComponent;
