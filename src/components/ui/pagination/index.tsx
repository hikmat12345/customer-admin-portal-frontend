import React, { Suspense, useEffect, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

function Pagination({
  className,
  totalPages,
  onPageChange,
  currentPage = 1,
  pageRange = 5,
}: {
  className?: string;
  totalPages: number;
  onPageChange: (arg0: number) => void;
  currentPage?: number;
  pageRange?: number;
}) {
  const [currentPageRange, setCurrentPageRange] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const newPageRange = Math.ceil(currentPage / pageRange);
    setCurrentPageRange((newPageRange - 1) * pageRange + 1);
  }, [currentPage, pageRange]);

  const handlePageChange = (page: number) => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());

      const filterParamsToPreserve = ['status', 'priority'];
      filterParamsToPreserve.forEach((param) => {
        if (params.has(param)) {
          params.set(param, params.get(param)!);
        }
      });

      router.push(`${pathname}?${params.toString()}`);
    }
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPageRange);
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink className="cursor-pointer" onClick={() => handlePageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  const handlePrevPageRange = () => {
    const prevPage = Math.max(1, currentPageRange - pageRange);
    setCurrentPageRange(prevPage);
    handlePageChange(prevPage + pageRange - 1);
  };

  const handleNextPageRange = () => {
    const nextPage = currentPageRange + pageRange;
    const nextRangeLastPage = Math.min(totalPages, nextPage + pageRange - 1);

    if (nextRangeLastPage <= totalPages) {
      setCurrentPageRange(Math.min(totalPages - pageRange + 1, nextPage));
      handlePageChange(nextPage);
    }
  };

  return (
    <Suspense>
      <nav role="navigation" aria-label="pagination" className={cn('mx-auto flex w-full justify-center', className)}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`cursor-pointer ${
                currentPageRange === 1 && 'pointer-events-none bg-gray-600 text-white opacity-25'
              }`}
              onClick={handlePrevPageRange}
            />
          </PaginationItem>
          {currentPageRange > 1 && (
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => setCurrentPageRange(currentPageRange - pageRange)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          )}
          {renderPageNumbers()}
          {currentPageRange + pageRange <= totalPages && (
            <>
              {totalPages > pageRange && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext className="cursor-pointer" onClick={handleNextPageRange} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </nav>
    </Suspense>
  );
}

export default Pagination;
