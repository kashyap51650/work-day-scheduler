import { CalendarGrid } from "@/components/Calendar/CalendarGrid";
import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
import { CurrentTimeBar } from "@/components/Calendar/CurrentTimeBar";
import { TaskLayer } from "@/components/Calendar/TaskLayer";
import { TimeColumn } from "@/components/Calendar/TimeColumn";
import { fetchTasks } from "@/services/taskService";
import React, { Suspense } from "react";

const DayPage = async ({ params }: { params: Promise<{ date: string }> }) => {
  const { date } = await params;
  const data = fetchTasks({ date });
  return (
    <div className="p-6">
      <div className=" border border-gray-300 shadow-sm rounded-xl">
        <div className="grid grid-cols-[60px_1fr] min-w-[400px]">
          <div className="h-12 border-b border-r border-gray-300" />
          <CalendarHeader date={date} />
        </div>
        <div className="grid grid-cols-[60px_1fr] min-w-[400px] h-[calc(100vh-12rem)] overflow-y-scroll">
          <TimeColumn />
          <div className="relative">
            <CalendarGrid />
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  Loading tasks...
                </div>
              }
            >
              <TaskLayer date={date} tasksPromise={data} />
            </Suspense>
            <CurrentTimeBar week={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayPage;
