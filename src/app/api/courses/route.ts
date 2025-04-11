import { NextResponse, NextRequest } from "next/server";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";
import { getSession } from "@/app/lib/session";

const courseDal = new CourseDAL();

interface instructor {
  id_instructors: number;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== "Guru") {
      return NextResponse.json(
        {
          status: "error",
          message: "Anda tidak memiliki otorisasi",
        },
        { status: 401 }
      );
    }

    const id_instructor = session?.id_instructors
      ? Number(session.id_instructors)
      : undefined;

    const courses = await courseDal.getAllCourses(id_instructor);
    return NextResponse.json({ data: courses });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
