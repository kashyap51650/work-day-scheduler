import { HOURS } from "@/constant/time";
import { getWeekDates } from "@/utils/date";
import { Holiday } from "@prisma/client";
import { use } from "react";

interface CalendarGridProps {
  date?: string; // for single day
  weekDate?: string; // for week view
  week?: boolean;
  holidaysPromise: Promise<Holiday[]>;
}

export const CalendarGrid = ({
  date,
  weekDate,
  week = false,
  holidaysPromise,
}: CalendarGridProps) => {
  const holidays = use(holidaysPromise);

  // Helper to get holiday for a date
  const getHolidayForDate = (d: string) => holidays.find((h) => h.date === d);

  if (week && weekDate) {
    const weekDates = getWeekDates(new Date(weekDate));

    // 7 columns for week, each column for a day
    return (
      <div className="grid grid-cols-7 min-w-[840px] flex-1">
        {HOURS.map((hour, i) =>
          weekDates.map((_, dayIdx) => {
            const isHoliaday = getHolidayForDate(weekDates[dayIdx]);
            return (
              <>
                <div
                  key={`${hour}-${dayIdx}`}
                  className={`h-20 border-b border-r border-gray-200 ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }
                `}
                  style={
                    isHoliaday
                      ? {
                          background:
                            "repeating-linear-gradient(135deg, #E8E8E8	 0 4px, transparent 4px 12px)",
                        }
                      : undefined
                  }
                >
                  {isHoliaday && (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-xs text-gray-500">
                        {isHoliaday.title}
                      </span>
                    </div>
                  )}
                </div>
              </>
            );
          })
        )}
      </div>
    );
  }

  // Default: single day column
  return (
    <div className="flex flex-col min-w-[200px] flex-1">
      {HOURS.map((_, i) => {
        const isHoliaday = getHolidayForDate(date ?? "");
        return (
          <div
            key={i}
            className={`h-20 border-b border-gray-200 ${
              i % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
            style={
              isHoliaday
                ? {
                    background:
                      "repeating-linear-gradient(135deg, #E8E8E8 0 4px, transparent 4px 12px)",
                  }
                : undefined
            }
          >
            {isHoliaday && (
              <div className="flex h-full items-center justify-center">
                <span className="text-xs text-gray-500">
                  {isHoliaday.title}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
