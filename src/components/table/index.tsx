import {useEffect, useState} from 'react';
import Modal from '../ui/modal';
import FilterDropdown from '../filterDropdown';
import {TableProps} from './type';
import api from '../../middleware';

const Table = ({
  data,
  dataKey,
  tableName,
  setSelectedCountry,
  setSelectedCompany,
  setSelectedSector,
  setSelectedYear,
  setSelectedSectorName,
  setSelectedDate,
}: TableProps) => {
  const [filters, setFilters] = useState({
    uniqueCountries: [],
    uniqueCompanies: [],
    targetYears: [],
    uniqueSector: [],
    uniqueSectorNames: [],
    uniqueDates: [],
  });
  const [isTargetSentenceOpen, setIsTargetSentenceOpen] = useState(false);
  const [selectedTargetSentence, setSelectedTargetSentence] = useState('');

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await api.get(`/tool/filters?tableName=${tableName}`);
        const data = await response.data;
        setFilters(data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };
    fetchFilters();
  }, [tableName]);

  const handleTargetSentenceClick = (sentence: string) => {
    setSelectedTargetSentence(sentence);
    setIsTargetSentenceOpen(true);
  };

  const truncate = (text: string | undefined, max = 15) =>
    text ? (text.length > max ? `${text.slice(0, max)}...` : text) : '';

  const headers =
    dataKey === 'companyUniverse'
      ? ['Company', 'Country', 'Sector Code', 'Sector Name']
      : [
          'ID',
          'Company',
          'Document URL',
          'Target Sentence',
          'Target Year(s)',
          'Country',
          'Sector Code',
          'Sector Name',
          'Upload Date',
        ];

  return (
    <div className="max-h-[60vh] h-[60vh]">
      <table className="w-full table-auto border-collapse">
        <thead className="bannerbg text-xs sm:text-sm sticky top-0 z-10">
          <tr>
            {headers.map((header: string, idx: number) => (
              <th
                key={idx}
                className="font-semibold tablebg textgray text-[10px] sm:text-sm min-w-[100px] h-[56px] sm:h-[64px] align-middle"
              >
                <div className="flex items-center h-full gap-1 border bordergray px-1 sm:px-2 justify-between sm:justify-center w-full">
                  <span className="break-words whitespace-normal text-center mx-auto w-full text-[10px] sm:text-sm flex items-center justify-center gap-1">
                    {header}
                    {header === 'Country' && (
                      <FilterDropdown
                        items={filters.uniqueCountries}
                        onSelect={setSelectedCountry}
                      />
                    )}
                    {header === 'Company' && (
                      <FilterDropdown
                        items={filters.uniqueCompanies}
                        onSelect={setSelectedCompany}
                      />
                    )}
                    {header === 'Sector Code' && (
                      <FilterDropdown
                        items={filters.uniqueSector}
                        onSelect={setSelectedSector}
                      />
                    )}
                    {header === 'Target Year(s)' && (
                      <FilterDropdown
                        items={filters.targetYears}
                        onSelect={setSelectedYear}
                      />
                    )}
                    {header === 'Sector Name' && (
                      <FilterDropdown
                        items={filters.uniqueSectorNames}
                        onSelect={setSelectedSectorName}
                      />
                    )}
                    {header === 'Upload Date' && (
                      <FilterDropdown
                        items={filters.uniqueDates}
                        onSelect={setSelectedDate}
                      />
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!data || data.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center max-h-[60vh] h-[60vh] align-middle bg-white"
              >
                <div className="flex items-center justify-center w-full h-full">
                  No data available
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              if (dataKey === 'companyUniverse') {
                return (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'whitebg' : 'bg-gray-50'
                    } border bordergray text-xs sm:text-sm textgray`}
                  >
                    <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                      {row.Company}
                    </td>
                    <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                      {row.Country || 'N/A'}
                    </td>
                    <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                      {row.sector_code__1__NAICS_ || 'N/A'}
                    </td>
                    <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                      {truncate(row.sector_name__1__NAICS_)}
                    </td>
                  </tr>
                );
              }

              return (
                <tr
                  key={row.id}
                  className={`${
                    index % 2 === 0 ? 'whitebg' : 'bg-gray-50'
                  } border bordergray text-xs sm:text-sm textgray`}
                >
                  <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                    {row.id}
                  </td>
                  <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                    {row.Company}
                  </td>
                  <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                    <a
                      href={row.DocURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/icons/share.svg"
                        alt="Share"
                        className="h-6 w-6 mx-auto"
                      />
                    </a>
                  </td>
                  <td
                    className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal cursor-pointer"
                    onClick={() =>
                      handleTargetSentenceClick(row.Target_sentence ?? '')
                    }
                  >
                    {truncate(row.Target_sentence)}
                  </td>
                  <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                    {row.SentenceTargetYear}
                  </td>
                  <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                    {row.Country}
                  </td>
                  <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                    {row.SectorCode1}
                  </td>
                  <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                    {truncate(row.SectorName1)}
                  </td>
                  <td className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal">
                    {row.upload_date}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <Modal
        isOpen={isTargetSentenceOpen}
        onClose={() => setIsTargetSentenceOpen(false)}
        title="Full Target Sentence"
      >
        <p className="text-gray-700 text-center">{selectedTargetSentence}</p>
      </Modal>
    </div>
  );
};

export default Table;
