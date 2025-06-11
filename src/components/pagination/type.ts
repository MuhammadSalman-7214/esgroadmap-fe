import {Dispatch, SetStateAction} from 'react';

export interface PaginationProps {
  data?: any;
  itemsPerPage?: number;
  totalPages?: number;
  currentPage?: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
