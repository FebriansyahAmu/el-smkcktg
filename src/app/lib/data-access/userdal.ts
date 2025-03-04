import { PrismaClient, el_users } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function findUserByEmail(email: string) {
  return prisma.el_users.findUnique({
    where: {
      Email: email,
    },
  });
}

export async function getInstructorsId(id: number) {
  return prisma.el_instructors.findFirst({
    where: {
      id_users: id,
    },
  });
}

export async function validateUserPassword(
  plainPassword: string,
  hashedPassword: string
) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
