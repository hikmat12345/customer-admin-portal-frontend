import { useRef } from 'react';
import ScrollArea from '@veroxos/design-system/dist/ui/ScrollArea/scroll-area';
import Image from 'next/image';
import httpClient from '@/services/httpClient';
import { Separator } from '../separator';
import SidebarItem from './sidebarItem';

interface ISidebarItem {
  name: string;
  path: string;
  src: string;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const menuItems: ISidebarItem[] = [
  {
    name: 'Home',
    path: '/',
    src: '/svg/sidebar/home.svg',
  },
  {
    name: 'Support',
    path: '/support',
    src: '/svg/sidebar/support.svg',
    items: [
      {
        name: 'Veroxos Support',
        path: 'support/veroxos-support',
      },
      {
        name: 'View Tickets',
        path: '/support/tickets',
      },
    ],
  },
  {
    name: 'Accounts',
    path: '/accounts',
    src: '/svg/sidebar/accounts.svg',
    items: [
      {
        name: 'View Invoices',
        path: '/accounts/invoices',
      },
    ],
  },
  {
    name: 'Inventory',
    path: '/inventory',
    src: '/svg/sidebar/inventory.svg',
  },
  {
    name: 'Reporting',
    path: '/reporting',
    src: '/svg/sidebar/reporting.svg',
    items: [
      {
        name: 'Reports',
        path: '/reporting/reports',
      },
    ],
  },
  {
    name: 'Optimization',
    path: '/optimization',
    src: '/svg/sidebar/optimization.svg',
  },
];

const supportItems = [
  {
    name: 'Knowledge Base',
    path: '/knowledge-base',
    src: '/svg/sidebar/knowledgeBase.svg',
  },
  {
    name: 'Chat',
    path: '/chat',
    src: '/svg/sidebar/chat.svg',
  },
  {
    name: 'Veroxos Support',
    path: '/veroxos-support',
    src: '/svg/sidebar/veroxosSupport.svg',
  },
];

function Sidebar() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToItem = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onClickLogout = async () => {
    const response = await httpClient.post('/api/logout', {});
    window.location.href = response.data.redirectUrl;
  };

  return (
    <div className="fixed left-0 top-0 z-10 h-full w-[280px] bg-custom-blue px-4 py-[8px] shadow-lg lg:w-[250px]">
      <div className="relative flex h-full flex-col justify-between px-5">
        <div className="flex w-full flex-col space-y-3">
          <Image
            src="/svg/logo.svg"
            height={80}
            width={200}
            alt="Logo image"
            style={{ margin: 'auto' }}
            loading="lazy"
          />
          <h2 className="pb-1 text-sm uppercase text-custom-white">Menu</h2>
          <ScrollArea className="h-auto lg:h-[210px] xl:min-h-[450px]">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item, index) => (
                <SidebarItem key={index} data={item} scrollToItem={scrollToItem} />
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-col gap-10 pb-4">
          <div className="relative">
            <h2 className="pb-3 text-sm uppercase text-custom-white">Support</h2>
            {supportItems.map((item, index) => (
              <SidebarItem key={index} data={item} scrollToItem={scrollToItem} />
            ))}
            <div className="absolute mb-3 mt-3 w-full">
              <Separator />
            </div>
          </div>

          <div className="relative">
            <h2 className="pb-3 text-sm uppercase text-custom-white">Other</h2>
            <div
              onClick={onClickLogout}
              className="flex w-full cursor-pointer items-center justify-start space-x-2 rounded-lg p-2 text-start text-sm font-normal text-[#CBE0FF] hover:bg-[#FFFFFF4D]"
            >
              <Image src="/svg/sidebar/logout.svg" height={16} width={16} alt="icons" />
              <span>Log Out</span>
            </div>
            <div className="absolute left-0 mt-3 w-full">
              <Separator />
            </div>
          </div>
          <h2 className="text-center text-sm font-normal text-custom-white">Powered by Veroxos</h2>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
