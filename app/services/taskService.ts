import { Task } from "@prisma/client";

export async function saveTask(task: {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("/api/tasks");
  return res.json();
}
