export type TableProps = {
  data: any[];
  dataKey: string;
  tableName: string;
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  selectedCompany: string;
  setSelectedCompany: React.Dispatch<React.SetStateAction<string>>;
  selectedSector: string;
  setSelectedSector: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
};
