import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {SupplyChainDataType} from './type';
import api from '../../middleware';

const SupplyChain = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [supplyChainData, setSupplyChainData] =
    useState<SupplyChainDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchSupplyChainData = async (page: number, search: string = '') => {
    const res = await api.get(
      `/tool/supplyChain?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}`
    );
    setSupplyChainData(res.data);
  };

  useEffect(() => {
    fetchSupplyChainData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSaveSearch = async () => {
    if (searchTerm) {
      await api.post('/tool/search', {
        search: searchTerm,
        tableName: 'sentence_suppliers',
      });
    }
  };

  return (
    <DashboardLayout>
      <ToolHeading title="Supply Chain" />
      {supplyChainData && (
        <TableWithOptions
          data={supplyChainData}
          dataKey="supplyChain"
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

export default SupplyChain;
