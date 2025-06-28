import { getDateValues } from "@/utils/date";
import clsx from "clsx";
import React from "react";

interface CalendarHeaderProps {
  date: string;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ date }) => {
  return (
    <div
      key={date}
      className={clsx(
        "h-12 flex justify-center font-semibold text-gray-700 border-b border-gray-300 flex-col ps-2"
      )}
    >
      <span className="text-xl leading-6">{getDateValues(date).day}</span>
      <span className="text-xs">{getDateValues(date).weekday}</span>
    </div>
  );
};
