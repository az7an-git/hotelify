import React from 'react';
import ReactDOM from 'react-dom';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName, itemType = "Item", isDeleting }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: '#0f172a', borderColor: '#f43f5e' }}
        className="relative w-full max-w-md border rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 space-y-6 text-center overflow-hidden"
      >

        {/* Warning Icon Badge */}
        <div
          style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#f43f5e' }}
          className="w-16 h-16 rounded-full border flex items-center justify-center mx-auto text-2xl shadow-inner"
        >
          <FaExclamationTriangle />
        </div>

        {/* Modal Text */}
        <div className="space-y-3">
          <h3 style={{ color: '#ffffff' }} className="text-2xl font-black tracking-wide">
            Delete {itemType}?
          </h3>
          <p style={{ color: '#e2e8f0' }} className="text-sm font-medium leading-relaxed px-2">
            Are you sure you want to delete{" "}
            <span
              style={{
                color: '#fbbf24',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                borderColor: 'rgba(245, 158, 11, 0.5)'
              }}
              className="font-bold px-2 py-0.5 rounded border inline-block my-1"
            >
              "{itemName}"
            </span>
            ? <br />
            <span style={{ color: '#94a3b8' }} className="text-xs font-normal">
              This action cannot be undone.
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            style={{ backgroundColor: '#1e293b', color: '#ffffff', borderColor: '#475569' }}
            className="w-1/2 py-3 rounded-full text-sm font-bold border transition-all active:scale-95 disabled:opacity-50 hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            style={{ background: 'linear-gradient(to right, #f43f5e, #e11d48)', color: '#ffffff' }}
            className="w-1/2 py-3 rounded-full text-sm font-bold shadow-lg shadow-rose-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span style={{ color: '#ffffff' }}>Deleting...</span>
              </>
            ) : (
              <>
                <FaTrash className="text-xs" style={{ color: '#ffffff' }} />
                <span style={{ color: '#ffffff' }}>Delete</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default DeleteConfirmModal;
