import { Task } from "@prisma/client";

interface FetchHolidayParams {
  date?: string; // 'YYYY-MM-DD'
  week?: string; // 'YYYY-MM-DD' (start of the week)
}

export async function fetchHolidays(
  params: FetchHolidayParams = {}
): Promise<Task[]> {
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined) as [
        string,
        string
      ][]
    )
  ).toString();

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/holidays${
    query ? `?${query}` : ""
  }`;
  console.log("Fetching holidays from URL:", url);
  const res = await fetch(url, {
    next: { tags: ["holidays"] }, // ✅ ISR/Cache tagging
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
}
