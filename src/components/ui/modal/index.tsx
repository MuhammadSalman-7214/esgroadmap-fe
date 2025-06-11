import {FunctionComponent} from 'react';
import {ModalProps} from './type';

const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-5000 flex items-center justify-center bg-black/50 p-4">
      <div
        className={`bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            &times;
          </button>
        )}
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-start">{title}</h2>
        )}
        <div className="mt-5">{children}</div>
      </div>

      <div className="absolute inset-0" onClick={onClose}></div>
    </div>
  );
};

export default Modal;
