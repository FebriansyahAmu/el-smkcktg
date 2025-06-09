import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { ModulsDAL } from "@/app/lib/data-access/moduldal";
import { validateModulContent } from "@/app/lib/validation/modulContentValidation";

const modulDal = new ModulsDAL();

export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== "Guru") {
      return NextResponse.json(
        {
          status: "error",
          message: "Anda tidak memiliki otoritasasi",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    try {
      await validateModulContent(body);
    } catch (ValidationError: any) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validasi gagal",
          errors: ValidationError.errors,
        },
        { status: 400 }
      );
    }

    await modulDal.editModulesContents(body);

    return NextResponse.json(
      {
        status: "success",
        message: "Content berhasil dibuat",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("api error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 }
    );
  }
}
