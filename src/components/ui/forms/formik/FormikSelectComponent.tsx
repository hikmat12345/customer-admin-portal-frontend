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

interface FormikSelectProps extends FieldProps {
  error: boolean;
  helperText: string;
  reportValue?: string;
  label: string;
  placeholder?: string;
  options: any[];
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
    ...rest
  } = props;
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();

  const currentParamValue = (reportValue && searchParams?.get(reportValue)) || '';
  const currentValue = getIn(values, name);

  const isTouched = getIn(touched, name);
  const error = getIn(errors, field.name);

  const selectedOption = options?.find((option) => option.value === currentValue);

  return (
    <React.Suspense>
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-semibold text-[#575757]">
          {label} <span className="text-rose-500"> *</span>
        </span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="bg-custom-background outline-none">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-full justify-between ${((isTouched && error) || error) && 'border-2 border-rose-500'} `}
              value={12}
            >
              {selectedOption ? selectedOption.label : label}
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
                  {options?.map((option, index) => (
                    <CommandItem
                      key={`${option?.label}-${index++}`}
                      value={option.value}
                      onSelect={() => {
                        setFieldValue(name, option.value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn('mr-2 h-4 w-4', currentValue == option.value ? 'opacity-100' : 'opacity-0')}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {isTouched && error && <span className="text-[12px] text-rose-500">{error}</span>}
      </div>
    </React.Suspense>
  );
}

export default FormikSelectComponent;
