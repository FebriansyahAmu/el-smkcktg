import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { AssigmentsDAL } from "@/app/lib/data-access/assigmentsdal";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";

const assignmentsdal = new AssigmentsDAL();
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

    const insturctorsID = Number(session?.id_instructor ?? NaN);
    if (isNaN(insturctorsID)) {
      return NextResponse.json(
        {
          status: "error",
          message: "invalid session data",
        },
        { status: 401 }
      );
    }

    const checkValidityCourse = await coursedal.getCourseByInstructors(
      Number(params.idCourse),
      insturctorsID
    );
    if (!checkValidityCourse) {
      return NextResponse.json(
        {
          status: "error",
          message: "instruktur tidak sesuai dengan course ini",
        },
        { status: 401 }
      );
    }

    const getAssignments =
      await assignmentsdal.getAssignmentsSummaryByInstructors(
        Number(params.idCourse),
        insturctorsID
      );

    if (!getAssignments) {
      return NextResponse.json(
        {
          status: "error",
          message: "terjadi kesalahan, data tidak sesuai",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        data: getAssignments,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Error get api .. /[idcourse]/assignments", err);
    return NextResponse.json(
      {
        status: "error",
        message:
          process.env.NODE_ENV === "production"
            ? "Internal server Error"
            : err instanceof Error
            ? err.message
            : "Unknown error occured",
      },
      { status: 500 }
    );
  }
}
