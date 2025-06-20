"use server";

import { saveTask } from "../app/services/taskService";

type FormState = { message: string };

export async function createTask(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const newTask = {
    id: crypto.randomUUID(),
    title: formData.get("title") as string,
    date: formData.get("date") as string,
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,
  };
  saveTask(newTask);

  // Save to DB here (currently mock)
  return { message: "✅ Task added successfully!" };
}
