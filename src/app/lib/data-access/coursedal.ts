import { PrismaClient, el_courses } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateCourseInput {
  Title: string;
  Descriotion: string;
  id_instructors: number;
}

export const createCourse = async (input: CreateCourseInput) => {
  return await prisma.el_courses.create({
    data: {
      Title: input.Title,
      Descriotion: input.Descriotion,
      id_instructors: input.id_instructors,
    },
  });
};
