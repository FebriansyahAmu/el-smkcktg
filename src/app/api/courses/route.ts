import { NextResponse, NextRequest } from "next/server";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";

const courseDal = new CourseDAL();

export async function GET(request: NextRequest) {
  try {
    const courses = await courseDal.getAllCourses();
    return NextResponse.json({ data: courses });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
