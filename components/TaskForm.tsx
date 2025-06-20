"use client";

import { createTask } from "../actions/task";
import {
  CalendarIcon,
  ClockIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useActionState } from "react";

const initialState = { message: "" };

export function TaskForm() {
  const [state, formAction] = useActionState(createTask, initialState);

  return (
    <form
      action={formAction}
      className="bg-white shadow-xl rounded-2xl p-6 max-w-md w-full border border-gray-200 space-y-5"
    >
      <div className="text-indigo-600 text-xl font-semibold flex items-center gap-2">
        <PencilIcon className="w-5 h-5" />
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
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
      >
        Add Task
      </button>

      {/* Status Message */}
      {state?.message && (
        <p className="text-green-600 text-sm mt-2 text-center">
          {state.message}
        </p>
      )}
    </form>
  );
}
