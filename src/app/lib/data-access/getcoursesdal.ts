import { prisma } from "@/app/lib/prisma";
import { getCoursesDTO } from "../dto/courseDTO";
import { EnrollmentsDAL } from "./enrollmentsdal";

const enrollemnts = new EnrollmentsDAL();

export class CourseDAL {
  async getAllCourses(): Promise<getCoursesDTO[]> {
    try {
      const courses = await prisma.el_courses.findMany({
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

  async getCourseByID(id_courses: number): Promise<getCoursesDTO[]> {
    try {
      const courses = await prisma.el_courses.findUnique({
        where: {
          id_course: id_courses,
        },
        select: {
          id_course: true,
          id_instructors: true,
          Title: true,
          Descriotion: true,
          created_at: true,
        },
      });

      if (!courses) return [];

      return [
        {
          id_course: courses.id_course,
          id_instructors: courses.id_instructors,
          Title: courses.Title,
          Description: courses.Descriotion,
          created_at: courses.created_at,
        },
      ];
    } catch (err: any) {
      console.error("Error fetching courses", err);
      if (process.env.NODE_ENV === "production") {
        return [];
      } else {
        throw err;
      }
    }
  }

  async getValidCourses(id_course: number) {
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

  async getAllDataCourseIns(id_instructors?: number): Promise<getCoursesDTO[]> {
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
      console.error("Error fetching courses", err);
      if (process.env.NODE_ENV === "production") {
        return [];
      } else {
        throw err;
      }
    }
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

  async checkEnrollmentsToken(course_id: number, token: string) {
    if (!course_id || !token) {
      throw new Error("Course Id or token is invalid");
    }
    try {
      const checkToken = await prisma.el_courses.findFirst({
        where: {
          id_course: course_id,
          enrollments_token: token,
        },
      });

      if (!checkToken) {
        throw new Error("Invalid Enrollments Token");
      }

      return checkToken;
    } catch (err: any) {
      throw new Error(err.message || "Failed to check tokens");
    }
  }

  async getCourseEnrolled(student_Id: number): Promise<getCoursesDTO[]> {
    if (!student_Id) {
      throw new Error("Invalid Student ID");
    }

    const checkEnrollments = await enrollemnts.checkAllEnrolledClass(
      student_Id
    );

    if (!checkEnrollments) {
      throw new Error("Data tidak ditemukan"); 
    }
    try {
      const courses = await prisma.el_enrollments.findMany({
        where: {
          id_student: student_Id,
        },
        select: {
          el_courses: {
            select: {
              id_course: true,
              id_instructors: true,
              Title: true,
              Descriotion: true,
              created_at: true,
            },
          },
        },
      });

      return courses.map((data) => ({
        id_course: data.el_courses.id_course,
        id_instructors: data.el_courses.id_instructors,
        Title: data.el_courses.Title,
        Description: data.el_courses.Descriotion,
        created_at: data.el_courses.created_at,
      }));
    } catch (err: unknown) {
      console.error("Error fetching data", err);
      if (process.env.NODE_ENV === "production") {
        return [];
      } else {
        throw err;
      }
    }
  }
}
