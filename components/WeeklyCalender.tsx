"use client";

import React from "react";
import clsx from "clsx";

type Task = {
  id: string;
  title: string;
  date: string; // 'YYYY-MM-DD'
  startTime: string; // 'HH:mm'
  endTime: string; // 'HH:mm'
};

interface WeeklyCalendarProps {
  weekDates: string[]; // 7 dates in 'YYYY-MM-DD' format for the current week
  tasks: Task[];
}

const HOURS = Array.from({ length: 10 }, (_, i) => 8 + i); // 8 AM to 6 PM

export const WeeklyCalendar = ({ weekDates, tasks }: WeeklyCalendarProps) => {
  const getTasksForSlot = (date: string, hour: number) => {
    return tasks.filter((task) => {
      const taskHour = parseInt(task.startTime.split(":")[0], 10);
      return task.date === date && taskHour === hour;
    });
  };

  return (
    <div className="grid grid-cols-[80px_repeat(7,_1fr)] border border-gray-200 rounded-lg overflow-hidden shadow">
      {/* Header Row */}
      <div className="bg-gray-100 p-2 text-sm font-semibold text-center border-b border-r" />
      {weekDates.map((date) => (
        <div
          key={date}
          className="bg-gray-100 p-2 text-sm font-semibold text-center border-b border-r"
        >
          {new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
      ))}

      {/* Time Slots */}
      {HOURS.map((hour) => (
        <React.Fragment key={hour}>
          {/* Time Label */}
          <div className="p-2 text-xs text-gray-500 border-b border-r h-20">
            {hour}:00
          </div>

          {/* Task Cells */}
          {weekDates.map((date) => (
            <div
              key={date + hour}
              className="border-b border-r h-20 relative px-1 py-0.5"
            >
              {getTasksForSlot(date, hour).map((task) => (
                <div
                  key={task.id}
                  className={clsx(
                    "absolute inset-x-1 top-1 bg-indigo-100 text-indigo-800 text-xs rounded-md p-1 shadow",
                    "hover:bg-indigo-200 transition"
                  )}
                >
                  <strong>{task.title}</strong>
                  <div className="text-[10px]">
                    {task.startTime}–{task.endTime}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
