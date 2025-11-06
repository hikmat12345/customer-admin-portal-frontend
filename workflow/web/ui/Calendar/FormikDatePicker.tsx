'use client';

import { getIn, FieldProps } from 'formik';
import * as React from 'react';
 import { CalendarIcon } from 'lucide-react';
import { format, getMonth, getYear, isFuture, isValid, parse, parseISO } from 'date-fns';
  import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';
import { MONTH_DAY_AND_YEAR } from 'workflow/web/utils';

interface FormikDatePickerProps extends FieldProps {
  error: boolean;
  helperText: string;
  label: string;
  isScheduled: boolean;
  className: string;
}

export function parseUnknownFormatDate(dateString: string) {
  let parsedDate;

  // Try to parse as ISO format first
  parsedDate = parseISO(dateString);
  if (isValid(parsedDate)) {
    return format(parsedDate, 'yyyy-MM-dd');
  }
  const knownFormats = [
    'MM-yyyy',
    'yyyy-MM',
    'yyyy-MM-dd',
    'MM/dd/yyyy',
    'dd/MM/yyyy',
    'MM-dd-yyyy',
    'yyyy/MM/dd',
    'MMM dd, yyyy',
    'dd MMM yyyy',
  ];
  // Try to parse with known formats
  for (const formatStr of knownFormats) {
    parsedDate = parse(dateString, formatStr, new Date());
    if (isValid(parsedDate)) {
      return format(parsedDate, 'yyyy-MM-dd');
    }
  }

  // Handle invalid date by returning an empty string or a default value
  return '';
}

function FormikDatePicker(props: FormikDatePickerProps) {
  const {
    form: { setFieldValue, setFieldError, touched, errors, values },
    field: { name },
    field,
    helperText,
    label,
    className,
    isScheduled = false,
    ...rest
  } = props;

  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const isTouched = getIn(touched, name);
  const error = getIn(errors, field.name);

  const date = getIn(values, name)
    ? isValid(getIn(values, name))
      ? getIn(values, name)
      : parseUnknownFormatDate(getIn(values, name))
    : getIn(values, name);
  const startDate = getIn(values, 'From');
  const endDate = getIn(values, 'To');

  const handleDateSelect = (value: Date | undefined) => {
    if (value && isDateDisabled(value)) {
      return; // prevent selecting disabled dates
    }

    if (name === 'To' && startDate && value && value < new Date(startDate)) {
      // setting value and message of the error
      setFieldError('To', 'End date cannot be less than start date');
      return;
    }
    if (name === 'From' && endDate && value && value > new Date(endDate)) {
      // setting value and message of the error
      setFieldError('From', 'Start date cannot be greater than end date');
      return;
    }
    setFieldError('To', undefined);
    setFieldError('From', undefined);

    setFieldValue(name, value);
    setTimeout(() => setPopoverOpen(false), 200); // Delay closing the popover by 200ms
  };

  const today = new Date();

  const isDateDisabled = (date: Date) => {
    return !isScheduled && isFuture(date) && (getMonth(date) > getMonth(today) || getYear(date) > getYear(today));
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.875rem] font-semibold text-[#575757]">
        {label ?? name} <span className="text-rose-500"> *</span>
      </span>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
        <button
            onClick={() => setPopoverOpen(true)}
             className={`w-[240px] justify-start text-left font-normal
              ${!date && 'text-muted-foreground'}
              ${((isTouched && error) || error) && 'border-2 border-rose-500'}
              ${className}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, MONTH_DAY_AND_YEAR) : <span>Pick a date</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" side="bottom">
        <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            selected={date ? new Date(date) : undefined}
            onSelect={handleDateSelect}
            onDayClick={() => setPopoverOpen(false)}
            initialFocus
            disabled={isDateDisabled}
            fromYear={1960}
            toYear={new Date().getFullYear()}
            // Set initial month and year to the selected date's month and year
            defaultMonth={date ? new Date(date) : undefined}
          />
        </PopoverContent>
      </Popover>
      {error && <span className="text-[0.75rem] text-red-500">{error}</span>}
    </div>
  );
}

export default FormikDatePicker;
