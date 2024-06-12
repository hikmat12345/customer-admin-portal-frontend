import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Image from "next/image";
import React, { forwardRef } from "react";

interface IProps {
  className?: string;
  iconHeight?: number;
  iconWidth?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  defaultValue?: any;
  helpText: string;
}

const SearchField = forwardRef(
  (props: IProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      className,
      iconHeight = 10,
      iconWidth = 10,
      onChange,
      onKeyDown,
      defaultValue,
      helpText,
    } = props;
    return (
      <div className="min-w-[390px]">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative flex">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Image
              src="/svg/search.svg"
              alt="Search icon"
              height={iconHeight}
              width={iconWidth}
            />
          </div>
          <input
            type="search"
            className={`block w-full p-2 ps-8 text-sm text-gray-900 rounded-3xl bg-custom-background focus:ring-blue-500 focus:border-[#44444480] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-[#44444480] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none ${className}`}
            placeholder="Search"
            onChange={onChange}
            onKeyDown={onKeyDown}
            defaultValue={defaultValue}
            ref={ref}
            required
          />
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  className="absolute right-0 top-1"
                  src={"/svg/help.svg"}
                  width={20}
                  height={20}
                  alt="help icon"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-custom-white px-4 py-2 rounded-lg shadow-[0_4px_14px_0px_#00000040]">
                <p>{helpText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    );
  }
);

SearchField.displayName = "SearchField";

export default SearchField;
