import {useState, useRef, useEffect} from 'react';
import {DownloadDropdownProps} from './type';

const DownloadDropdown = ({
  onDownload,
  onDownloadComplete,
}: DownloadDropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button className="border border-gray-400 py-1 rounded-md flex items-center cursor-pointer">
        <div className="px-3 py-1 border-r border-gray-300">
          <p className="font-semibold">Export CSV</p>
        </div>
        <div className="px-3 py-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={'/icons/download.svg'} alt="download" className="h-5 w-5" />
        </div>
      </button>

      {isMenuOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
          <button
            onClick={() => {
              onDownload?.();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200"
          >
            This Page
          </button>
          <button
            onClick={() => {
              onDownloadComplete?.();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Complete Data
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadDropdown;
