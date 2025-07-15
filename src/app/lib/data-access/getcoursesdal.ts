import { prisma } from "@/app/lib/prisma";
import { getCoursesDTO } from "../dto/courseDTO";

export class CourseDAL {
  async getAllCourses(id_instructors?: number): Promise<getCoursesDTO[]> {
    try {
      const courses = await prisma.el_courses.findMany({
        where: id_instructors ? { id_instructors } : {},
        select: {
          id_course: true,
          id_instructors: true,
          Title: true,
          Descriotion: true,
          created_at: true,
        },
      });
      return courses.map((data) => ({
        id_course: data.id_course,
        id_instructors: data.id_instructors,
        Title: data.Title,
        Description: data.Descriotion,
        created_at: data.created_at,
      }));
    } catch (err: any) {
      console.error("Error fetching coueses:", err);
      if (process.env.NODE_ENV === "production") {
        return [];
      } else {
        throw err;
      }
    }
  }

  async getCourseById(id_course: number) {
    if (!id_course) {
      throw new Error("invalid course ID");
    }

    const course = await prisma.el_courses.findUnique({
      where: { id_course },
    });

    return course;
  }

  async getCourseByInstructors(idcourse: number, id_instructor?: number) {
    if (!idcourse) {
      throw new Error("Invalid course ID");
    }

    const course = await prisma.el_courses.findUnique({
      where: {
        id_course: idcourse,
        id_instructors: id_instructor,
      },
    });

    if (!course) {
      throw new Error("course not found or not accessible");
    }

    return course;
  }

  async updateEnrollmentsToken(course_id: number, token: string) {
    if (!course_id || !token) {
      throw new Error("Course ID or token is required");
    }

    const updateCoursesToken = await prisma.el_courses.update({
      where: { id_course: course_id },
      data: { enrollments_token: token },
    });

    return updateCoursesToken;
  }
}
