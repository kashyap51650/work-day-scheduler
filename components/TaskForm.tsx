"use client";

import { createTask } from "@/actions/task";
import { useWeeklyCalendarStore } from "@/store/useWeeklyCalenderStore";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  PencilIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { useActionState, useEffect, useRef, useState } from "react";

const initialState = { message: "", success: false };

export default function TaskForm() {
  const { loadTasks } = useWeeklyCalendarStore();
  const [state, formAction] = useActionState(createTask, initialState);

  const [showStatus, setShowStatus] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.message) {
      setShowStatus(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowStatus(false), 2000);
    }
    if (state.success) loadTasks();
    // eslint-disable-next-line
  }, [state.message, state.success]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <form action={formAction} className="p-6 space-y-5">
      <div className="text-indigo-600 text-xl font-semibold flex items-center gap-2">
        Add Task
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
          <PencilIcon className="w-4 h-4 text-indigo-500" />
          <input
            name="title"
            type="text"
            required
            placeholder="e.g., Project Meeting"
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
          <CalendarIcon className="w-4 h-4 text-indigo-500" />
          <input
            name="date"
            type="date"
            required
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Time Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
            <ClockIcon className="w-4 h-4 text-indigo-500" />
            <input
              name="startTime"
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
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
            <ClockIcon className="w-4 h-4 text-indigo-500" />
            <input
              name="endTime"
              type="time"
              required
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full primary-btn">
        Add Task
      </button>

      {/* Status Message */}
      {showStatus && state.message && (
        <div
          className={`flex items-center justify-center gap-2 mt-3 py-2 px-3 rounded-lg border text-sm font-medium animate-fade-in
            ${
              state.success
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
        >
          {state.success ? (
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
          ) : (
            <XCircleIcon className="w-5 h-5 text-red-500" />
          )}
          <span>{state.message}</span>
        </div>
      )}
    </form>
  );
}
