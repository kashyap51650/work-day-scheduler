export function getWeekDates(date: Date): string[] {
  const givenDate = new Date(date);
  const day = givenDate.getDay(); // 0 (Sun) to 6 (Sat)
  const mondayOffset = day === 0 ? -6 : 1 - day; // move to Monday

  const monday = new Date(givenDate);
  monday.setDate(givenDate.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
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
