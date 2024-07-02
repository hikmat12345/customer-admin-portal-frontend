'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

interface ISubItem {
  name: string;
  path: string;
}

function SubMenuItem({ item, isActive }: { item: ISubItem; isActive: boolean }) {
  const { name, path } = item;
  const router = useRouter();

  const pathname = usePathname();

  const onClick = () => {
    router.push(path);
  };

  const isItemActive = useMemo(() => path === pathname, [path, pathname]);

  return (
    <div
      className={`hover:text-sidebar-active flex cursor-pointer items-center justify-between rounded-lg p-2 py-2 pl-9 text-sm text-[#CBE0FF] hover:bg-[#FFFFFF4D] hover:text-custom-white ${isItemActive && 'bg-[#FFFFFF4D] text-custom-white'} `}
      onClick={onClick}
    >
      {name}
    </div>
  );
}

export default SubMenuItem;
