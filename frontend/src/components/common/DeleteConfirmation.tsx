import { AlertTriangle } from 'lucide-react';
import Popup from './Popup';

interface DeleteConfirmationPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
}

export default function DeleteConfirmationPopup({
  open,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item?",
  itemName
}: DeleteConfirmationPopupProps) {
  return (
    <Popup open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
        </div>

        <p className="text-gray-600">
          {itemName ?
            `Are you sure you want to delete "${itemName}"? ` :
            message
          }
          This action cannot be undone.
        </p>

        <div className="flex gap-3 justify-end mt-2">
          <button
            className='w-[100px] bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='w-[100px] bg-red-400 text-white rounded-md py-2 px-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white mx-2'
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Popup>
  );
}
