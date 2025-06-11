import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {WasteAndRecyclingDataType} from './type';

const WasteAndRecycling = () => {
  const [wasteAndRecyclingData, setWasteAndRecyclingData] =
    useState<WasteAndRecyclingDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const fetchWasteAndRecyclingData = async (page: number) => {
    const res = await axios.get(
      `https://esgroadmap-backend.vercel.app/api/v1/tool/wasteAndRecycling?page=${page}&limit=10`
    );
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
