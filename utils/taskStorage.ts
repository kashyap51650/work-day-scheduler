// utils/taskStorage.ts

type Task = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
};

const STORAGE_KEY = "calendar-tasks";

export function getAllTasks(): Task[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getTasksForWeek(weekDates: string[]): Task[] {
  const all = getAllTasks();
  return all.filter((task) => weekDates.includes(task.date));
}

export function saveTask(task: Task): void {
  const tasks = getAllTasks();
  tasks.push(task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
