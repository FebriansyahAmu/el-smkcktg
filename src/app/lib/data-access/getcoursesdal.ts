import { prisma } from "@/app/lib/prisma";
import { getCoursesDTO } from "../dto/courseDTO";

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
        throw new Error("Failed to fetch courses");
      }
    }
  }
}
