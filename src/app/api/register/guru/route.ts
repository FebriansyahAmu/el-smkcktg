import { NextResponse, NextRequest } from "next/server";
import { validationRegisterGuru } from "@/app/lib/validation/registerGuruValidations";
import { registerGuru } from "@/app/lib/data-access/registergurudal";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await validationRegisterGuru(body);
    await registerGuru(body);

    return NextResponse.json(
      {
        status: "success",
        message: "Akun berhasil dibuat",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: "Terjadi kesalahan",
        errror: error.message,
      },
      { status: 500 }
    );
  }
}
