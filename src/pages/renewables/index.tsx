import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {RenewablesDataType} from './type';
import api from '../../middleware';

const Renewables = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [renewablesData, setRenewablesData] =
    useState<RenewablesDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchRenewablesData = async (page: number, search: string = '') => {
    const res = await api.get(
      `/tool/renewables?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}`
    );
    setRenewablesData(res.data);
  };

  useEffect(() => {
    fetchRenewablesData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSaveSearch = async () => {
    // if (searchTerm) {
    //   await api.post('/tool/search', {
    //     search: searchTerm,
    //     tableName: 'sentence_renewables',
    //   });
    // }
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
        />
      )}
    </DashboardLayout>
  );
};

export default Renewables;
