import TableHeader from '../tableHeader';
import Table from '../table';
import Pagination from '../pagination';
import {TableWithOptionsProps} from './type';
import {SentenceType} from '../../types/data';
import {CompanyUniverseDataType} from '../../pages/companyUniverse/type';
import api from '../../middleware';
import {toast} from 'react-toastify';

const TableWithOptions = ({
  data,
  dataKey,
  currentPage,
  setCurrentPage,
  searchTerm,
  setSearchTerm,
  onSaveSearch,
  tableName,
  selectedCountry,
  setSelectedCountry,
  selectedCompany,
  setSelectedCompany,
  selectedSector,
  setSelectedSector,
  selectedYear,
  setSelectedYear,
  selectedSectorName,
  setSelectedSectorName,
  selectedDate,
  setSelectedDate,
}: TableWithOptionsProps) => {
  
  const getSentenceData = (): SentenceType[] => {
    if (dataKey === 'companyUniverse') {
      return (data as CompanyUniverseDataType).companyUniverse;
    }

    const possibleData = data[dataKey as keyof typeof data];

    if (Array.isArray(possibleData)) {
      return possibleData as SentenceType[];
    }

    return [];
  };

  const sentenceData = getSentenceData();

  const generateCsv = (dataArray: any[], key: string): string => {
    const csvRows = [];
    let headers: string[] = [];
    let tableData: any[][] = [];

    if (key === 'companyUniverse') {
      headers = ['Company', 'Country', 'Sector Code', 'Sector Name'];
      tableData = dataArray.map((item: any) => [
        item.Company ?? '',
        item.Country ?? '',
        item.sector_code__1__NAICS_ ?? '',
        item.sector_name__1__NAICS_ ?? '',
      ]);
    } else {
      headers = [
        'ID',
        'Company',
        'Document URL',
        'Target Sentence',
        'Target Year(s)',
        'Country',
        'Sector Code #1',
        'Sector Name #1',
        'Upload Date',
      ];
      tableData = dataArray.map((item: any) => [
        item.id?.toString() ?? '',
        item.Company ?? '',
        item.DocURL ?? '',
        item.Target_sentence?.replace(/"/g, '""') ?? '',
        item.SentenceTargetYear ?? '',
        item.Country ?? '',
        item.SectorCode1 ?? '',
        item.SectorName1 ?? '',
        item.upload_date ?? '',
      ]);
    }

    csvRows.push(headers.join(','));
    for (const row of tableData) {
      const formattedRow = row.map((field) => `"${field}"`).join(',');
      csvRows.push(formattedRow);
    }

    return csvRows.join('\n');
  };

  const handleDownload = () => {
    const csvContent = generateCsv(sentenceData, dataKey);
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `${dataKey}_page${currentPage}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadComplete = async () => {
    try {
      const res = await api.get(`/tool/${dataKey}?pagination=false`);

      const completeData = res.data?.[dataKey] ?? [];
      if (!Array.isArray(completeData) || completeData.length === 0) {
        toast.warn('No data received for CSV export');
        return;
      }
      const csvContent = generateCsv(completeData, dataKey);
      const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});

      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', `${dataKey}_complete.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download complete data:', error);
    }
  };

  return (
    <div className="border-3 bordergray tablebg rounded-lg mx-3">
      <TableHeader
        tableName={tableName}
        search={searchTerm}
        setSearch={setSearchTerm}
        onDownload={handleDownload}
        onDownloadComplete={handleDownloadComplete}
        onSaveSearch={onSaveSearch}
      />
      <div className="overflow-y-auto max-h-[calc(97vh-200px)]">
        <Table
          data={sentenceData}
          dataKey={dataKey}
          tableName={tableName}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedSectorName={selectedSectorName}
          setSelectedSectorName={setSelectedSectorName}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <Pagination
        totalPages={data.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TableWithOptions;
