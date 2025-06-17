import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {GenderDiversityDataType} from './type';
import api from '../../middleware';

const GenderDiversity = () => {
  const [genderDiversityData, setGenderDiversityData] =
    useState<GenderDiversityDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchGenderDiversityData = async (page: number) => {
    const res = await api.get(`/tool/sentenceGender?page=${page}&limit=10`);
    setGenderDiversityData(res.data);
  };

  useEffect(() => {
    fetchGenderDiversityData(currentPage);
  }, [currentPage]);

  return (
    <DashboardLayout>
      <ToolHeading title="Gender Diversity" />
      {genderDiversityData && (
        <TableWithOptions
          data={genderDiversityData}
          dataKey="genderSentence"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </DashboardLayout>
  );
};

export default GenderDiversity;
