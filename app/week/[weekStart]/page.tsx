import { CalendarGrid } from "@/app/components/Calendar/CalendarGrid";
import { CalendarHeader } from "@/app/components/Calendar/CalendarHeader";
import { TaskLayer } from "@/app/components/Calendar/TaskLayer";
import { TimeColumn } from "@/app/components/Calendar/TimeColumn";
import { fetchTasks } from "@/app/services/taskService";
import React from "react";
const WeekPage = async ({ params }: { params: { weekStart: string } }) => {
  const { weekStart } = await params;
  const data = await fetchTasks({ weekStart });
  console.log("Fetched tasks for week starting:", weekStart, data);
  return (
    <div className="p-6">
      <div className="grid grid-cols-[60px_1fr] min-w-[400px] border border-gray-300 shadow-sm rounded-xl">
        <div className="h-12 border-b border-r border-gray-300" />
        <CalendarHeader weekStartDate={weekStart} />
        {/* Time labels and grid */}
        <TimeColumn />
        <div className="relative">
          <CalendarGrid week={true} />
          <TaskLayer weekDate={weekStart} tasks={data} />
        </div>
      </div>
    </div>
  );
};

export default WeekPage;
