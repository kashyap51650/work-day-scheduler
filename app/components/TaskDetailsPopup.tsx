import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Task } from "@prisma/client";
import React from "react";
// Optional icons

const TaskDetailsPopup: React.FC<{
  task: Task;
  x: number;
  y: number;
}> = ({ task, x, y }) => {
  const handleEdit = (task: Task) => {
    // open modal or navigate
  };

  const handleDelete = (taskId: string) => {
    // confirmation and delete
  };

  return (
    <div
      className="fixed z-50 w-64 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-xl p-4 text-sm text-gray-800"
      style={{
        top: y + 12,
        left: x + 12,
      }}
    >
      {/* Title & Time */}
      <div className="mb-3 space-y-1">
        <h4 className="text-base font-semibold text-gray-900">{task.title}</h4>
        <p className="text-xs text-gray-500">
          ⏰ {task.startTime} – {task.endTime}
        </p>
        <p className="text-xs text-gray-500">📅 {task.date}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => handleEdit(task)}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-blue-600 hover:bg-blue-50 transition text-xs"
        >
          <PencilIcon className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={() => handleDelete(task.id)}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-red-600 hover:bg-red-50 transition text-xs"
        >
          <TrashIcon className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskDetailsPopup;
