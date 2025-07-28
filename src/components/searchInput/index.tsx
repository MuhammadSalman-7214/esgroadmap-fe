import {FunctionComponent} from 'react';
import {SearchInputProps} from './type';
import Button from '../ui/button';

const SearchInput: FunctionComponent<SearchInputProps> = ({
  search,
  setSearch,
  onSaveSearch,
}) => {
  return (
    <div className="flex gap-2">
      <div className="border border-gray-200 px-2 py-1 rounded-sm w-62 flex items-center gap-2">
        <img src="/icons/search.svg" alt="search" className="h-4 w-4" />
        <input
          type="text"
          placeholder="Keyword search"
          className="placeholder:font-semibold text-base outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Button
        label="Save Search"
        className="buttonbg1 textwhite text-md sm:text-xs  px-2 py-1 cursor-pointer"
        onClick={onSaveSearch}
      />
    </div>
  );
};

export default SearchInput;
