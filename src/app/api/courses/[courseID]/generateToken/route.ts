import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";
import { generateToken } from "@/app/lib/generateEnrollmentsToken";

const courseDal = new CourseDAL();

export async function POST(
  request: NextRequest,
  { params }: { params: { courseID: number } }
) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== "Guru") {
      return NextResponse.json(
        {
          status: "error",
          message: "unauthenticed",
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

    //check validity kepunyaan courses
    const checkValidityCourse = await courseDal.getCourseByInstructors(
      Number(params.courseID),
      id_instructor
    );

    if (!checkValidityCourse) {
      return NextResponse.json(
        {
          status: "error",
          message: "course not found or not accessible",
        },
        { status: 400 }
      );
    }

    const newToken = generateToken();

    //update enrolments_token di database
    await courseDal.updateEnrollmentsToken(Number(params.courseID), newToken);

    return NextResponse.json({ message: "Token created", token: newToken });
  } catch (err: any) {
    console.error("Generate token error", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
