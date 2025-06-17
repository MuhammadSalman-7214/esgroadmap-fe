import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {WasteAndRecyclingDataType} from './type';
import api from '../../middleware';

const WasteAndRecycling = () => {
  const [wasteAndRecyclingData, setWasteAndRecyclingData] =
    useState<WasteAndRecyclingDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const fetchWasteAndRecyclingData = async (page: number) => {
    const res = await api.get(`/tool/wasteAndRecycling?page=${page}&limit=10`);
    setWasteAndRecyclingData(res.data);
  };

  useEffect(() => {
    fetchWasteAndRecyclingData(currentPage);
  }, [currentPage]);

  return (
    <DashboardLayout>
      <ToolHeading title="Waste And Recycling" />
      {wasteAndRecyclingData && (
        <TableWithOptions
          data={wasteAndRecyclingData}
          dataKey="wasteSentence"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </DashboardLayout>
  );
};

export default WasteAndRecycling;
