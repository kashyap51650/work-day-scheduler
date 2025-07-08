import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getWeekDates } from "@/utils/date";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const weekDate = searchParams.get("week");

    let holidays = [];

    if (date) {
      // Only holidays for the specific date
      holidays = await db.holiday.findMany({ where: { date } });
    } else if (weekDate) {
      // getWeekDates expects a Date object
      const weekDates = getWeekDates(new Date(weekDate));
      holidays = await db.holiday.findMany({
        where: {
          date: { in: weekDates },
        },
      });
    } else {
      // No date param, return all holidays
      holidays = await db.holiday.findMany();
    }

    return NextResponse.json(holidays);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
