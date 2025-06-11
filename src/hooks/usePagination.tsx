import {useState, useMemo} from 'react';

function usePagination<T>(
  data: T[] = [],
  itemsPerPage: number = 1,
  totalPages: number = 0
) {
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, data, itemsPerPage]);
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const setPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };
  return {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    setPage,
    itemsPerPage,
  };
}

export default usePagination;
