import { NextResponse } from "next/server";
import { createUser, CreatedUserData } from "../../models/userModel";

export async function POST(request: Request) {
  try {
    const body: CreatedUserData = await request.json();

    if (!body.nisn || !body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }
    const newUser = await createUser(body);
    if (!newUser) {
      return NextResponse.json(
        { error: "Gagal mendaftarkan user, email atau NISN sudah terdaftar" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Registrasi akun berhasil" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses data" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {}
