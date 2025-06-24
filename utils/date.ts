export function getWeekDates(startDate: Date): string[] {
  const startOfWeek = new Date(startDate);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + 1; // Monday
  startOfWeek.setDate(diff);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

export const isToday = (dateStr: string) => {
  const today = new Date().toISOString().split("T")[0];
  return today === dateStr;
};

export const getDateValues = (date: string) => {
  const value = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
  });
  const [day, weekday] = value.split(" ");

  return {
    weekday: weekday,
    day: day,
  };
};
