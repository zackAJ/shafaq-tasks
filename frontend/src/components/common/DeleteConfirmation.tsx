import { AlertTriangle } from 'lucide-react';
import Popup from './Popup';
import PrimaryBtn from './PrimaryBtn';

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
          <PrimaryBtn
            className='w-[100px]'
            onClick={onClose}
          >
            Cancel
          </PrimaryBtn>
          <PrimaryBtn
            className='w-[100px] bg-red-400 hover:bg-red-700 focus:ring-2 focus:ring-opacity-50 mx-2'
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </PrimaryBtn>
        </div>
      </div>
    </Popup>
  );
}
