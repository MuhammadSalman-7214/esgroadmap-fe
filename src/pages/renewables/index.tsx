import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {RenewablesDataType} from './type';
import api from '../../middleware';
import {toast} from 'react-toastify';

const Renewables = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSectorName, setSelectedSectorName] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [renewablesData, setRenewablesData] =
    useState<RenewablesDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'sentence_renewables';

  const fetchRenewablesData = async (
    page: number,
    search: string = '',
    country: string = '',
    company: string = '',
    sector: string = '',
    year: string = '',
    sectorName: string = '',
    date: string = ''
  ) => {
    const res = await api.get(
      `/tool/renewablesSentence?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}&company=${encodeURIComponent(
        company
      )}&sector=${encodeURIComponent(sector)}&year=${encodeURIComponent(
        year
      )}&sectorName=${encodeURIComponent(sectorName)}&date=${encodeURIComponent(
        date
      )}`
    );
    setRenewablesData(res.data);
  };

  useEffect(() => {
    fetchRenewablesData(
      currentPage,
      searchTerm,
      selectedCountry,
      selectedCompany,
      selectedSector,
      selectedYear,
      selectedSectorName,
      selectedDate
    );
  }, [
    currentPage,
    searchTerm,
    selectedCountry,
    selectedCompany,
    selectedSector,
    selectedYear,
    selectedSectorName,
    selectedDate,
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
      <ToolHeading title="Renewables" />
      {renewablesData && (
        <TableWithOptions
          data={renewablesData}
          dataKey="renewablesSentence"
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
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </DashboardLayout>
  );
};

export default Renewables;
