"use client";
import { Task } from "@prisma/client";
import { TaskCard } from "./Task";
import { getWeekDates } from "@/utils/date";
import { use } from "react";

interface TaskLayerProps {
  date?: string; // for single day
  weekDate?: string; // for week view
  tasksPromise: Promise<Task[]>; // tasks can be a promise or an array
  onTaskClick?: (task: Task) => void;
}

// Check if two tasks overlap
const isOverlapping = (a: Task, b: Task) => {
  return a.startTime < b.endTime && b.startTime < a.endTime;
};

function getGroups(dayTasks: Task[]) {
  const groups: Task[][] = [];
  dayTasks.forEach((task) => {
    let added = false;
    for (const group of groups) {
      if (group.some((t) => isOverlapping(t, task))) {
        group.push(task);
        added = true;
        break;
      }
    }
    if (!added) {
      groups.push([task]);
    }
  });
  return groups;
}

export const TaskLayer = ({
  date,
  weekDate,
  tasksPromise,
  onTaskClick,
}: TaskLayerProps) => {
  const tasks = use(tasksPromise);
  // Week view
  if (weekDate) {
    const weekDates = getWeekDates(new Date(weekDate));
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-7 pointer-events-none min-w-[840px]">
        {weekDates.map((d) => {
          const dayTasks = tasks.filter((task) => task.date === d);
          const groups = getGroups(dayTasks);

          return (
            <div key={d} className="relative">
              {groups.flatMap((group) =>
                group.map((task, i) => {
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

                  const widthPercent = 100 / group.length;
                  const leftOffset = widthPercent * i;

                  return (
                    <TaskCard
                      key={task.id}
                      task={task}
                      topOffset={topOffset}
                      height={height}
                      width={widthPercent}
                      left={leftOffset}
                      onClick={onTaskClick}
                    />
                  );
                })
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Single day view (default)
  const dayTasks = tasks.filter((task) => task.date === date);
  const groups = getGroups(dayTasks);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
      {groups.flatMap((group) =>
        group.map((task, i) => {
          const [startHour, startMinute] = task.startTime
            .split(":")
            .map(Number);
          const [endHour, endMinute] = task.endTime.split(":").map(Number);

          const startTotalMinutes = startHour * 60 + startMinute;
          const endTotalMinutes = endHour * 60 + endMinute;
          const durationMinutes = endTotalMinutes - startTotalMinutes;

          const topOffset = (startTotalMinutes / (24 * 60)) * 100;
          const height = (durationMinutes / (24 * 60)) * 100;

          const widthPercent = 100 / group.length;
          const leftOffset = widthPercent * i;

          return (
            <TaskCard
              key={task.id}
              task={task}
              topOffset={topOffset}
              height={height}
              width={widthPercent}
              left={leftOffset}
              onClick={onTaskClick}
            />
          );
        })
      )}
    </div>
  );
};
