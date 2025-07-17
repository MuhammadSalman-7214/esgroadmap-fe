import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {WaterManagementDataType} from './type';
import api from '../../middleware';

const WaterManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [waterManagementData, setWaterManagementData] =
    useState<WaterManagementDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'sentence_water';
  
  const fetchWaterManagementData = async (
    page: number,
    search: string = '',
    country: string = ''
  ) => {
    const res = await api.get(
      `/tool/waterSentence?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}`
    );
    setWaterManagementData(res.data);
  };

  useEffect(() => {
    fetchWaterManagementData(currentPage, searchTerm, selectedCountry);
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
        />
      )}
    </DashboardLayout>
  );
};

export default WaterManagement;
