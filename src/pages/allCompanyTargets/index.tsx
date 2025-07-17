import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {AllCompanyTargetsDataType} from './type';
import api from '../../middleware';

const AllCompanyTargets = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [allCompanyTargetsData, setAllCompanyTargetsData] =
    useState<AllCompanyTargetsDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'sentenceAllView';
  
  const fetchAllCompanyTargetsData = async (
    page: number,
    search: string = '',
    country: string = ''
  ) => {
    const res = await api.get(
      `/tool/allSentence?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}`
    );
    setAllCompanyTargetsData(res.data);
  };

  useEffect(() => {
    fetchAllCompanyTargetsData(currentPage, searchTerm, selectedCountry);
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
      <ToolHeading title="All Company Targets" />
      {allCompanyTargetsData && (
        <TableWithOptions
          data={allCompanyTargetsData}
          dataKey="allSentence"
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

export default AllCompanyTargets;
