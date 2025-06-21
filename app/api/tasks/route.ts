// app/api/tasks/route.ts
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const tasks = await db.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
  }
}
