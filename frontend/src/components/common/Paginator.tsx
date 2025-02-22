import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Pagination } from '@/types/pagination';

interface PaginationProps {
  pagination: Pagination;
}

const PaginationComponent: React.FC<PaginationProps> = ({ pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getNextPage = (): number | null => {
    const currentPage = pagination?.meta.current_page;
    if (currentPage === pagination?.meta.last_page || !currentPage) return null;
    return currentPage + 1;
  };

  const getPreviousPage = (): number | null => {
    const currentPage = pagination?.meta.current_page;
    if (currentPage === 1 || !currentPage) return null;
    return currentPage - 1;
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  // Check if current page exists
  useEffect(() => {
    if (!pagination) return;
    if (pagination.meta.current_page > pagination.meta.last_page) {
      goToPage(1);
    }
  }, [pagination]);

  if (!pagination?.links.next && !pagination?.links.prev) return null;

  const nextPage = getNextPage();
  const previousPage = getPreviousPage();

  return (
    <div className="flex gap-x-2 m-2">
      <div className="font-bold text-primary">
        {pagination.meta.total} items
      </div>

      {previousPage && (
        <button className="px-2" onClick={() => goToPage(previousPage)}>
          <ArrowLeft className="text-primary w-2" />
        </button>
      )}

      <div className="bg-primary text-white rounded-lg px-2 font-bold">
        {pagination.meta.current_page}
      </div>

      <div>
        of
      </div>

      <div className="px-2 font-bold">
        {pagination.meta.last_page}
      </div>

      {nextPage && (
        <button className="px-2" onClick={() => goToPage(nextPage)}>
          <ArrowLeft className="text-primary w-2 rotate-180" />
        </button>
      )}
    </div>
  );
};

export default PaginationComponent;
