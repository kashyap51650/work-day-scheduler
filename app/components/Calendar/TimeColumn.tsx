// components/Calendar/TimeColumn.tsx
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const TimeColumn = () => {
  return (
    <div className="flex flex-col">
      {/* <div className="bg-gray-50 h-12 border-b border-r border-gray-300" /> */}

      {HOURS.map((hour) => (
        <div
          key={hour}
          className="h-20 border-b border-gray-300 text-[11px] text-gray-400 pr-1 pt-1 flex justify-end items-start border-r"
        >
          {hour.toString().padStart(2, "0")}:00
        </div>
      ))}
    </div>
  );
};
