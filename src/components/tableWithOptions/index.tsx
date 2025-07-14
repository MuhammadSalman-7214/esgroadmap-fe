import TableHeader from '../tableHeader';
import Table from '../table';
import Pagination from '../pagination';
import {TableWithOptionsProps} from './type';
import {SentenceType} from '../../types/data';
import {CompanyUniverseDataType} from '../../pages/companyUniverse/type';

const TableWithOptions = ({
  data,
  dataKey,
  currentPage,
  setCurrentPage,
  searchTerm,
  setSearchTerm,
  onSaveSearch,
}: TableWithOptionsProps) => {
  // Special handling for companyUniverse data structure
  const getSentenceData = (): SentenceType[] => {
    if (dataKey === 'companyUniverse') {
      return (data as CompanyUniverseDataType).company_universe;
    }

    const possibleData = data[dataKey as keyof typeof data];

    if (Array.isArray(possibleData)) {
      return possibleData as SentenceType[];
    }

    console.warn(`Unexpected data type for key: ${dataKey}`);
    return [];
  };

  const sentenceData = getSentenceData();

  const handleDownload = () => {
    const csvRows = [];
    let headers: string[] = [];
    let tableData: any[][] = [];

    if (dataKey === 'companyUniverse') {
      // Company Universe CSV format
      headers = ['Company', 'Country', 'Sector Code', 'Sector Name'];
      tableData = sentenceData.map((item: any) => [
        item.Company ?? '',
        item.Country ?? '',
        item.sector_code__1__NAICS_ ?? '',
        item.sector_name__1__NAICS_ ?? '',
      ]);
    } else {
      // Default CSV format for other data types
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
      tableData = sentenceData.map((item: any) => [
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

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `${dataKey}_page${currentPage}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="border-3 bordergray tablebg rounded-lg mx-3">
      <TableHeader
        search={searchTerm}
        setSearch={setSearchTerm}
        onDownload={handleDownload}
        onSaveSearch={onSaveSearch}
      />
      <div className="overflow-y-auto max-h-[calc(97vh-200px)]">
        <Table data={sentenceData} dataKey={dataKey} />
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
