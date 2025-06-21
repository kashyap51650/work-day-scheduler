import { useState } from "react";
import { Task } from "@prisma/client";
export const useTaskModal = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const openModal = (task: Task) => setSelectedTask(task);
  const closeModal = () => setSelectedTask(null);

  return { selectedTask, openModal, closeModal };
};
