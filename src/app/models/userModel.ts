import { PrismaClient, el_users } from "@prisma/client";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export interface CreatedUserData {
  nisn: string;
  name: string;
  email: string;
  password: string;
}

export const createUser = async (
  userData: CreatedUserData
): Promise<el_users | null> => {
  try {
    const userRole = "Murid";
    const isVerified = false;
    const existingUser = await prisma.el_users.findFirst({
      where: {
        OR: [{ Email: userData.email }, { NISN: userData.nisn.toString() }],
      },
    });

    if (existingUser) {
      throw new Error("Email atau NSIN sudah digunakan");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await prisma.el_users.create({
      data: {
        NISN: userData.nisn.toString(),
        FullName: userData.name,
        Email: userData.email,
        Password: hashedPassword,
        role: userRole,
        isVerified: isVerified,
      },
    });

    return newUser;
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Error handling untuk error spesifik dari Prisma (misal constraint violation)
      console.error("Prisma Error:", error.message);
    } else {
      // Error handling umum
      console.error("Error saat membuat user:", error.message);
    }
    return null;
  }
};
