import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {GenderDiversityDataType} from './type';
import api from '../../middleware';

const GenderDiversity = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [genderDiversityData, setGenderDiversityData] =
    useState<GenderDiversityDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableName = 'sentence_gender';

  const fetchGenderDiversityData = async (
    page: number,
    search: string = '',
    country: string = ''
  ) => {
    const res = await api.get(
      `/tool/genderSentence?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}&country=${encodeURIComponent(country)}`
    );
    setGenderDiversityData(res.data);
  };

  useEffect(() => {
    fetchGenderDiversityData(currentPage, searchTerm, selectedCountry);
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
      <ToolHeading title="Gender Diversity" />
      {genderDiversityData && (
        <TableWithOptions
          data={genderDiversityData}
          dataKey="genderSentence"
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

export default GenderDiversity;
