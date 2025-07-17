import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {WasteAndRecyclingDataType} from './type';
import api from '../../middleware';

const WasteAndRecycling = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [wasteAndRecyclingData, setWasteAndRecyclingData] =
    useState<WasteAndRecyclingDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'sentence_waste';

  const fetchWasteAndRecyclingData = async (
    page: number,
    search: string = '',
    country: string = ''
  ) => {
    const res = await api.get(
      `/tool/wasteSentence?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}`
    );
    setWasteAndRecyclingData(res.data);
  };

  useEffect(() => {
    fetchWasteAndRecyclingData(currentPage, searchTerm, selectedCountry);
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
      <ToolHeading title="Waste And Recycling" />
      {wasteAndRecyclingData && (
        <TableWithOptions
          data={wasteAndRecyclingData}
          dataKey="wasteSentence"
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

export default WasteAndRecycling;
