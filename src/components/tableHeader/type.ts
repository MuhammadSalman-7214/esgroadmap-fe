export interface TableHeaderProps {
  tableName: string;
  search: string;
  setSearch: (value: string) => void;
  onDownload: () => void;
  onSaveSearch: () => void;
  onDownloadComplete: () => void;
}
