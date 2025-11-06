'use client';

import React from 'react';
import Avatar from '@veroxos/design-system/dist/ui/Avatar/avatar';
import AvatarFallback from '@veroxos/design-system/dist/ui/AvatarFallback/avatarFallback';
import AvatarImage from '@veroxos/design-system/dist/ui/AvatarImage/avatarImage';

import AnimatedSearchField from '@/components/ui/animated-search-field';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';
import { usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu';

const searchTextFieldVariants = cva('flex justify-between bg-custom-white p-2 rounded-full gap-x-1', {
  variants: {
    variant: {
      default: 'w-auto',
      expanded: 'lg:w-[530px]',
    },
  },
});

function getInitials(firstName: string, lastName: string) {
  const firstInitial = firstName ? firstName.charAt(0) : '';
  const lastInitial = lastName ? lastName.charAt(0) : '';
  return `${firstInitial}${lastInitial}`;
}

function SearchTextField({ firstName, lastName }: { firstName: string; lastName: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const [position, setPosition] = React.useState('bottom');

  const router = useRouter();
  const pathname = usePathname();

  const variant = expanded ? 'expanded' : 'default';
  const handleOnSubmit = (query: string) => {
    router.push(`/search?query=${query}`);
  };
  const items = [
    {
      id: 1,
      label: 'Bot Message',
      type: 'bot',
      src: '/svg/navbar/bot-message.svg',
      menuItems: [],
    },
    {
      id: 2,
      label: `${firstName} ${lastName}`,
      type: 'avatar',
      src: '/icons/navbar/dummyAvatar.jpg',
      menuItems: [{ id: 1, label: 'Settings', link: '/settings/profile' }],
    },
  ];

  const initials = getInitials(firstName, lastName);

  return (
    <div className={cn(searchTextFieldVariants({ variant }))}>
      {pathname !== '/search' && (
        <AnimatedSearchField variant={variant} setExpanded={setExpanded} onSubmit={handleOnSubmit} />
      )}
      <div className="flex flex-1 items-center justify-end gap-x-2 pl-2">
        {items.map((item, index) => (
          <div key={index} className={index === items?.length - 1 ? 'ml-1' : ''}>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer" asChild>
                {item.type === 'avatar' && (
                  <Avatar>
                    <AvatarImage src="/icons/s/navbar/dummyAvatar.jpg" />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {item.menuItems.map((menuItem) => (
                  <DropdownMenuRadioGroup value={position} onValueChange={setPosition} key={menuItem.id}>
                    <DropdownMenuRadioItem
                      className="cursor-pointer"
                      value={menuItem.label}
                      onClick={() => router.push(menuItem.link)}
                    >
                      {menuItem.label}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchTextField;
