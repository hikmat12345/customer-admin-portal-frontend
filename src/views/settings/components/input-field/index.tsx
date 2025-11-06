import { Input } from '@/components/ui/input';
import React from 'react';

interface IProps {
  name: string;
  title: string;
  value?: string | number;
}

function InputField(props: IProps) {
  const { name, title, value } = props;
  return (
    <div className="mb-4 flex items-center">
      <label className="flex-1 text-sm font-medium" htmlFor={name}>
        {title}
      </label>
      <Input
        name={name}
        className="pointer-events-none flex-1 cursor-not-allowed focus-visible:ring-0"
        value={value}
        readOnly
      />
    </div>
  );
}

export default InputField;
