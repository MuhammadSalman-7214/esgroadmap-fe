import DashboardLayout from '../dashboardlayout';
import TableWithOptions from '../../components/tableWithOptions';
import ToolHeading from '../../components/toolHeading';
import {useEffect, useState} from 'react';
import {AllCompanyTargetsDataType} from './type';
import api from '../../middleware';

const AllCompanyTargets = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [allCompanyTargetsData, setAllCompanyTargetsData] =
    useState<AllCompanyTargetsDataType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchAllCompanyTargetsData = async (
    page: number,
    search: string = ''
  ) => {
    const res = await api.get(
      `/tool/allSentence?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}`
    );
    setAllCompanyTargetsData(res.data);
  };

  useEffect(() => {
    fetchAllCompanyTargetsData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSaveSearch = async () => {
    // if (searchTerm) {
    //   await api.post('/tool/search', {
    //     search: searchTerm,
    //     tableName: 'sentence_all',
    //   });
    // }
  };

  return (
    <DashboardLayout>
      <ToolHeading title="All Company Targets" />
      {allCompanyTargetsData && (
        <TableWithOptions
          data={allCompanyTargetsData}
          dataKey="allSentence"
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

export default AllCompanyTargets;
