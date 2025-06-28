"use client";

import AddTask from "@/components/AddTask";
import { CalendarPage } from "@/components/CalenderPage";
import { useState } from "react";

export default function Today() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <main className="bg-gray-50 max-h-screen">
      <div className="flex bg-white h-full">
        {/* Calendar Section - Scrollable */}
        <section className="w-full h-full">
          <CalendarPage
            showTaskForm={showTaskForm}
            toggleTaskForm={setShowTaskForm}
          />
        </section>
        {/* Add Task Section - Sticky */}
        {showTaskForm && (
          <aside className="w-1/4 border-l-2 border-gray-200 bg-indigo-100">
            <div className="sticky top-0 ">
              <AddTask />
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
