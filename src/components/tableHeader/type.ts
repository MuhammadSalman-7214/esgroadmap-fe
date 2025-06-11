export interface TableHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  onDownload?: () => void;
}
