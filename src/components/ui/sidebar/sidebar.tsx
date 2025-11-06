import { useRef, useState } from 'react';
import ScrollArea from '@veroxos/design-system/dist/ui/ScrollArea/scroll-area';
import CommonDialog from '@veroxos/design-system/dist/ui/CommonDialog/commonDialog';
import Image from 'next/image';
import httpClient from '@/services/httpClient';
import { Separator } from '../separator';
import SidebarItem from './sidebarItem';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import toast from 'react-hot-toast';
import Link from 'next/link';

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

const menuItems: ISidebarItem[] = [
  {
    name: 'Home',
    path: '/',
    target: '',
    src: '/svg/sidebar/home.svg',
  },
  {
    name: 'Support',
    path: '/support',
    target: '',
    src: '/svg/sidebar/support.svg',
    items: [
      {
        name: 'Veroxos Support',
        path: '/veroxos-support',
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
    target: '',
    src: '/svg/sidebar/accounts.svg',
    items: [
      {
        name: 'View Invoices',
        path: '/accounts/invoices',
      },
      {
        name: 'Vendor Accounts',
        path: '/accounts/vendors',
      },
      {
        name: 'Account Payable Feed',
        path: '/accounts/account-payable-feed',
      },
    ],
  },
  {
    name: 'Inventory',
    path: '/inventory',
    target: '',
    src: '/svg/sidebar/inventory.svg',
    items: [
      {
        name: 'View Services',
        path: '/inventory',
      },
      {
        name: 'View Sites',
        path: '/inventory/sites',
      },
      {
        name: 'View Employees',
        path: '/inventory/employees',
      },
      {
        name: 'View Assets',
        path: '/inventory/assets',
      },
    ],
  },
  {
    name: 'Reporting',
    path: '/reporting',
    target: '',
    src: '/svg/sidebar/reporting.svg',
    items: [
      {
        name: 'Reports',
        path: '/reporting/reports',
      },
      {
        name: 'View Scheduled Reports',
        path: '/reporting/view-scheduled-reports',
      },
    ],
  },
  {
    name: 'Optimization',
    path: '/optimization',
    target: '',
    src: '/svg/sidebar/optimization.svg',
    items: [
      {
        name: 'Saving Tracker',
        path: '/optimization/saving-tracker',
      },
    ],
  },
];

const supportItems = [
  {
    name: 'Help Center',
    path: 'https://help.veroxos.com/hc/en-us',
    target: '_blank',
    src: '/svg/sidebar/knowledgeBase.svg',
  },
  //TODO: might need this in future so keeping this here
  // {
  //   name: 'Chat',
  //   path: '/chat',
  //   src: '/svg/sidebar/chat.svg',
  // },
  {
    name: 'Veroxos Support',
    path: 'https://help.veroxos.com/hc/en-us/articles/4456958929695-How-to-get-Support',
    target: '_blank',
    src: '/svg/sidebar/veroxosSupport.svg',
  },
];

function Sidebar() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToItem = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const confirmLogout = async () => {
    setIsLogoutDialogOpen(false);
    try {
      const response = await httpClient.post('/api/session/logout');
      toast.success('Success, you are now being redirected to the login page');
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error('error :>> ', error);
      toast.error('Something went wrong, please try again');
    }
  };

  const onClickLogout = async () => {
    setIsLogoutDialogOpen(true);
  };

  return (
    <div className="fixed left-0 top-0 z-10 h-full w-[200px] bg-custom-blue px-4 py-[8px] shadow-lg md:w-[220px] lg:w-[250px] xl:w-[280px]">
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
            <div className="flex flex-col space-y-1">
              {supportItems.map((item, index) => (
                <SidebarItem key={index} data={item} scrollToItem={scrollToItem} />
              ))}
            </div>
            <div className="absolute mb-3 mt-3 w-full">
              <Separator />
            </div>
          </div>

          <div className="relative">
            <h2 className="pb-3 text-sm uppercase text-custom-white">Other</h2>
            <div
              onClick={onClickLogout}
              className={`flex w-full cursor-pointer items-center justify-start space-x-2 rounded-lg p-2 text-start text-sm font-normal text-[#CBE0FF] hover:bg-[#FFFFFF4D]`}
            >
              <Image src="/svg/sidebar/logout.svg" height={16} width={16} alt="icons" />
              <span>Log Out</span>
            </div>
            <div className="absolute left-0 mt-3 w-full">
              <Separator />
            </div>
          </div>
          <h2 className="text-center text-sm font-normal text-custom-white">
            <Link
              href="https://www.veroxos.com/"
              target="_blank"
              className="text-custom-white visited:text-custom-white hover:text-custom-white hover:underline"
            >
              Powered by Veroxos
            </Link>
          </h2>
        </div>
      </div>

      <CommonDialog
        open={isLogoutDialogOpen}
        actions={
          <>
            <Button onClick={() => setIsLogoutDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button variant={'outline'} color="primary" onClick={confirmLogout}>
              Confirm
            </Button>
          </>
        }
        content={
          <div>
            <p>Are you sure you want to log out? Click confirm to proceed.</p>
          </div>
        }
        description=""
        onClose={() => setIsLogoutDialogOpen(false)}
        size="medium"
        title="Confirm Logout"
      />
    </div>
  );
}

export default Sidebar;
