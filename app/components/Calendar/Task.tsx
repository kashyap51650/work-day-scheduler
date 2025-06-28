// components/Calendar/TaskCard.tsx
"use client";
import { Task } from "@prisma/client";
import clsx from "clsx";
import { getCurrentMinutes } from "@/utils/time";
import { isToday } from "@/utils/date";

interface TaskCardProps {
  task: Task;
  topOffset: number;
  height: number;
  width?: number;
  left?: number;
  onClick?: (task: Task) => void;
}

export const TaskCard = ({
  task,
  topOffset,
  height,
  width = 100,
  left = 0,
  onClick,
}: TaskCardProps) => {
  const currentMinutes = getCurrentMinutes();
  const startTotalMinutes =
    parseInt(task.startTime.split(":")[0]) * 60 +
    parseInt(task.startTime.split(":")[1]);
  const upcoming = isToday(task.date) && startTotalMinutes > currentMinutes;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(task);
      }}
      style={{
        top: `${topOffset}%`,
        height: `${height}%`,
        width: `${width}%`,
        left: `${left}%`,
      }}
      className="absolute pointer-events-auto cursor-pointer"
    >
      <div
        className={clsx(
          "w-full h-full p-[6px] text-[11px] rounded-md shadow-md",
          "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-l-4 border-indigo-500",
          upcoming ? "text-white font-semibold" : "text-gray-100 opacity-80"
        )}
      >
        <strong className="block text-[12px] truncate">{task.title}</strong>
        <span className="text-[10px] block">
          {task.startTime} – {task.endTime}
        </span>
      </div>
    </div>
  );
};
