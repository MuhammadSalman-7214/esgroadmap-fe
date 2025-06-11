export interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export interface SiderItem {
  id: number;
  path: string;
  label: string;
  icon: string;
}
