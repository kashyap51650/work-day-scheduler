import { getDateValues, getWeekDates } from "@/utils/date";
import clsx from "clsx";
import React from "react";

interface CalendarHeaderProps {
  date?: string;
  weekStartDate?: string;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  date,
  weekStartDate,
}) => {
  // If weekDates is provided, render headers for the week
  if (weekStartDate) {
    const weekDates = getWeekDates(new Date(weekStartDate));
    return (
      <div className="grid grid-cols-7">
        {weekDates.map((d) => {
          const { day, weekday } = getDateValues(d);
          return (
            <div
              key={d}
              className={clsx(
                "h-12 flex justify-center font-semibold text-gray-700 border-b border-gray-300 flex-col ps-2 items-center"
              )}
            >
              <span className="text-xl leading-6">{day}</span>
              <span className="text-xs">{weekday}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // Otherwise, render a single day header
  if (date) {
    const { day, weekday } = getDateValues(date);
    return (
      <div
        key={date}
        className={clsx(
          "h-12 flex justify-center font-semibold text-gray-700 border-b border-gray-300 flex-col ps-2"
        )}
      >
        <span className="text-xl leading-6">{day}</span>
        <span className="text-xs">{weekday}</span>
      </div>
    );
  }

  return null;
};
