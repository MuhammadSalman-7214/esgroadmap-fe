import {useEffect, useRef, useState} from 'react';
import {CountryDropdownProps} from './type';
import api from '../../middleware';
import {Filter} from 'lucide-react';

const CountryDropdown = ({onSelect, tableName}: CountryDropdownProps) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get(
          `/tool/countries?tableName=${tableName}`
        );
        const data = await response.data;
        setCountries(data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };
    fetchCountries();
  }, [tableName]);

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
      <Filter
        className="w-4 h-4 text-gray-600 inline-block"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute z-20 py-1 bg-white border border-gray-300 mt-1 w-40 rounded shadow-md max-h-60 overflow-auto scrollbar-hidden">
          {countries.map((country, idx) => (
            <div
              key={idx}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(country);
                setIsOpen(false);
              }}
            >
              {country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;
