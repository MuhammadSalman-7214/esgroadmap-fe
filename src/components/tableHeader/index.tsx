import SearchInput from '../searchInput';
import {TableHeaderProps} from './type';
import DownloadDropdown from '../downloadDropdown';

const TableHeader = ({
  setSearch,
  search,
  onDownload,
  onSaveSearch,
  onDownloadComplete,
}: TableHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 px-4 py-4 rounded-t-lg">
      <DownloadDropdown
        onDownload={onDownload}
        onDownloadComplete={onDownloadComplete}
      />
      <SearchInput
        setSearch={setSearch}
        search={search}
        onSaveSearch={onSaveSearch}
      />
    </div>
  );
};

export default TableHeader;
