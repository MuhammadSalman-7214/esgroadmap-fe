import TableHeader from '../tableHeader';
import Table from '../table';
import Pagination from '../pagination';
import {TableWithOptionsProps} from './type';
import {extractors} from './constants';
import {SentenceType} from '../../types/data';

const TableWithOptions = ({
  data,
  dataKey,
  currentPage,
  setCurrentPage,
  searchTerm,
  setSearchTerm,
  onSaveSearch,
}: TableWithOptionsProps) => {
  const extractor = extractors[dataKey] as (d: typeof data) => SentenceType[];
  const sentenceData = extractor(data);

  const handleDownload = () => {
    const csvRows = [];

    const headers = [
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
    csvRows.push(headers.join(','));

    const tableData = sentenceData.map((item) => [
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
        <Table data={sentenceData} />
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
