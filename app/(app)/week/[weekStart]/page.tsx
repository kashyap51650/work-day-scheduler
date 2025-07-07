import { CalendarGrid } from "@/components/Calendar/CalendarGrid";
import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
import { CurrentTimeBar } from "@/components/Calendar/CurrentTimeBar";
import { TaskLayer } from "@/components/Calendar/TaskLayer";
import { TimeColumn } from "@/components/Calendar/TimeColumn";
import { fetchHolidays } from "@/services/holidayService";
import { fetchTasks } from "@/services/taskService";
import React, { Suspense } from "react";

const WeekPage = async ({
  params,
}: {
  params: Promise<{ weekStart: string }>;
}) => {
  const { weekStart } = await params;
  // But using await in a Server Component will block its rendering until the await statement is finished. Passing a Promise from a Server Component to a Client Component prevents the Promise from blocking the rendering of the Server Component.
  const data = fetchTasks({ weekStart });
  const holidays = fetchHolidays({ week: weekStart });
  return (
    <div className="p-6">
      <div className=" border border-gray-300 shadow-sm rounded-xl">
        <div className="grid grid-cols-[60px_1fr] min-w-[400px]">
          <div className="h-15 border-b border-r border-gray-300" />
          <CalendarHeader weekStartDate={weekStart} />
        </div>
        <div className="grid grid-cols-[60px_1fr] min-w-[400px] h-[calc(100vh-12rem)] overflow-y-scroll">
          <TimeColumn />
          <div className="relative">
            <CalendarGrid
              week={true}
              weekDate={weekStart}
              holidaysPromise={holidays}
            />
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  Loading tasks...
                </div>
              }
            >
              <TaskLayer weekDate={weekStart} tasksPromise={data} />
            </Suspense>
            <CurrentTimeBar week={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekPage;
