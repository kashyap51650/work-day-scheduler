import { Task } from "@prisma/client";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("/api/tasks", { next: { tags: ["tasks"] } });
  return res.json();
}
