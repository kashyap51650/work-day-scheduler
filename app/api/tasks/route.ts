// app/api/tasks/route.ts
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const task = await db.task.create({
      data: {
        title: body.title,
        date: body.date,
        startTime: body.startTime,
        endTime: body.endTime,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const tasks = await db.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
  }
}
