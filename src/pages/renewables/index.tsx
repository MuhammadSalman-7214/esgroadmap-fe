import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {RenewablesDataType} from './type';

const Renewables = () => {
  const [renewablesData, setRenewablesData] =
    useState<RenewablesDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchRenewablesData = async (page: number) => {
    const res = await axios.get(
      `https://esgroadmap-backend.vercel.app/api/v1/tool/renewables?page=${page}&limit=10`
    );
    setRenewablesData(res.data);
  };

  useEffect(() => {
    fetchRenewablesData(currentPage);
  }, [currentPage]);

  return (
    <DashboardLayout>
      <ToolHeading title="Renewables" />
      {renewablesData && (
        <TableWithOptions
          data={renewablesData}
          dataKey="renewablesSentence"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </DashboardLayout>
  );
};

export default Renewables;
