import { prisma } from "@/app/lib/prisma";
import { getEnrollmentsDTO } from "@/app/lib/dto/enrollmentsDTO";

interface enrollClass {
  id_student: number;
  id_course: number;
  completion_status: "Progress" | "Completed";
}

export class EnrollmentsDAL {
  async checkEnrollmentsByUser(idCourse: number, idStudent: number) {
    try {
      if (!idCourse || !idStudent || isNaN(idCourse) || isNaN(idStudent)) {
        throw new Error("Invalid Id course or student id");
      }

      const enrollments = await prisma.el_enrollments.findFirst({
        where: {
          id_course: idCourse,
          id_student: idStudent,
        },
      });

      return enrollments;
    } catch (err) {
      throw new Error("Failed to check enrollments");
    }
  }

  async enrollClass(input: enrollClass) {
    return await prisma.el_enrollments.create({
      data: {
        id_course: input.id_course,
        id_student: input.id_student,
        completion_status: input.completion_status,
      },
    });
  }
}
