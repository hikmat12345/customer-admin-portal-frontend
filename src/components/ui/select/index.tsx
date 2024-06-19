import * as React from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SelectComponent({
  placeholder,
  options,
  className,
  name,
  required = false,
}: {
  placeholder: string;
  options: { label: string; value: string }[];
  className?: string;
  name?: string;
  required?: boolean;
}) {
  return (
    <Select required={required} name={name}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option: { label: string; value: string }) => (
            <SelectItem key={option.label} value={option.label}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
