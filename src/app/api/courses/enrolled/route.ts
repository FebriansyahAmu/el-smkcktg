import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";

const coursesDal = new CourseDAL();

export async function GET(request: NextRequest) {
  try {
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

    const studentsID = Number(session?.id_student ?? NaN);

    if (isNaN(studentsID)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid session data",
        },
        { status: 401 }
      );
    }

    const enrolledCourses = await coursesDal.getCourseEnrolled(studentsID);

    if (!enrolledCourses) {
      return NextResponse.json(
        {
          status: "error",
          message: "Anda belum memiliki kelas yang terdaftar",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        data: enrolledCourses,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("API error", err);

    return NextResponse.json(
      {
        status: "error",
        message:
          process.env.NODE_ENV === "production"
            ? "Internal server error"
            : (err as Error).message || "Unexpected error",
      },
      { status: 500 }
    );
  }
}
