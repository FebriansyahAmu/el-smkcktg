import { SigninFormSchema } from "@/app/lib/definitions";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function signin(values: { email: string; password: string }) {
  let validateFields;

  try {
    // Validasi menggunakan schema
    validateFields = SigninFormSchema.validateSync(values, {
      abortEarly: false,
    });
  } catch (error) {
    if (error instanceof SigninFormSchema.ValidationError) {
      const errors = error.inner.reduce((acc, curr) => {
        if (curr.path) acc[curr.path] = curr.message; // Perbaiki logika di sini
        return acc;
      }, {} as Record<string, string>);

      return { errors };
    }
    return {
      errors: {
        form: "Terjadi kesalahan saat memproses form silahkan coba lagi nanti",
      },
    };
  }

  const { email, password } = validateFields;
  const user = await prisma.el_users.findUnique({
    where: {
      Email: email,
    },
  });

  // Validasi user dan password
  if (!user || !(await bcrypt.compare(password, user.Password))) {
    return {
      errors: {
        email: "Email atau kata sandi salah",
      },
    };
  }

  // Mengembalikan respons yang menunjukkan berhasil login
  return NextResponse.redirect(new URL("/dashboard", window.location.origin));
}
