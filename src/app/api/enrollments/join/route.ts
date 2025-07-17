import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";
import { EnrollmentsDAL } from "@/app/lib/data-access/enrollmentsdal";

const courseDal = new CourseDAL();
const enrollDal = new EnrollmentsDAL();

interface inputData {
  id_course: number;
  id_student: number;
  completion_status: "Progress" | "Completed";
}

export async function POST(request: NextRequest) {
  try {
    const { courseID, enrollToken } = await request.json();

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

    const studentId = Number(session?.id_student ?? NaN);
    if (isNaN(studentId)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid session data",
        },
        { status: 401 }
      );
    }

    const checkToken = await courseDal.checkEnrollmentsToken(
      Number(courseID),
      enrollToken
    );

    if (!checkToken) {
      return NextResponse.json(
        {
          status: "error",
          message: "course or token not found",
        },
        { status: 404 }
      );
    }

    const isUserAlreadyEnroll = await enrollDal.checkEnrollmentsByUser(
      Number(courseID),
      studentId
    );

    if (isUserAlreadyEnroll) {
      return NextResponse.json(
        {
          status: "error",
          message: "User already enrolled on this class",
        },
        { status: 400 }
      );
    }

    const data: inputData = {
      id_course: courseID,
      id_student: studentId,
      completion_status: "Progress",
    };

    const enrollClass = await enrollDal.enrollClass(data);
    if (!enrollClass) {
      return NextResponse.json(
        {
          status: "error",
          message: "Terjadi Kesalahan saat enroll kelas",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Enroll class successfully",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Enroll api error", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
