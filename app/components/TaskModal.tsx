import React from "react";
import { Task } from "@prisma/client";
import {
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  const handleEdit = () => {
    // open task in form or navigate
    alert(`Edit: ${task.title}`);
  };

  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      // delete logic here
      alert(`Deleted: ${task.title}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <XCircleIcon className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <h2 className="text-lg font-bold text-gray-900 mb-2">{task.title}</h2>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Date:</span> {task.date}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Time:</span> {task.startTime} –{" "}
          {task.endTime}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            <PencilIcon className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200"
          >
            <TrashIcon className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
