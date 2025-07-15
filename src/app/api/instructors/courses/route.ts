import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";

const courseDal = new CourseDAL();

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== "Guru") {
      return NextResponse.json(
        {
          status: "error",
          message: "unauthenticated",
        },
        { status: 401 }
      );
    }

    const id_instructor = Number(session?.id_instructor ?? NaN);
    if (isNaN(id_instructor)) {
      return NextResponse.json(
        {
          status: "error",
          message: "invalid session data",
        },
        { status: 401 }
      );
    }

    const courses = await courseDal.getAllDataCourseIns(id_instructor);
    return NextResponse.json({ data: courses });
  } catch (err: any) {
    console.error("getting courses error, ", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal Server error",
      },
      { status: 500 }
    );
  }
}
