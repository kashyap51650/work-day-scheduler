"use client";

import { useWeeklyCalendar } from "../../hooks/useWeeklyCalender";
import { WeeklyCalendar } from "./WeeklyCalender";

export default function CalendarPage() {
  const {
    weekDates,
    tasks,
    goToNextWeek,
    goToPrevWeek,
    goToToday,
    goToDate,
    currentDate,
  } = useWeeklyCalendar();

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
        </div>
      </div>

      <WeeklyCalendar weekDates={weekDates} tasks={tasks} />
    </main>
  );
}
