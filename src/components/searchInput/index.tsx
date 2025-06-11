import {FunctionComponent} from 'react';
import {SearchInputProps} from './type';

const SearchInput: FunctionComponent<SearchInputProps> = ({
  search,
  setSearch,
}) => {
  return (
    <div className="border border-gray-200 px-2 py-1 rounded-md w-62 flex items-center gap-2">
      <img src="/icons/search.svg" alt="search" className="h-4 w-4" />
      <input
        type="text"
        placeholder="Keyword search"
        className="placeholder:font-semibold text-base outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
