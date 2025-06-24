import React, { useState, useEffect } from "react";
import {
  CalendarIcon,
  ClockIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Task } from "@prisma/client";
import { updateTask } from "@/actions/task";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<Task>;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = new FormData(e.currentTarget);
    formDataObj.append("id", initialData?.id || "");
    updateTask(formDataObj);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-indigo-600 text-xl font-semibold flex items-center gap-2">
            <PencilIcon className="w-5 h-5" />
            {initialData?.id ? "Edit Task" : "Add Task"}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50">
              <PencilIcon className="w-4 h-4 text-indigo-500" />
              <input
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                type="text"
                required
                placeholder="e.g., Team Sync"
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50">
              <CalendarIcon className="w-4 h-4 text-indigo-500" />
              <input
                name="date"
                value={formData.date || ""}
                onChange={handleChange}
                type="date"
                required
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50">
                <ClockIcon className="w-4 h-4 text-indigo-500" />
                <input
                  name="startTime"
                  value={formData.startTime || ""}
                  onChange={handleChange}
                  type="time"
                  required
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50">
                <ClockIcon className="w-4 h-4 text-indigo-500" />
                <input
                  name="endTime"
                  value={formData.endTime || ""}
                  onChange={handleChange}
                  type="time"
                  required
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            {initialData?.id ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
