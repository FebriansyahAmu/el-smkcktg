import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import { validateAssigmentInput } from "@/app/lib/validation/assigmentsValidation";
import { AssigmentsDAL } from "@/app/lib/data-access/assigmentsdal";
import { CourseDAL } from "@/app/lib/data-access/getcoursesdal";
import { ValidationError } from "yup";

const assigmentsdal = new AssigmentsDAL();
const coursedal = new CourseDAL();

export async function POST(request: NextRequest) {
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

    const body = await request.json();

    // TODO:validasi kursus dan validasi id instructors disini

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
      Number(body.id_course),
      insturctorsID
    );

    if (!checkValidityCourse) {
      return NextResponse.json(
        {
          status: "error",
          message: "Instruktur tidak sesuai",
        },
        { status: 400 }
      );
    }

    const { date, time, title, description, file_url, tipe_tugas } = body;

    const due_date = new Date(`${date}T${time}`);
    const data = {
      id_instructors: insturctorsID,
      title,
      description,
      file_url,
      tipe_tugas,
      due_date,
      id_course: Number(body.id_course),
    };

    //validate input
    await validateAssigmentInput(data);

    //fire up!!
    const inputAssigment = await assigmentsdal.createAssigments(data);
    if (!inputAssigment) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Terjadi kesalahan saat input data, silahkan coba lagi nanti",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Tugas baru berhasil dibuat",
      },
      {
        status: 201,
      }
    );
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      const formattedErrors = err.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));

      return NextResponse.json(
        {
          status: "error",
          message: "Validasi gagal",
          errors: formattedErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Terjadi kesalahan, silahkan coba lagi nanti",
      },
      { status: 500 }
    );
  }
}
