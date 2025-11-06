'use client';

import React from 'react';
import Link from 'next/link';
import { UserRound, Building2, LayoutDashboard } from 'lucide-react';
import { cn } from '@/utils/utils';
import { usePathname } from 'next/navigation';

const MENU_ITEMS = [
  {
    id: 1,
    slug: 'profile',
    title: 'Profile',
    description: 'Check your profile',
    icon: UserRound,
    link: '/settings/profile',
  },

  {
    id: 2,
    slug: 'company',
    title: 'Company',
    description: 'Check company details',
    icon: Building2,
    link: '/settings/company',
  },
  {
    id: 3,
    slug: 'dashboard',
    title: 'Dashboard Settings',
    description: 'Check dashboard settings',
    icon: LayoutDashboard,
    link: '/settings/dashboard',
  },
];

function MenuItems() {
  const pathname = usePathname();
  const isActive = React.useCallback((slug: string) => pathname.includes(slug), [pathname]);
  return (
    <div className="h-full">
      {MENU_ITEMS.map((item) => (
        <Link href={item.link} key={item.id}>
          <div
            className={cn(
              'relative mb-2 flex w-[95%] items-center gap-x-4 rounded-lg px-4 py-3',
              isActive(item.slug) && 'bg-white',
            )}
          >
            <div>
              <item.icon color={isActive(item.slug) ? '#F45E09' : 'black'} />
            </div>
            <div>
              <h4 className={cn('text-lg font-semibold', isActive(item.slug) && 'text-[#F45E09]')}>{item.title}</h4>
              <p className="text-sm text-[#637381]">{item.description}</p>
            </div>
            {isActive(item.slug) && (
              <div className="absolute right-[-15px] h-[30px] w-[30px] rotate-45 rounded-lg bg-white"></div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MenuItems;
