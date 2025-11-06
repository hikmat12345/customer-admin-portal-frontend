import { SuperInput } from '../../../shared';
import React, { ReactNode } from 'react';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../../ui/Calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/Calendar/popover';
import { cn } from '@/utils/utils';
import { MONTH_DAY_AND_YEAR } from '@/utils/constants/dateFormat.constants';

interface InputDateComponentProps {
  render?: {
    dateFormat?: string;
    placeHolder?: string;
  };
  title: string;
  id: string;
  defaultValue?: string;
}

class InputDateComponent extends SuperInput<any> {
  constructor(props: InputDateComponentProps) {
    super(props);
    this.state = {
      value: '',
      error: '', // Add the 'error' property to the state object
      popoverOpen: false, // Manage popover open state
    };
  }

 

  setPopoverOpen = (open: boolean): void => {
    this.setState({ popoverOpen: open });
  };

  render(): ReactNode {
    const { render, title, id } = this.props;
    const { value, error, popoverOpen } = this.state;

   const handleChangeText = (value: any): void => {
      this.setState({ value });
       sessionStorage.setItem(id, JSON.stringify({title: title, value: value && format(new Date(value), 'MM/dd/yyyy'), displayValue: value && format(new Date(value), 'MM/dd/yyyy')}));
    };
    return (
      <div className="flex flex-col gap-2">
        <span className="text-[0.875rem] font-semibold text-[#575757]">
          {title ?? title} <span className="text-rose-500"> *</span>
        </span>
        <Popover open={popoverOpen} onOpenChange={this.setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              onClick={() => this.setPopoverOpen(true)}
              variant="outline"
              className={`w-full h-20 justify-start text-left font-normal bg-white ${!value && 'text-muted-foreground'} ${error && 'border-2 border-rose-500'}`}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(new Date(value), MONTH_DAY_AND_YEAR) : <span>{render?.placeHolder ?? 'Pick a date'}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start" side="bottom">
            <Calendar
              mode="single"
              captionLayout="dropdown-buttons"
              selected={value ? new Date(value) : undefined}
              onSelect={handleChangeText}
              onDayClick={() => this.setPopoverOpen(false)}
              initialFocus
              // disabled={isDateDisabled}
              fromYear={1960}
              toYear={new Date().getFullYear()}
              // Set initial month and year to the selected date's month and year
              defaultMonth={value ? new Date(value) : undefined}
            />
          </PopoverContent>
        </Popover>
        {error && <span className="text-[0.75rem] text-red-500">{error}</span>}
      </div>
    );
  }
}

export default InputDateComponent;
