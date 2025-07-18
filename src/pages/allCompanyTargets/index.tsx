import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {AllCompanyTargetsDataType} from './type';
import api from '../../middleware';

const AllCompanyTargets = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [allCompanyTargetsData, setAllCompanyTargetsData] =
    useState<AllCompanyTargetsDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'sentenceAllView';

  const fetchAllCompanyTargetsData = async (
    page: number,
    search: string = '',
    country: string = '',
    company: string = '',
    sector: string = '',
    year: string = ''
  ) => {
    const res = await api.get(
      `/tool/allSentence?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}&company=${encodeURIComponent(
        company
      )}&sector=${encodeURIComponent(sector)}&year=${encodeURIComponent(year)}`
    );
    setAllCompanyTargetsData(res.data);
  };

  useEffect(() => {
    fetchAllCompanyTargetsData(
      currentPage,
      searchTerm,
      selectedCountry,
      selectedCompany,
      selectedSector,
      selectedYear
    );
  }, [
    currentPage,
    searchTerm,
    selectedCountry,
    selectedCompany,
    selectedSector,
    selectedYear,
  ]);

  const handleSaveSearch = async () => {
    if (searchTerm) {
      await api.post('/tool/search', {
        search: searchTerm,
        tableName: `${tableName}`,
      });
    }
  };

  return (
    <DashboardLayout>
      <ToolHeading title="All Company Targets" />
      {allCompanyTargetsData && (
        <TableWithOptions
          data={allCompanyTargetsData}
          dataKey="allSentence"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSaveSearch={handleSaveSearch}
          tableName={tableName}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      )}
    </DashboardLayout>
  );
};

export default AllCompanyTargets;
