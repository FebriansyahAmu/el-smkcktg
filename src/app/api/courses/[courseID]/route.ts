import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";

const courseDal = new CourseDAL();

export async function GET(
  request: NextRequest,
  { params }: { params: { courseID: number } }
) {
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

    const coursesByID = await courseDal.getCourseByID(Number(params.courseID));

    if (!coursesByID) {
      return NextResponse.json(
        {
          status: "not found",
          message: "course not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        data: coursesByID,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("API /api/courses/[idCourses] error:", err);

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
