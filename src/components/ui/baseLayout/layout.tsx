'use client';

import SearchTextFieldArea from '@/components/ui/searchTextFieldArea';
import Sidebar from '@/components/ui/sidebar/sidebar';
import useGetUser from '@/hooks/useGetUser';
import useUserStore from '@/stores/useUserStore';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  useGetUser();

  const { loggedInUser } = useUserStore((state: any) => ({ loggedInUser: state.user }));

  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const pathSegments = pathname && pathname.split('/');

  const renameSummaryPagesTitles = (title: string) => {
    switch (title) {
      case 'inventory':
        return 'Service Summary';
      case 'invoices':
        return 'Invoice Summary';
      case 'sites':
        return 'Site Summary';
      case 'employees':
        return 'Employee Summary';
      case 'vendors':
        return 'Vendor Account';
      case 'asset':
        return 'Asset Summary';
      default:
        return title + ' Summary';
    }
  };

  const renameMainPagesTitles = (title: string) => {
    title = title.toLowerCase();

    switch (title) {
      case 'inventory':
        return 'View Services';
      case 'vendors':
        return 'Vendor Accounts';
      case 'employees':
        return 'View Employees';
      case 'profile':
      case 'company':
      case 'dashboard':
        return 'Settings';
      default:
        return title;
    }
  };

  const getPageTitle = () => {
    if (Object.keys(params).length >= 2) {
      // Pages with additional params i.e name (e.g., vendors, invoices)
      return renameSummaryPagesTitles(endWord(3));
    }
    if (Object.keys(params).length === 1) {
      // Normal summary pages except ticket summary page
      return renameSummaryPagesTitles(endWord(2));
    }
    return renameMainPagesTitles(endWord(1));
  };

  let endWord = (position: number = 1) => {
    const findPath = (pathSegments && pathSegments[pathSegments?.length - position]) || 'Home';
    return findPath.replace(/[-/]+/g, ' ');
  };

  const handleRouteBack = () => {
    router.back();
  };

  const isTicketSummaryPage = !isNaN(Number(params?.ticketId));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex max-h-full min-h-[100vh] w-full flex-col bg-[#f4f7fe] py-[1rem] pl-[240px] pr-[2.813rem] md:pl-[260px] lg:pl-[280px] xl:pl-[300px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="relative flex items-center gap-5">
            {isTicketSummaryPage ? (
              <h2 className="text-[1.875rem] font-bold capitalize text-custom-black">{endWord(3)}</h2>
            ) : (
              <>
                {endWord() === 'search' && (
                  <button
                    className="absolute left-[5px] flex h-[27px] w-[27px] items-center justify-center rounded-full border border-custom-blue p-2"
                    onClick={handleRouteBack}
                  >
                    <Image src="/svg/search/arrowBack.svg" alt="Arrow back" width={6} height={6} />
                  </button>
                )}
                <h2
                  className={`text-[1.875rem] font-bold capitalize text-custom-black ${endWord() === 'search' && 'ml-14'}`}
                >
                  {getPageTitle()}
                </h2>
              </>
            )}
          </div>
          <SearchTextFieldArea firstName={loggedInUser?.firstName} lastName={loggedInUser?.lastName} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
