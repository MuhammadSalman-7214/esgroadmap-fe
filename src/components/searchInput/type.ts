export interface SearchInputProps {
  tableName: string,
  search: string;
  setSearch: (value: string) => void;
  onSaveSearch: () => void;
}
