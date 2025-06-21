import AddTask from "./components/AddTask";
import CalendarPage from "./components/CalenderPage";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Scheduler</h1>

      <div className="flex gap-6">
        {/* Add Task Section - Sticky */}
        <aside className="w-1/4">
          <div className="sticky top-6 bg-white rounded-2xl shadow-md p-4 border">
            <AddTask />
          </div>
        </aside>

        {/* Calendar Section - Scrollable */}
        <section className="w-3/4 h-[calc(100vh-6rem)] overflow-auto bg-white rounded-2xl shadow-md border">
          <CalendarPage />
        </section>
      </div>
    </main>
  );
}
