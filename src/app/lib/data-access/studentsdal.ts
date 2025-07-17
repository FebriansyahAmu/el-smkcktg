import { prisma } from "@/app/lib/prisma";
import { getStutendsDTO } from "../dto/studentsDTO";

interface studentsData {
  user_id: number;
}

export class StudentsDAL {
  async inputStudentData(id_user: number) {
    try {
      if (!id_user) {
        throw new Error("Invalid User id");
      }

      return await prisma.el_students.create({
        data: {
          user_id: id_user,
        },
      });
    } catch (err) {
      console.error("Internal Server Error");
    }
  }

  async getStundentsID(id_user: number) {
    if (!id_user) {
      throw new Error("invalid user id");
    }

    const studentsData = await prisma.el_students.findFirst({
      where: {
        user_id: id_user,
      },
    });

    return studentsData;
  }
}
