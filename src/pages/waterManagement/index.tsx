import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {WaterManagementDataType} from './type';
import api from '../../middleware';
import {toast} from 'react-toastify';

const WaterManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSectorName, setSelectedSectorName] = useState<string>('');
  const [waterManagementData, setWaterManagementData] =
    useState<WaterManagementDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'sentence_water';

  const fetchWaterManagementData = async (
    page: number,
    search: string = '',
    country: string = '',
    company: string = '',
    sector: string = '',
    year: string = '',
    sectorName: string = '',
  ) => {
    const res = await api.get(
      `/tool/waterSentence?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}&company=${encodeURIComponent(
        company
      )}&sector=${encodeURIComponent(sector)}&year=${encodeURIComponent(
        year
      )}&sectorName=${encodeURIComponent(sectorName)}`
    );
    setWaterManagementData(res.data);
  };

  useEffect(() => {
    fetchWaterManagementData(
      currentPage,
      searchTerm,
      selectedCountry,
      selectedCompany,
      selectedSector,
      selectedYear,
      selectedSectorName,
    );
  }, [
    currentPage,
    searchTerm,
    selectedCountry,
    selectedCompany,
    selectedSector,
    selectedYear,
    selectedSectorName,
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
      <ToolHeading title="Water Management" />
      {waterManagementData && (
        <TableWithOptions
          data={waterManagementData}
          dataKey="waterSentence"
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
          selectedSectorName={selectedSectorName}
          setSelectedSectorName={setSelectedSectorName}
        />
      )}
    </DashboardLayout>
  );
};

export default WaterManagement;
