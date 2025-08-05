import {useEffect, useRef, useState} from 'react';
import {Filter} from 'lucide-react';
import {FilterDropdownProps} from './type';

const FilterDropdown = ({items, onSelect}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative cursor-pointer" ref={dropdownRef}>
      <div
        className="flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter className="w-4 h-4 text-gray-600" />
      </div>

      {isOpen && (
        <div className="absolute right-0 z-20 py-1 bg-white border border-gray-300 mt-1 w-40 rounded shadow-md max-h-60 overflow-auto">
          {items.length > 0 ? (
            <>
              <div
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-gray-500"
                onClick={() => {
                  onSelect('');
                  setIsOpen(false);
                }}
              >
                Clear filter
              </div>
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                >
                  {item || 'N/A'}
                </div>
              ))}
            </>
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">No options</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
