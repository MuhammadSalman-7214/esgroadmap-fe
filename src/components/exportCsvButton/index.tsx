import {FunctionComponent} from 'react';
import {ExportCsvButtonProps} from './type';

const ExportCsvButton: FunctionComponent<ExportCsvButtonProps> = ({
  image,
  onClick,
}) => {
  return (
    <div className="border border-gray-500 rounded-md flex items-center cursor-pointer">
      <div className="px-3 py-2 border-r border-gray-300">
        <p className="font-semibold">Export CSV</p>
      </div>
      <div className="px-3 py-2" onClick={onClick}>
        <img src={image} alt="download" className="h-5 w-5" />
      </div>
    </div>
  );
};

export default ExportCsvButton;
