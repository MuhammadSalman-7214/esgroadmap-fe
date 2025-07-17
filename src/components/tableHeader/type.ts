export interface TableHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  onDownload: () => void;
  onSaveSearch: () => void;
  onDownloadComplete: () => void;
}
