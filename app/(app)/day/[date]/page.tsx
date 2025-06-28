import { CalendarGrid } from "@/components/Calendar/CalendarGrid";
import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
import { TaskLayer } from "@/components/Calendar/TaskLayer";
import { TimeColumn } from "@/components/Calendar/TimeColumn";
import { fetchTasks } from "@/services/taskService";
import React from "react";

const DayPage = async ({ params }: { params: { date: string } }) => {
  const { date } = await params;
  const data = await fetchTasks({ date });
  return (
    <div className="p-6">
      <div className="grid grid-cols-[60px_1fr] min-w-[400px] border border-gray-300 shadow-sm rounded-xl">
        <div className="h-12 border-b border-r border-gray-300" />
        <CalendarHeader date={date} />
        {/* Time labels and grid */}
        <TimeColumn />
        <div className="relative">
          <CalendarGrid />
          <TaskLayer date={date} tasks={data} />
        </div>
      </div>
    </div>
  );
};

export default DayPage;
