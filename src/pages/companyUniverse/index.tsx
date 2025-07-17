import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {CompanyUniverseDataType} from './type';
import api from '../../middleware';

const CompanyUniverse = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const [companyUniverseData, setCompanyUniverseData] =
    useState<CompanyUniverseDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'companyUniverse';

  const fetchCompanyUniverseData = async (
    page: number,
    search: string = '',
    country: string = ''
  ) => {
    const res = await api.get(
      `/tool/companyUniverse?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}`
    );
    setCompanyUniverseData(res.data);
  };

  useEffect(() => {
    fetchCompanyUniverseData(currentPage, searchTerm, selectedCountry);
  }, [currentPage, searchTerm, selectedCountry]);

  const handleSaveSearch = async () => {
    if (searchTerm) {
      await api.post('/tool/search', {
        search: searchTerm,
        tableName: `${tableName}`,
      });
    }
  };

  useEffect(() => {
    fetchCompanyUniverseData(currentPage, searchTerm, selectedCountry);
  }, [currentPage, searchTerm, selectedCountry]);
  
  return (
    <DashboardLayout>
      <ToolHeading title="Company Universe" />
      {companyUniverseData && (
        <TableWithOptions
          data={companyUniverseData}
          dataKey="companyUniverse"
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

export default CompanyUniverse;
