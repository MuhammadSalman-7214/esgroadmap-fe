import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {CarbonReductionDataType} from './type';
import api from '../../middleware';
import {toast} from 'react-toastify';

const CarbonReduction = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [carbonData, setCarbonData] = useState<CarbonReductionDataType | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'sentence_carbon';

  const fetchCarbonData = async (
    page: number,
    search: string = '',
    country: string = '',
    company: string = '',
    sector: string = '',
    year: string = ''
  ) => {
    const res = await api.get(
      `/tool/carbonSentence?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}&company=${encodeURIComponent(
        company
      )}&sector=${encodeURIComponent(sector)}&year=${encodeURIComponent(year)}`
    );
    setCarbonData(res.data);
  };

  useEffect(() => {
    fetchCarbonData(
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
      try {
        const response = await api.post('/tool/search', {
          search: searchTerm,
          tableName: tableName,
        });

        toast.success(response.data.message);
      } catch (error: any) {
        const errorMessage =
          error.response?.data || 'Something went wrong. Please try again.';

        toast.error(errorMessage);
      }
    }
  };

  return (
    <DashboardLayout>
      <ToolHeading title="Carbon Reduction" />
      {carbonData && (
        <TableWithOptions
          data={carbonData}
          dataKey="carbonSentence"
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

export default CarbonReduction;
