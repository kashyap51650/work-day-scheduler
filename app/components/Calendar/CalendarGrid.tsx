interface CalendarGridProps {
  date: string;
}

export const CalendarGrid = ({ date }: CalendarGridProps) => {
  return (
    <div className="flex flex-col min-w-[200px] flex-1">
      {Array.from({ length: 24 }, (_, i) => (
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
