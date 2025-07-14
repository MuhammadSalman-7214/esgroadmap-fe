import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {CarbonReductionDataType} from './type';
import api from '../../middleware';

const CarbonReduction = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [carbonData, setCarbonData] = useState<CarbonReductionDataType | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchCarbonData = async (page: number, search: string = '') => {
    const res = await api.get(
      `/tool/carbonReduction?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}`
    );
    setCarbonData(res.data);
  };

  useEffect(() => {
    fetchCarbonData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSaveSearch = async () => {
    // if (searchTerm) {
    //   await api.post('/tool/search', {
    //     search: searchTerm,
    //     tableName: 'sentence_carbon',
    //   });
    // }
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
        />
      )}
    </DashboardLayout>
  );
};

export default CarbonReduction;
