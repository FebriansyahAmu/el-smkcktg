import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";

const coursedal = new CourseDAL();

export async function GET(
  request: NextRequest,
  { params }: { params: { idCourse: number } }
) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== "Guru") {
      return NextResponse.json(
        {
          status: "error",
          message: "unauthenticate",
        },
        { status: 401 }
      );
    }

    const instructorsID = Number(session?.id_instructor ?? NaN);
    if (isNaN(instructorsID)) {
      return NextResponse.json(
        {
          status: "error",
          message: "invalid session data",
        },
        { status: 401 }
      );
    }

    const isCourses = await coursedal.isCourseOwnedByInstructors(
      Number(params.idCourse),
      instructorsID
    );

    if (!isCourses) {
      return NextResponse.json(
        {
          status: "error",
          message: "kelas tidak ditemukan",
        },
        { status: 404 }
      );
    }

    const enrollToken = await coursedal.getEnrolledTokens(
      Number(params.idCourse),
      instructorsID
    );
    if (!enrollToken) {
      return NextResponse.json(
        {
          status: "not found",
          message: "token belum dibuat",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        data: enrollToken,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Error get api", err);
    return NextResponse.json(
      {
        status: "error",
        message:
          process.env.NODE_ENV === "production"
            ? "Internal server error"
            : err instanceof Error
            ? err.message
            : "Unknown error occured",
      },
      {
        status: 500,
      }
    );
  }
}
