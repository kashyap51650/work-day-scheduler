// hooks/useWeeklyCalendar.ts

import { useState, useEffect } from "react";
import { getWeekDates } from "../utils/date";
import { fetchTasks } from "../services/taskService";
import { Task } from "../generated/prisma";

export function useWeeklyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTask = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    const dates = getWeekDates(currentDate);
    setWeekDates(dates);
    loadTask();
  }, [currentDate]);

  const goToNextWeek = () => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + 7);
    setCurrentDate(next);
  };

  const goToPrevWeek = () => {
    const prev = new Date(currentDate);
    prev.setDate(currentDate.getDate() - 7);
    setCurrentDate(prev);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const goToDate = (date: Date) => {
    setCurrentDate(date);
  };

  return {
    currentDate,
    weekDates,
    tasks,
    goToNextWeek,
    goToPrevWeek,
    goToToday,
    goToDate,
  };
}
