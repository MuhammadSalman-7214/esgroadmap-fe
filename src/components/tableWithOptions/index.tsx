import TableHeader from '../tableHeader';
import Table from '../table';
import Pagination from '../pagination';
import {TableWithOptionsProps} from './type';
import {useState} from 'react';
import {extractors} from './constants';
import {SentenceType} from '../../types/data';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TableWithOptions = ({
  data,
  dataKey,
  currentPage,
  setCurrentPage,
}: TableWithOptionsProps) => {
  const [search, setSearch] = useState('');
  const extractor = extractors[dataKey] as (d: typeof data) => SentenceType[];
  const sentenceData = extractor(data);

  const handleDownload = () => {
    const doc = new jsPDF();

    const tableData = sentenceData.map((item) => [
      item.id?.toString() ?? '',
      item.Company ?? '',
      item.DocURL ?? '',
      item.Target_sentence ?? '',
      item.SentenceTargetYear ?? '',
      item.Country ?? '',
      item.SectorCode1 ?? '',
      item.SectorName1 ?? '',
      item.upload_date ?? '',
    ]);

    autoTable(doc, {
      head: [
        [
          'ID',
          'Company',
          'Document URL',
          'Target Sentence',
          'Target Year(s)',
          'Country',
          'Sector Code #1',
          'Sector Name #1',
          'Upload Date',
        ],
      ],
      body: tableData,
      styles: {fontSize: 7, cellPadding: 1},
      headStyles: {fillColor: '#219e98', halign: 'center'},
      columnStyles: {
        0: {cellWidth: 10},
        1: {cellWidth: 20},
        2: {cellWidth: 30},
        3: {cellWidth: 30},
        4: {cellWidth: 20},
        5: {cellWidth: 20},
        6: {cellWidth: 20},
        7: {cellWidth: 20},
        8: {cellWidth: 20},
      },
      margin: {top: 10, left: 10, right: 10},
      pageBreak: 'auto',
    });

    doc.save(`${dataKey}_page${currentPage}.pdf`);
  };

  return (
    <div className="border-3 bordergray tablebg rounded-lg mx-3">
      <TableHeader
        search={search}
        setSearch={setSearch}
        onDownload={handleDownload}
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
