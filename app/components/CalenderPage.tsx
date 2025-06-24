"use client";

import { useWeeklyCalendarStore } from "@/store/useWeeklyCalenderStore";
import { WeeklyCalendar } from "./WeeklyCalender";
import { useEffect } from "react";

export const CalendarPage: React.FC<{
  showTaskForm: boolean;
  toggleTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showTaskForm, toggleTaskForm }) => {
  const {
    weekDates,
    tasks,
    currentDate,
    goToNextWeek,
    goToPrevWeek,
    goToToday,
    goToDate,
    loadTasks,
  } = useWeeklyCalendarStore();

  // Load tasks whenever the currentDate changes
  useEffect(() => {
    loadTasks();
  }, [currentDate]);

  const displayRange = `${new Date(weekDates[0]).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} - ${new Date(weekDates[6]).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })}`;

  return (
    <main className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-bold">Workday Calendar</h1>
        <div className="flex items-center gap-2">
          <button onClick={goToPrevWeek} className="btn">
            ← Previous
          </button>
          <span className="text-sm font-medium text-gray-600">
            {displayRange}
          </span>
          <button onClick={goToNextWeek} className="btn">
            Next →
          </button>
          <button onClick={goToToday} className="btn">
            Today
          </button>
          <input
            type="date"
            onChange={(e) => goToDate(new Date(e.target.value))}
            className="text-sm border rounded px-2 py-1"
            defaultValue={currentDate.toISOString().split("T")[0]}
          />
          <button
            className="primary-btn"
            onClick={() => toggleTaskForm((prev) => !prev)}
          >
            {!showTaskForm ? "Add Task" : "Show Full Screen"}
          </button>
        </div>
      </div>

      <WeeklyCalendar weekDates={weekDates} tasks={tasks} />
    </main>
  );
};
