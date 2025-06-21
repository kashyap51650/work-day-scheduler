"use server";

import { db } from "@/lib/prisma";
import { saveTask } from "../app/services/taskService";

type FormState = { message: string };

export async function createTask(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Add 5 seconds delay to simulate server processing time
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("Form Data:", Object.fromEntries(formData.entries()));
  const task = await db.task.create({
    data: {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
    },
  });
  return { message: "✅ Task added successfully!" };
}
