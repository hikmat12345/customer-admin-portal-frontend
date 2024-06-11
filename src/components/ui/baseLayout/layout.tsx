'use client';

import SearchTextFieldArea from '@/components/ui/searchTextFieldArea';
import Sidebar from '@/components/ui/sidebar/sidebar';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

function BaseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const pathSegments = pathname && pathname.split('/');
  const endWord = (position: number = 1) => {
    const findPath = (pathSegments && pathSegments[pathSegments?.length - position]) || 'Home';
    return findPath.replace(/[-/]+/g, ' ');
  };

  const handleRouteBack = () => {
    router.back();
  };

  const isSummaryPage = !isNaN(Number(params?.id));
  const isTicketSummaryPage = !isNaN(Number(params?.ticketId));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex max-h-full min-h-[100vh] w-full flex-col bg-custom-background py-[1rem] lg:pl-[279px] lg:pr-[30px] xl:pl-[300px] xl:pr-[55px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="relative flex items-center gap-5">
            {isTicketSummaryPage ? (
              <h2 className="text-[30px] font-bold capitalize text-custom-black">{endWord(2)}</h2>
            ) : (
              <>
                {endWord() === 'search' && (
                  <button
                    className="absolute left-[-20px] flex h-[27px] w-[27px] items-center justify-center rounded-full border border-custom-blue p-2"
                    onClick={handleRouteBack}
                  >
                    <Image src="/svg/search/arrowBack.svg" alt="Arrow back" width={6} height={6} />
                  </button>
                )}
                <h2
                  className={`text-[30px] font-bold capitalize text-custom-black ${endWord() === 'search' ? 'ml-5' : ''}`}
                >
                  {isSummaryPage ? endWord(2) + ' Summary' : endWord()}
                </h2>
              </>
            )}
          </div>
          <SearchTextFieldArea />
        </div>
        {children}
      </div>
    </div>
  );
}

export default BaseLayout;
