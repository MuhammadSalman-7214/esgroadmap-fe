import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {WaterManagementDataType} from './type';

const WaterManagement = () => {
  const [waterManagementData, setWaterManagementData] =
    useState<WaterManagementDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchWaterManagementData = async (page: number) => {
    const res = await axios.get(
      `https://esgroadmap-backend.vercel.app/api/v1/tool/waterManagement?page=${page}&limit=10`
    );
    setWaterManagementData(res.data);
  };

  useEffect(() => {
    fetchWaterManagementData(currentPage);
  }, [currentPage]);

  return (
    <DashboardLayout>
      <ToolHeading title="Water Management" />
      {waterManagementData && (
        <TableWithOptions
          data={waterManagementData}
          dataKey="waterSentence"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </DashboardLayout>
  );
};

export default WaterManagement;
