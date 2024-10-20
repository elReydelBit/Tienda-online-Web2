//src\app\components\Modal.tsx
import { FC } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  isSuccess?: boolean; // Éxito o error
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, message, isSuccess = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className={`text-2xl font-semibold mb-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {title}
        </h2>
        <p className="mb-4">{message}</p>
        <button onClick={onClose} className="bg-purple-500 text-white px-4 py-2 rounded">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
