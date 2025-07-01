import { CalendarGrid } from "@/components/Calendar/CalendarGrid";
import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
import { TaskLayer } from "@/components/Calendar/TaskLayer";
import { TimeColumn } from "@/components/Calendar/TimeColumn";
import { fetchTasks } from "@/services/taskService";
import React from "react";

const WeekPage = async ({ params }: { params: { weekStart: string } }) => {
  const { weekStart } = await params;
  const data = await fetchTasks({ weekStart });
  return (
    <div className="p-6">
      <div className=" border border-gray-300 shadow-sm rounded-xl">
        <div className="grid grid-cols-[60px_1fr] min-w-[400px]">
          <div className="h-12 border-b border-r border-gray-300" />
          <CalendarHeader weekStartDate={weekStart} />
        </div>
        <div className="grid grid-cols-[60px_1fr] min-w-[400px] h-[calc(100vh-12rem)] overflow-y-scroll">
          <TimeColumn />
          <div className="relative">
            <CalendarGrid week={true} />
            <TaskLayer weekDate={weekStart} tasks={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekPage;
