import { RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';

interface ICheckStatusProps {
  id: string;
  label: string;
  value: string;
}

const CheckStatus = ({ status }: { status: ICheckStatusProps }) => {
  return (
    <div className="flex items-center justify-between space-x-2">
      <RadioGroupItem value={status.value} id={status.id} />
      <label htmlFor={status.id} className="text-base font-medium text-custom-greyBlue">
        {status.label}
      </label>
    </div>
  );
};

export default CheckStatus;
