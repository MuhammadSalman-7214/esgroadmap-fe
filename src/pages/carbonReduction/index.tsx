import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {CarbonReductionDataType} from './type';
import api from '../../middleware';

const CarbonReduction = () => {
  const [carbonData, setCarbonData] = useState<CarbonReductionDataType | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchCarbonData = async (page: number) => {
    const res = await api.get(`/tool/carbonReduction?page=${page}&limit=10`);
    setCarbonData(res.data);
  };

  useEffect(() => {
    fetchCarbonData(currentPage);
  }, [currentPage]);

  return (
    <DashboardLayout>
      <ToolHeading title="Carbon Reduction" />
      {carbonData && (
        <TableWithOptions
          data={carbonData}
          dataKey="carbonSentence"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </DashboardLayout>
  );
};

export default CarbonReduction;
