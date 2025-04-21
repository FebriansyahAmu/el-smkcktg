import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { ModulsDAL } from "@/app/lib/data-access/moduldal";
import { validateModulInput } from "@/app/lib/validation/modulValidation";
import { ValidationError } from "yup";

const modulDal = new ModulsDAL();

export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session || session.role != "Guru") {
      return NextResponse.json(
        {
          status: "error",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    //validasi input
    await validateModulInput(body);

    //fire up! get sucked into dtabase
    await modulDal.createModul(body);

    return NextResponse.json(
      {
        status: "success",
        message: "Kelas berhasil dibuat.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof ValidationError) {
      const formattedErrors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));

      return NextResponse.json(
        {
          status: "gagal",
          errors: formattedErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Terjadi kesalahan pada server, silahkan coba lagi nanti",
      },
      { status: 500 }
    );
  }
}
