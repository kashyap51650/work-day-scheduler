// stores/useWeeklyCalendarStore.ts
import { create } from "zustand";
import { getWeekDates } from "@/utils/date";
import { fetchTasks } from "@/services/taskService";
import { Task } from "@prisma/client";

interface WeeklyCalendarState {
  currentDate: Date;
  weekDates: string[];
  tasks: Task[];
  setCurrentDate: (date: Date) => void;
  goToNextWeek: () => void;
  goToPrevWeek: () => void;
  goToToday: () => void;
  goToDate: (date: Date) => void;
  loadTasks: () => Promise<void>;
}

export const useWeeklyCalendarStore = create<WeeklyCalendarState>(
  (set, get) => ({
    currentDate: new Date(),
    weekDates: getWeekDates(new Date()),
    tasks: [],

    setCurrentDate: (date) => {
      set({ currentDate: date, weekDates: getWeekDates(date) });
    },

    goToNextWeek: () => {
      const { currentDate } = get();
      const next = new Date(currentDate);
      next.setDate(currentDate.getDate() + 7);
      set({ currentDate: next, weekDates: getWeekDates(next) });
    },

    goToPrevWeek: () => {
      const { currentDate } = get();
      const prev = new Date(currentDate);
      prev.setDate(currentDate.getDate() - 7);
      set({ currentDate: prev, weekDates: getWeekDates(prev) });
    },

    goToToday: () => {
      const today = new Date();
      set({ currentDate: today, weekDates: getWeekDates(today) });
    },

    goToDate: (date) => {
      set({ currentDate: date, weekDates: getWeekDates(date) });
    },

    loadTasks: async () => {
      const tasks = await fetchTasks();
      set({ tasks });
    },
  })
);
