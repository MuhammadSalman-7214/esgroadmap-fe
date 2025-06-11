import {FunctionComponent} from 'react';
import {DropdownButtonProps} from './type';

const DropdownButton: FunctionComponent<DropdownButtonProps> = ({
  image,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="border border-gray-500 rounded-md flex items-center cursor-pointer"
    >
      <div className="px-3 py-2">
        <img src={image} alt="download" className="h-5 w-5" />
      </div>
      <div className="px-3 py-2 border-l border-gray-300">
        <img src="/icons/angle-down.svg" alt="angle-down" className="h-5 w-5" />
      </div>
    </div>
  );
};

export default DropdownButton;
