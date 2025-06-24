import Link from "next/link";
import {
  CalendarDaysIcon,
  PencilSquareIcon,
  TrashIcon,
  ClockIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4 py-20 sm:px-6 lg:px-12">
        <section className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-indigo-800 mb-6">
            🗓️ Work Day Scheduler
          </h1>
          <p className="text-lg text-indigo-600 mb-8">
            Plan your <strong>day</strong> effectively with real-time task
            management and smart UI powered by <strong>React 19</strong>.
          </p>
          <Link
            href="/today"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-indigo-700 transition"
          >
            🚀 Get Started
          </Link>
        </section>

        <section className="mt-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-indigo-800 mb-10 text-center">
            ✨ Features That Boost Productivity
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4"
              >
                <div className="text-indigo-600 flex-shrink-0">
                  <feature.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-indigo-800">
                    {feature.title}
                  </h3>
                  <p className="text-indigo-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 text-center">
          <h3 className="text-2xl font-bold text-indigo-800 mb-4">
            Ready to Own Your Schedule?
          </h3>
          <p className="text-indigo-600 mb-6">
            Get started now and take control of your time.
          </p>
          <Link
            href="/today"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-indigo-700 transition"
          >
            Plan My Day
          </Link>
        </section>
      </main>
    </>
  );
}

const features = [
  {
    title: "Hourly Time Blocks",
    description: "Visualize and assign tasks from 9 AM to 5 PM.",
    icon: CalendarDaysIcon,
  },
  {
    title: "Add / Edit Tasks",
    description: "Quickly add or modify tasks within a time block.",
    icon: PencilSquareIcon,
  },
  {
    title: "Delete Tasks",
    description: "Remove unnecessary tasks with ease.",
    icon: TrashIcon,
  },
  {
    title: "Auto-Save with Server Actions",
    description: "No need to hit save – it happens instantly.",
    icon: CloudArrowUpIcon,
  },
  {
    title: "Highlight Current Hour",
    description: "Red highlight for the current hour helps you stay on track.",
    icon: ClockIcon,
  },
  {
    title: "AI Task Suggestions",
    description: "Get smart suggestions for common work tasks.",
    icon: Cog6ToothIcon,
  },
];
