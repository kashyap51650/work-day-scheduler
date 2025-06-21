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

const HOURS = Array.from({ length: 24 }, (_, i) => i); // 0 to 23

export const WeeklyCalendar = ({ weekDates, tasks }: WeeklyCalendarProps) => {
  return (
    <div className="relative">
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

        {/* Time Grid */}
        {HOURS.map((hour) => (
          <React.Fragment key={hour}>
            <div className="p-2 text-xs text-gray-500 border-b border-r h-20">
              {hour}:00
            </div>
            {weekDates.map((date) => (
              <div
                key={`${date}-${hour}`}
                className="border-b border-r h-20 relative"
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Task Layer (absolute positioning over grid) */}
      <div className="absolute top-10 left-[80px] right-0 bottom-0 grid grid-cols-7 pointer-events-none">
        {weekDates.map((date, colIndex) => (
          <div key={date} className="relative">
            {tasks
              .filter((task) => task.date === date)
              .map((task) => {
                const [startHour, startMinute] = task.startTime
                  .split(":")
                  .map(Number);
                const [endHour, endMinute] = task.endTime
                  .split(":")
                  .map(Number);

                const startTotalMinutes = startHour * 60 + startMinute;
                const endTotalMinutes = endHour * 60 + endMinute;
                const durationMinutes = endTotalMinutes - startTotalMinutes;

                const topOffset = (startTotalMinutes / (24 * 60)) * 100;
                const height = (durationMinutes / (24 * 60)) * 100;

                return (
                  <div
                    key={task.id}
                    className={clsx(
                      "absolute left-1 right-1 bg-indigo-100 text-indigo-800 text-xs rounded-md p-1 shadow",
                      "hover:bg-indigo-200 transition pointer-events-auto"
                    )}
                    style={{
                      top: `${topOffset}%`,
                      height: `${height}%`,
                    }}
                  >
                    <strong>{task.title}</strong>
                    <div className="text-[10px]">
                      {task.startTime}–{task.endTime}
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};
