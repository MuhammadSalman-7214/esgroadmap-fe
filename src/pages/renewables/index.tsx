import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {RenewablesDataType} from './type';
import api from '../../middleware';

const Renewables = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [renewablesData, setRenewablesData] =
    useState<RenewablesDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'sentence_renewables';

  const fetchRenewablesData = async (
    page: number,
    search: string = '',
    country: string = ''
  ) => {
    const res = await api.get(
      `/tool/renewablesSentence?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}`
    );
    setRenewablesData(res.data);
  };

  useEffect(() => {
    fetchRenewablesData(currentPage, searchTerm, selectedCountry);
  }, [currentPage, searchTerm, selectedCountry]);

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
        />
      )}
    </DashboardLayout>
  );
};

export default Renewables;
