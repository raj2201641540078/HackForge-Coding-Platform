import { AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] dark:bg-[#1E293B] rounded-xl shadow-2xl border border-[#E2E8F0] dark:border-[#334155] w-full max-w-md m-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/40 sm:mx-0 sm:h-10 sm:w-10">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-bold text-[#0F172A] dark:text-[#F8FAFC]" id="modal-title">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F1F5F9]/50 dark:bg-[#0F172A]/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-xl">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#DC2626] text-base font-medium text-white hover:bg-[#B91C1C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DC2626] sm:ml-3 sm:w-auto sm:text-sm transition-colors"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-[#E2E8F0] dark:border-[#334155] shadow-sm px-4 py-2 bg-[#FFFFFF] dark:bg-[#1E293B] text-base font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#334155]/40 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#1E293B] focus:ring-[#F97316] sm:mt-0 sm:w-auto sm:text-sm transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
