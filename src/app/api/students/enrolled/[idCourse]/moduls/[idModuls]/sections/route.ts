import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { ModulsDAL } from "@/app/lib/data-access/moduldal";
import { EnrollmentsDAL } from "@/app/lib/data-access/enrollmentsdal";

const moduldal = new ModulsDAL();
const enrolldal = new EnrollmentsDAL();

export async function GET(
  request: NextRequest,
  { params }: { params: { idCourse: number; idModuls: number } }
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

    const studentID = Number(session?.id_student ?? NaN);
    if (isNaN(studentID)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid session data",
        },
        { status: 401 }
      );
    }

    const isEnrolled = await enrolldal.checkEnrollmentsByUser(
      Number(params.idCourse),
      studentID
    );

    if (!isEnrolled) {
      return NextResponse.json(
        {
          status: "error",
          message: "Anda belum terdaftar di kelas",
        },
        { status: 400 }
      );
    }

    const data = await moduldal.getModulSections(Number(params.idModuls));

    if (!data) {
      return NextResponse.json(
        {
          status: "error",
          message: "Terjadi kesalahan dalam pengambilan data",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        data: data,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Get modul sections api error", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
