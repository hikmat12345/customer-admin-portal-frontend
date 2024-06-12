import Image from 'next/image';
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';

interface IProps {
  className?: string;
  iconHeight?: number;
  iconWidth?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: 'default' | 'expanded';
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (val: string) => void;
}
function AnimatedSearchField({
  className,
  iconHeight = 14,
  iconWidth = 14,
  onChange,
  variant = 'default',
  setExpanded,
  onSubmit,
}: IProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const searchVariants = cva('h-100 flex items-center', {
    variants: {
      variant: {
        default: 'ml-1',
        expanded: '',
      },
    },
  });
  const searchFormVariants = cva('', {
    variants: {
      variant: {
        default: 'w-0 ',
        expanded: 'w-[390px] ',
      },
    },
  });
  const searchButtonVariants = cva(
    'group flex items-center justify-center rounded-full p-1 hover:bg-custom-blue h-[28px] w-[28px] z-40',
    {
      variants: {
        variant: {
          default: 'border-0 ',
          expanded: 'border ml-2 ',
        },
      },
    },
  );
  const handleOnClick = () => {
    switch (variant) {
      case 'default': {
        setExpanded((prev: boolean) => !prev);
        return;
      }
      case 'expanded': {
        setExpanded((prev: boolean) => !prev);
        if (searchQuery !== '') {
          onSubmit(searchQuery);
        }
        setSearchQuery('');
      }
      default:
    }
  };
  return (
    <div className={cn(searchVariants({ variant }))}>
      <form
        className={cn(searchFormVariants({ variant }))}
        onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleOnClick();
        }}
      >
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <Image src="/svg/search.svg" alt="Search icon" height={iconHeight} width={iconWidth} />
          </div>
          <input
            type="search"
            className={`block w-full rounded-3xl p-2 ps-8 text-sm text-gray-900 ${
              variant === 'default' ? 'bg-white' : 'bg-custom-background'
            } outline-none focus:border-[#44444480] focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-[#44444480] dark:focus:border-blue-500 dark:focus:ring-blue-500 ${className}`}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
      </form>
      <button className={cn(searchButtonVariants({ variant }))} onClick={handleOnClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke={variant === 'default' ? '#A0A0A0' : '#1D46F3'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:stroke-white"
          />
          <path
            d="M21.0002 21L16.7002 16.7"
            stroke={variant === 'default' ? '#A0A0A0' : '#1D46F3'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:stroke-white"
          />
        </svg>
      </button>
    </div>
  );
}
export default AnimatedSearchField;
