"use client";
import { Task } from "@prisma/client";
import { TaskCard } from "./Task";
interface TaskLayerProps {
  date: string;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

// Check if two tasks overlap
const isOverlapping = (a: Task, b: Task) => {
  return a.startTime < b.endTime && b.startTime < a.endTime;
};

export const TaskLayer = ({ date, tasks, onTaskClick }: TaskLayerProps) => {
  const dayTasks = tasks.filter((task) => task.date === date);

  // Build overlap groups
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

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
      {groups.flatMap((group, groupIndex) =>
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
