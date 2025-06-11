import {Select} from 'antd';
import {PaginationProps} from './type';

const Pagination = ({
  totalPages = 1,
  currentPage = 1,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <div className="flex justify-center gap-2 py-1 items-center bg-white">
      <div className="flex items-center gap-2">
        <button
          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          <img src="/icons/angle-left.svg" className="h-8 w-8" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || totalPages === 0}
        >
          <img src="/icons/angle-prev.svg" className="h-7 w-7" />
        </button>
        <div className="hidden sm:flex gap-1">
          {Array.from({length: totalPages}, (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer text-xl ${
                currentPage === i + 1
                  ? 'bg-cyan-50 text-cyan-700'
                  : 'text-gray-500'
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          )).slice(0, 10)}
        </div>
        <button
          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <img src="/icons/angle-next.svg" className="h-8 w-8" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <img src="/icons/angle-right.svg" className="h-8 w-8" />
        </button>
        <div className="hidden sm:flex gap-1">
          <Select
            value={currentPage}
            onChange={(value) => setCurrentPage(Number(value))}
            className="px-4 py-2 rounded text-gray-700 appearance-none"
          >
            {Array.from({length: totalPages}, (_, i) => (
              <Select.Option key={i + 1} value={i + 1}>
                {i + 1}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="hidden sm:block text-lg text-gray-500 mt-0">
        ({currentPage} of {totalPages})
      </div>
    </div>
  );
};

export default Pagination;
