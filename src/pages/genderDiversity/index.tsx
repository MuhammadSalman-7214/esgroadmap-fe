import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {GenderDiversityDataType} from './type';
import api from '../../middleware';

const GenderDiversity = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [genderDiversityData, setGenderDiversityData] =
    useState<GenderDiversityDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchGenderDiversityData = async (
    page: number,
    search: string = ''
  ) => {
    const res = await api.get(
      `/tool/sentenceGender?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}`
    );
    setGenderDiversityData(res.data);
  };

  useEffect(() => {
    fetchGenderDiversityData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSaveSearch = async () => {
    if (searchTerm) {
      await api.post('/tool/search', {
        search: searchTerm,
        tableName: 'sentence_gender',
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
        />
      )}
    </DashboardLayout>
  );
};

export default GenderDiversity;
