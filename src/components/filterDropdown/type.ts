export interface FilterDropdownProps {
  items: string[];
  onSelect: (value: string) => void;
  isDate?: boolean;
}
