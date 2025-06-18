import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {WasteAndRecyclingDataType} from './type';
import api from '../../middleware';

const WasteAndRecycling = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [wasteAndRecyclingData, setWasteAndRecyclingData] =
    useState<WasteAndRecyclingDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchWasteAndRecyclingData = async (
    page: number,
    search: string = ''
  ) => {
    const res = await api.get(
      `/tool/wasteAndRecycling?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}`
    );
    setWasteAndRecyclingData(res.data);
  };

  useEffect(() => {
    fetchWasteAndRecyclingData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSaveSearch = async () => {
    if (searchTerm) {
      await api.post('/tool/search', {
        search: searchTerm,
        tableName: 'sentence_waste',
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
        />
      )}
    </DashboardLayout>
  );
};

export default WasteAndRecycling;
