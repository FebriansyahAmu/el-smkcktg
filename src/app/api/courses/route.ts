import { NextResponse, NextRequest } from "next/server";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";
import { getSession } from "@/app/lib/session";

const courseDal = new CourseDAL();

export async function GET(request: NextRequest) {
  try {
    //TODO: refactor this functions
    const session = await getSession(request);
    if (!session || session.role !== "Murid") {
      return NextResponse.json(
        {
          status: "error",
          message: "unauthenticated",
        },
        { status: 401 }
      );
    }

    const courses = await courseDal.getAllCourses();
    return NextResponse.json({ data: courses });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
