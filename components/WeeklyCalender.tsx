"use client";

import React from "react";
import clsx from "clsx";
import { Task } from "@prisma/client";
import TaskModal from "./TaskModal";
import { useTaskModal } from "@/hooks/useTaskModal";
import { getCurrentMinutes } from "@/utils/time";
import { getDateValues, isToday } from "@/utils/date";

interface WeeklyCalendarProps {
  weekDates: string[]; // 7 dates in 'YYYY-MM-DD' format
  tasks: Task[];
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const WeeklyCalendar = ({ weekDates, tasks }: WeeklyCalendarProps) => {
  const currentMinutes = getCurrentMinutes();
  const { selectedTask, openModal, closeModal } = useTaskModal();

  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
      <div className="grid grid-cols-[60px_repeat(7,_1fr)] min-w-[900px] ">
        {/* Header */}
        <div className="bg-gray-50 h-12 border-b border-r border-gray-300" />
        {weekDates.map((date) => (
          <div
            key={date}
            className={clsx(
              "bg-gray-50 h-12 flex items-center justify-center text-xs font-semibold text-gray-700 border-b border-r border-gray-300 flex-col",
              isToday(date) && "border-b-indigo-500 border-b-4"
            )}
          >
            <div className="text-xl">{getDateValues(date).day}</div>
            <div>{getDateValues(date).weekday}</div>
          </div>
        ))}

        {/* Time Grid */}
        {HOURS.map((hour, i) => (
          <React.Fragment key={hour}>
            <div className="border-r border-b h-20 flex items-start justify-end pr-1 text-[11px] text-gray-400 pt-1 border-gray-300 ">
              {hour.toString().padStart(2, "0")}:00
            </div>
            {weekDates.map((date) => (
              <div
                key={`${date}-${hour}`}
                className={clsx(
                  "relative h-20 border-b border-r border-gray-200",
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                )}
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Task Layer */}
      <div className="absolute top-12 left-[60px] right-0 bottom-0 grid grid-cols-7 pointer-events-none min-w-[840px]">
        {weekDates.map((date) => (
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

                const upcoming =
                  isToday(task.date) && startTotalMinutes > currentMinutes;

                return (
                  <div
                    key={task.id}
                    onClick={(event) => {
                      event.stopPropagation();
                      openModal(task);
                    }}
                    style={{
                      top: `${topOffset}%`,
                      height: `${height}%`,
                    }}
                    className="absolute left-[4px] right-[4px] cursor-pointer"
                  >
                    <div
                      className={clsx(
                        "w-full h-full p-[6px] text-[11px] rounded-md shadow-md pointer-events-auto",
                        "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-l-4 border-indigo-500",
                        upcoming
                          ? "text-white font-semibold"
                          : "text-gray-100 opacity-80"
                      )}
                    >
                      <strong className="block text-[12px] truncate">
                        {task.title}
                      </strong>
                      <span className="text-[10px] block">
                        {task.startTime} – {task.endTime}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTask && <TaskModal task={selectedTask} onClose={closeModal} />}
    </div>
  );
};
