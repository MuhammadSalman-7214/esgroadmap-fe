import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {WaterManagementDataType} from './type';
import api from '../../middleware';

const WaterManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [waterManagementData, setWaterManagementData] =
    useState<WaterManagementDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchWaterManagementData = async (
    page: number,
    search: string = ''
  ) => {
    const res = await api.get(
      `/tool/waterManagement?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}`
    );
    setWaterManagementData(res.data);
  };

  useEffect(() => {
    fetchWaterManagementData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSaveSearch = async () => {
    // if (searchTerm) {
    //   await api.post('/tool/search', {
    //     search: searchTerm,
    //     tableName: 'sentence_water',
    //   });
    // }
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
        />
      )}
    </DashboardLayout>
  );
};

export default WaterManagement;
