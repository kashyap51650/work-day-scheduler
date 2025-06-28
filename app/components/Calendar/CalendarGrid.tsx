import { HOURS } from "@/constant/time";

interface CalendarGridProps {
  week?: boolean;
}

export const CalendarGrid = ({ week = false }: CalendarGridProps) => {
  if (week) {
    // 7 columns for week, each column for a day
    return (
      <div className="grid grid-cols-7 min-w-[840px] flex-1">
        {HOURS.map((hour, i) =>
          Array.from({ length: 7 }).map((_, dayIdx) => (
            <div
              key={`${hour}-${dayIdx}`}
              className={`h-20 border-b border-r border-gray-200 ${
                i % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            />
          ))
        )}
      </div>
    );
  }

  // Default: single day column
  return (
    <div className="flex flex-col min-w-[200px] flex-1">
      {HOURS.map((_, i) => (
        <div
          key={i}
          className={`h-20 border-b border-gray-200 ${
            i % 2 === 0 ? "bg-gray-50" : "bg-white"
          }`}
        />
      ))}
    </div>
  );
};
