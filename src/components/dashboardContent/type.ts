export interface DashboardItem {
  id: number;
  src: string;
  alt: string;
  name: string;
  todo: string;
}

export interface DashboardSection {
  title: string;
  data: DashboardItem[];
}

export interface DashboardProp {
  basicAccountTools: DashboardSection;
  comprehensiveAccountTools: DashboardSection;
  memberInformation: DashboardSection;
  myAccountDetail: DashboardSection;
}
