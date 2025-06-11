import {useState} from 'react';
import {tableHeaders} from '../../pages/carbonReduction/constant';
import {TableProps} from './type';
import Modal from '../ui/modal';

const Table = ({data}: TableProps) => {
  const [isTargetSentenceOpen, setIsTargetSentenceOpen] = useState(false);
  const [selectedTargetSentence, setSelectedTargetSentence] = useState('');

  const handleTargetSentenceClick = (sentence: string) => {
    setSelectedTargetSentence(sentence);
    setIsTargetSentenceOpen(true);
  };

  if (!data || data.length === 0) {
    return (
      <div className=" place-items-center my-10">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <>
      <table className="w-full table-auto border-collapse">
        <thead className="bannerbg text-xs sm:text-sm sticky top-0 z-10">
          <tr>
            {tableHeaders.map((header: string, idx: number) => (
              <th
                key={idx}
                className="font-semibold tablebg textgray text-[10px] sm:text-sm min-w-[100px]"
              >
                <div className="flex items-center gap-1 border bordergray px-1 py-2 sm:px-2 sm:py-3 justify-between sm:justify-center w-full cursor-pointer">
                  <span className="break-words whitespace-normal text-center mx-auto w-full text-[10px] sm:text-sm">
                    {header}
                  </span>
                  {tableHeaders.includes(header) && (
                    <img
                      src="/icons/filters.svg"
                      alt="Filter icon"
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            if (
              !(
                'id' in row &&
                'Company' in row &&
                'DocURL' in row &&
                'Target_sentence' in row &&
                'SentenceTargetYear' in row &&
                'Country' in row &&
                'SectorCode1' in row &&
                'SectorName1' in row &&
                'upload_date' in row
              )
            ) {
              return null;
            }

            const rowValues = [
              row.id,
              row.Company,
              <a href={row.DocURL} target="_blank" rel="noopener noreferrer">
                <img
                  src="/icons/share.svg"
                  alt="Share"
                  className="h-6 w-6 mx-auto"
                />
              </a>,
              <div
                onClick={() => handleTargetSentenceClick(row.Target_sentence)}
                className="cursor-point"
              >
                {row.Target_sentence.length > 15
                  ? `${row.Target_sentence.slice(0, 15)}...`
                  : row.Target_sentence}
              </div>,
              row.SentenceTargetYear,
              row.Country,
              row.SectorCode1,
              row.SectorName1.length > 15
                ? `${row.SectorName1.slice(0, 15)}...`
                : row.SectorName1,
              row.upload_date,
            ];

            return (
              <tr
                key={row.id}
                className={`${
                  index % 2 === 0 ? 'whitebg' : 'bg-gray-50'
                } border bordergray text-xs sm:text-sm textgray`}
              >
                {rowValues.map((value, i) => (
                  <td
                    key={i}
                    className="px-2 sm:px-4 sm:py-4 md:py-4 py-2 text-center border bordergray break-words whitespace-normal"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        isOpen={isTargetSentenceOpen}
        onClose={() => setIsTargetSentenceOpen(false)}
        title="Full Target Sentence"
      >
        <p className="text-gray-700 text-center">{selectedTargetSentence}</p>
      </Modal>
    </>
  );
};

export default Table;
