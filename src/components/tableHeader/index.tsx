import DropdownButton from '../dropdownButton';
import SearchInput from '../searchInput';
import {TableHeaderProps} from './type';

const TableHeader = ({setSearch, search, onDownload}: TableHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 px-4 py-4 rounded-t-lg">
      <div className="flex gap-4 sm:gap-6">
        <DropdownButton image={'/icons/download.svg'} onClick={onDownload} />
        <DropdownButton image={'/icons/filter.svg'} />
      </div>
      <SearchInput setSearch={setSearch} search={search} />
    </div>
  );
};

export default TableHeader;
