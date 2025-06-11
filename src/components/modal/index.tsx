import {FunctionComponent} from 'react';
import {ModalProps} from './type';

const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeable = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-2000 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full relative p-6">
        {closeable && onClose && (
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
