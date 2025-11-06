'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import SubMenuItem from '../submenuItem';

interface ISidebarItemProps {
  data: ISidebarItem;
  scrollToItem: () => void;
}
interface ISidebarItem {
  name: string;
  path: string;
  src: string;
  target: string;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const sanitizePath = (path: string | null) => {
  const trailingSlash = /\/$/;
  return path?.replace(trailingSlash, '');
};

function SidebarItem({ data, scrollToItem }: ISidebarItemProps) {
  const { name, src, items, path } = data;
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (items && items?.length > 0) {
      return setExpanded(!expanded);
    }
    scrollToItem();
    if (data.target.length > 0) {
      window.open(path, data.target);
    } else {
      return router.push(path);
    }
  };
  const isActive = useMemo(() => {
    if (items && items?.length > 0) {
      if (items.find((item) => item.path === pathname)) {
        setExpanded(true);
        return true;
      }
    }

    return path === pathname;
  }, [items, path, pathname]);

  const routes = items?.map((submenu) => submenu.path);
  const mainMenuSelected = sanitizePath(data?.path) === sanitizePath(pathname);
  const selected = pathname && routes?.includes(pathname);

  const isMainMenuActive = selected || mainMenuSelected;

  const hasSubitems = items && items?.length > 0;

  return (
    <>
      <div
        className={`flex cursor-pointer items-center justify-between rounded-lg p-2 py-2 hover:bg-[#FFFFFF4D] ${
          hasSubitems ? 'hover:bg-[#FFFFFF4D] hover:text-custom-white' : ''
        } ${isMainMenuActive && !hasSubitems ? 'bg-[#FFFFFF4D] text-custom-white' : ''}`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-2">
          <Image src={src} height={15} width={15} alt="icons" />
          <p
            className={`text-sm text-[#CBE0FF] hover:text-custom-white ${
              isMainMenuActive && !hasSubitems ? 'text-custom-white' : ''
            } ${isActive ? 'text-custom-white' : ''}`}
          >
            {name}
          </p>
        </div>
        {items && items?.length > 0 && (
          <Image
            src={expanded ? '/svg/upChevron.svg' : '/svg/downChevron.svg'}
            alt="Chevron icon"
            width={18}
            height={18}
          />
        )}
      </div>
      {expanded && items && items?.length > 0 && (
        <div className="flex flex-col space-y-1">
          {items.map((item) => (
            <SubMenuItem key={item.path} item={item} isActive={isActive} />
          ))}
        </div>
      )}
    </>
  );
}

export default SidebarItem;
