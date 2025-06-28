// app/api/tasks/route.ts
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { addDays, format, parseISO } from "date-fns";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    console.log("-------------------------------------------");
    const date = searchParams.get("date");
    const weekStart = searchParams.get("weekStart");

    let tasks = [];

    if (date) {
      tasks = await db.task.findMany({ where: { date } });
    } else if (weekStart) {
      const startDate = parseISO(weekStart);
      const weekDates = Array.from({ length: 7 }, (_, i) =>
        format(addDays(startDate, i), "yyyy-MM-dd")
      );
      tasks = await db.task.findMany({
        where: { date: { in: weekDates } },
      });
    } else {
      tasks = await db.task.findMany();
    }

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("[TASK_GET_ERROR] 30 --------", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
