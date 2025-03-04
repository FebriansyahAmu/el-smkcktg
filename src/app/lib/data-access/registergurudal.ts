import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

interface registerGuruInput {
  name: string;
  email: string;
  password: string;
  konsentrasiKeahlian: string;
}

export const registerGuru = async (input: registerGuruInput) => {
  try {
    const userRole = "Guru";
    const isVerified = false;
    const existingUser = await prisma.el_users.findFirst({
      where: {
        OR: [{ Email: input.email }],
      },
    });

    if (existingUser) {
      throw new Error("Email sudah digunakan");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const registGuru = await prisma.el_users.create({
      data: {
        FullName: input.name,
        Email: input.email,
        Password: hashedPassword,
        role: userRole,
        isVerified: isVerified,
      },
    });

    const instructor = await prisma.el_instructors.create({
      data: {
        id_users: registGuru.id,
        FullName: input.name,
        Email: input.email,
        Expretise: input.konsentrasiKeahlian,
      },
    });

    return { user: registGuru, instructor };
  } catch (error: any) {
    console.log("Error saat registrasi guru:", error);
  }
};
