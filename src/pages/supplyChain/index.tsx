import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {SupplyChainDataType} from './type';
import api from '../../middleware';

const SupplyChain = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [supplyChainData, setSupplyChainData] =
    useState<SupplyChainDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'sentence_suppliers';

  const fetchSupplyChainData = async (
    page: number,
    search: string = '',
    country: string = ''
  ) => {
    const res = await api.get(
      `/tool/supplyChain?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}`
    );
    setSupplyChainData(res.data);
  };

  useEffect(() => {
    fetchSupplyChainData(currentPage, searchTerm, selectedCountry);
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
          tableName={tableName}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </DashboardLayout>
  );
};

export default SupplyChain;
