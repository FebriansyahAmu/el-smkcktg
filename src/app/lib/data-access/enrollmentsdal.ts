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

  async checkAllEnrolledClass(studentID: number): Promise<getEnrollmentsDTO[]> {
    if (!studentID) {
      throw new Error("Invalid StudentID");
    }

    try {
      const enrollData = await prisma.el_enrollments.findMany({
        select: {
          id_enrollments: true,
          id_course: true,
          id_student: true,
          Enrollment_date: true,
          completion_status: true,
          completion_date: true,
        },
      });

      return enrollData.map((data) => ({
        id_enrollments: data.id_enrollments,
        id_course: data.id_course,
        id_student: data.id_student,
        Enrollment_date: data.Enrollment_date,
        completion_status: data.completion_status,
        completion_date: data.completion_date,
      }));
    } catch (err: unknown) {
      console.error("Error fetching enroll data:", err);
      if (process.env.NODE_ENV === "production") {
        return [];
      } else {
        throw err;
      }
    }
  }
}
