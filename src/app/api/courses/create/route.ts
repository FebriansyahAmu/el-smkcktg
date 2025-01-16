import { NextResponse } from "next/server";
import { createCourse } from "@/app/lib/data-access/coursedal";
import { validateCreateCoureseIn } from "@/app/lib/validation/courseValidation";

export async function POST(request: Request) {
  const startTime = Date.now();
  try {
    const body = await request.json();

    await validateCreateCoureseIn(body);

    const newCourese = await createCourse(body);

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
