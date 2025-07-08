import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  CalendarIcon,
  ClockIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Task } from "@prisma/client";
import { updateTask } from "@/actions/task";
import { fetchHolidays } from "@/services/holidayService";
import { ErrorAlert } from "./ErrorAlert";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<Task>;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [holidayWarning, setHolidayWarning] = useState("");
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

    if (e.target.name === "date") {
      onDateChange(e);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = new FormData(e.currentTarget);
    formDataObj.append("id", initialData?.id || "");
    updateTask(formDataObj);
    onClose();
  };

  const onDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const holidays = await fetchHolidays({ date });
    if (holidays.length > 0) {
      setHolidayWarning(
        `The selected date ${date} is a holiday ${holidays[0].title}. Please choose a different date`
      );
    } else {
      holidayWarning && setHolidayWarning("");
    }
  };

  const isHoliday = !!holidayWarning;

  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-indigo-600 text-xl font-semibold flex items-center gap-2">
            <PencilIcon className="w-5 h-5" />
            {initialData?.id ? "Edit Task" : "Add Task"}
          </div>

          {/* Holiday Warning */}
          {isHoliday && <ErrorAlert error={holidayWarning} />}

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
            className="w-full primary-btn"
            disabled={isHoliday}
          >
            {initialData?.id ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};
