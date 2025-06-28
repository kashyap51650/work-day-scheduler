"use client";
import React, { useState } from "react";
import { getWeekDates } from "@/utils/date";
import { useRouter } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import AddTaskModal from "../AddTaskModal";
import { useModal } from "@/hooks/useModal";

export const CalendarToolbar = () => {
  const router = useRouter();

  const { openModal, closeModal, isOpen } = useModal();

  // State for current date, task form, and view mode
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "day">("week");

  // Get week range for display
  const weekDates = getWeekDates(currentDate);
  const displayRange = `${weekDates[0]} - ${weekDates[6]}`;

  // Navigation handlers
  const goToPrev = () => {
    const prev = new Date(currentDate);
    prev.setDate(currentDate.getDate() + (viewMode === "week" ? -7 : -1));
    setCurrentDate(prev);
    if (viewMode === "week") {
      router.push(`/week/${getWeekDates(prev)[0]}`);
    } else {
      router.push(`/day/${prev.toISOString().split("T")[0]}`);
    }
  };

  const goToNext = () => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + (viewMode === "week" ? 7 : 1));
    setCurrentDate(next);
    if (viewMode === "week") {
      router.push(`/week/${getWeekDates(next)[0]}`);
    } else {
      router.push(`/day/${next.toISOString().split("T")[0]}`);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    if (viewMode === "week") {
      router.push(`/week/${getWeekDates(today)[0]}`);
    } else {
      router.push(`/day/${today.toISOString().split("T")[0]}`);
    }
  };

  const goToDate = (date: Date) => {
    setCurrentDate(date);
    if (viewMode === "week") {
      router.push(`/week/${getWeekDates(date)[0]}`);
    } else {
      router.push(`/day/${date.toISOString().split("T")[0]}`);
    }
  };

  const handleViewModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value as "week" | "day";
    setViewMode(mode);
    if (mode === "week") {
      router.push(`/week/${getWeekDates(currentDate)[0]}`);
    } else {
      router.push(`/day/${currentDate.toISOString().split("T")[0]}`);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 pt-6 pb-4 bg-white rounded-xl shadow border border-gray-100">
        <div className="flex items-center gap-3">
          <CalendarDaysIcon className="w-7 h-7 text-indigo-600" />
          <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">
            Workday Calendar
          </h1>
          <select
            value={viewMode}
            onChange={handleViewModeChange}
            className="ml-4 border border-indigo-200 rounded-lg px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-400 transition cursor-pointer"
          >
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={goToPrev}
            className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100 transition border border-gray-200 cursor-pointer"
            title="Previous"
          >
            <ChevronLeftIcon className="w-5 h-5 text-indigo-600" />
          </button>
          <span className="text-base font-semibold text-gray-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 btn">
            {viewMode === "week"
              ? displayRange
              : currentDate.toISOString().split("T")[0]}
          </span>
          <button
            onClick={goToNext}
            className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100 transition border border-gray-200 cursor-pointer"
            title="Next"
          >
            <ChevronRightIcon className="w-5 h-5 text-indigo-600" />
          </button>
          <button
            onClick={goToToday}
            className="ml-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition cursor-pointer"
          >
            Today
          </button>
          <input
            type="date"
            onChange={(e) => goToDate(new Date(e.target.value))}
            className="text-sm border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 cursor-pointer hover:bg-indigo-50 transition"
            defaultValue={currentDate.toISOString().split("T")[0]}
          />
          <button
            className="ml-2 flex items-center gap-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
            onClick={openModal}
          >
            <PlusIcon className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>
      <AddTaskModal open={isOpen} onClose={closeModal} />
    </>
  );
};
