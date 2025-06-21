import { Task } from "@prisma/client";
import React from "react";

const TaskHoveredPopup: React.FC<{ task: Task }> = ({ task }) => {
  const handleEdit = (task: Task) => {
    // open modal or navigate with task data
  };

  const handleDelete = (taskId: string) => {
    // show confirmation and delete task
  };
  return (
    <div className="absolute z-50 top-full mt-1 left-0 w-52 bg-white border rounded-md shadow-lg p-3 text-xs text-gray-800 space-y-2">
      <div>
        <div className="font-semibold">{task.title}</div>
        <div>
          {task.startTime} - {task.endTime}
        </div>
        <div className="text-gray-500">Date: {task.date}</div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="text-blue-600 hover:underline text-xs"
          onClick={() => handleEdit(task)}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:underline text-xs"
          onClick={() => handleDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskHoveredPopup;
