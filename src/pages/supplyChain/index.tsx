import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {SupplyChainDataType} from './type';

const SupplyChain = () => {
  const [supplyChainData, setSupplyChainData] =
    useState<SupplyChainDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchSupplyChainData = async (page: number) => {
    const res = await axios.get(
      `https://esgroadmap-backend.vercel.app/api/v1/tool/supplyChain?page=${page}&limit=10`
    );
    setSupplyChainData(res.data);
  };

  useEffect(() => {
    fetchSupplyChainData(currentPage);
  }, [currentPage]);

  return (
    <DashboardLayout>
      <ToolHeading title="Supply Chain" />
      {supplyChainData && (
        <TableWithOptions
          data={supplyChainData}
          dataKey="supplyChain"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </DashboardLayout>
  );
};

export default SupplyChain;
