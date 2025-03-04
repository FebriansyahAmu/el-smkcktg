import { NextResponse, NextRequest } from "next/server";
import { getSession, decrypt } from "@/app/lib/session";
import { createCourse } from "@/app/lib/data-access/coursedal";
import { validateCreateCoureseIn } from "@/app/lib/validation/courseValidation";

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    const session = await getSession(request);
    if (!session || session.role !== "Guru") {
      return NextResponse.json(
        {
          status: "error",
          message: "Anda tidak memiliki otorisasi.",
        },
        { status: 401 }
      );
    }
    console.log(session.userId);

    const body = await request.json();

    const inputData = {
      ...body,
      id_instructors: session.id_instructor,
    };

    await validateCreateCoureseIn(body);

    const newCourese = await createCourse(inputData);

    return NextResponse.json(
      {
        status: "success",
        message: "Kelas berhasil dibuat.",
        data: {
          title: newCourese.Title,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name == "ValidationError") {
      return NextResponse.json(
        {
          status: "error",
          message: "Validasi gagal.",
          error: error.inner.map((err: any) => ({
            field: err.path,
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Terjadi kesalahan",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
