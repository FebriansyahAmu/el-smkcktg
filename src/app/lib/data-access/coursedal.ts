import { prisma } from "@/app/lib/prisma";

interface CreateCourseInput {
  title: string;
  description: string;
  id_instructors: number;
}

export const createCourse = async (input: CreateCourseInput) => {
  return await prisma.el_courses.create({
    data: {
      Title: input.title,
      Descriotion: input.description,
      id_instructors: input.id_instructors,
    },
  });
};
