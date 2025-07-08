import { Task } from "@prisma/client";

interface FetchTasksParams {
  date?: string; // 'YYYY-MM-DD'
  weekStart?: string; // 'YYYY-MM-DD' (start of the week)
}

export async function fetchTasks(
  params: FetchTasksParams = {}
): Promise<Task[]> {
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined) as [
        string,
        string
      ][]
    )
  ).toString();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks${
    query ? `?${query}` : ""
  }`;

  const res = await fetch(url, {
    next: { tags: ["tasks"] }, // ✅ ISR/Cache tagging
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
}
