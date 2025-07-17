import { NextResponse } from "next/server";
import { SigninFormSchema, SessionPayload } from "@/app/lib/definitions";
import {
  findUserByEmail,
  validateUserPassword,
  getInstructorsId,
} from "@/app/lib/data-access/userdal";
import { createSession } from "@/app/lib/session";
import { ValidationError } from "yup";
import { StudentsDAL } from "@/app/lib/data-access/studentsdal";

const students = new StudentsDAL();

export async function POST(request: Request) {
  const { email, password } = await request.json();
  let validateFields;

  try {
    // Validate using schema
    validateFields = SigninFormSchema.validateSync(
      { email, password },
      { abortEarly: false }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors = error.inner.reduce((acc, curr) => {
        if (curr.path) acc[curr.path] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      return NextResponse.json({ errors }, { status: 400 });
    }
    return NextResponse.json(
      {
        errors: {
          form: "Terjadi kesalahan saat memproses form, silahkan coba lagi nanti",
        },
      },
      { status: 500 }
    );
  }

  const user = await findUserByEmail(email);

  if (!user || !(await validateUserPassword(password, user.Password))) {
    return NextResponse.json(
      { errors: { email: "Email atau password salah" } },
      { status: 401 }
    );
  }

  const instructorsId = await getInstructorsId(user.id);
  const studentsId = await students.getStundentsID(user.id);

  const sessionPayload: SessionPayload = {
    userId: user.id,
    fullname: user.FullName,
    role: user.role,
    ...(user.role === "Guru" && {
      id_instructor: instructorsId?.id_insctructors,
    }),
    ...(user.role === "Murid" &&
      studentsId?.id_student && {
        id_student: studentsId.id_student,
      }),
  };

  await createSession(sessionPayload);

  // Mengembalikan respons yang menunjukkan berhasil login
  return NextResponse.json({
    success: true,
    redirectUrl: `/dashboard/${user.role.toLowerCase()}`,
  });
}
