import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { ModulsDAL } from "@/app/lib/data-access/moduldal";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";

const coursedal = new CourseDAL();
const moduldal = new ModulsDAL();

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== "Guru") {
      return NextResponse.json(
        {
          status: "error",
          message: "unauthorization",
        },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const id_course = searchParams.get("courses");

    const course = await coursedal.getCourseById(Number(id_course));
    if (!course || course.id_instructors !== session.id_instructor) {
      return NextResponse.json(
        {
          status: "error",
          message: "Access denied",
        },
        { status: 403 }
      );
    }

    const moduls = await moduldal.getModul(Number(id_course));
    return NextResponse.json({
      status: "success",
      data: moduls,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}
