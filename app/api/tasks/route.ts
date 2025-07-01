// app/api/tasks/route.ts
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { addDays, format, getWeek, parseISO } from "date-fns";
import { getWeekDates } from "@/utils/date";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const weekStart = searchParams.get("weekStart");

    let tasks = [];

    if (date) {
      tasks = await db.task.findMany({ where: { date } });
    } else if (weekStart) {
      const startDate = parseISO(weekStart);
      const weekDates = getWeekDates(startDate);
      tasks = await db.task.findMany({
        where: { date: { in: weekDates } },
      });
    } else {
      tasks = await db.task.findMany();
    }

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
