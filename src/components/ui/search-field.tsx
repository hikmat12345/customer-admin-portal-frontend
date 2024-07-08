import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import Image from 'next/image';
import React, { forwardRef } from 'react';

interface IProps {
  className?: string;
  iconHeight?: number;
  iconWidth?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  defaultValue?: any;
  helpText?: string;
}

const SearchField = forwardRef((props: IProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const { className, iconHeight = 10, iconWidth = 10, onChange, onKeyDown, defaultValue, helpText } = props;
  return (
    <div>
      <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
      <div className="relative flex">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <Image src="/svg/search.svg" alt="Search icon" height={iconHeight} width={iconWidth} />
        </div>
        <input
          type="search"
          className={`block w-full rounded-3xl bg-custom-background p-2 pr-6 ps-8 text-sm text-gray-900 outline-none focus:border-[#44444480] focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-[#44444480] dark:focus:border-blue-500 dark:focus:ring-blue-500 ${className}`}
          placeholder="Search"
          onChange={onChange}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
          ref={ref}
          required
        />
        {helpText && (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  className="absolute right-0 top-2"
                  src={'/svg/help.svg'}
                  width={20}
                  height={20}
                  alt="help icon"
                />
              </TooltipTrigger>
              <TooltipContent className="rounded-lg bg-custom-white px-4 py-2 text-[0.813rem] font-[300] leading-[1.023rem] shadow-[0_4px_14px_0px_#00000040]">
                <p>{helpText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
});

SearchField.displayName = 'SearchField';

export default SearchField;
