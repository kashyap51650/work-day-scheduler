import React from "react";
import { createPortal } from "react-dom";

interface DeleteConfirmModalProps {
  open: boolean;
  taskTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal = ({
  open,
  taskTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  if (!open) return null;

  // Ensure this runs only in the browser
  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold text-red-700 mb-2 flex items-center gap-2">
          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Delete Task
        </h2>
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete
          {taskTitle ? (
            <span className="font-semibold text-red-600">{taskTitle}</span>
          ) : (
            " this task"
          )}
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
