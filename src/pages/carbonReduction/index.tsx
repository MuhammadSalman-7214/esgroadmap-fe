import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {CarbonReductionDataType} from './type';
import api from '../../middleware';

const CarbonReduction = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [carbonData, setCarbonData] = useState<CarbonReductionDataType | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'sentence_carbon';

  const fetchCarbonData = async (page: number, search: string = '', country: string = '') => {
    const res = await api.get(
      `/tool/carbonSentence?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}`
    );
    setCarbonData(res.data);
  };

  useEffect(() => {
    fetchCarbonData(currentPage, searchTerm, selectedCountry);
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
          tableName={tableName}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </DashboardLayout>
  );
};

export default CarbonReduction;
