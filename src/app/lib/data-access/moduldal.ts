import { prisma } from "@/app/lib/prisma";

interface CreateModulInput {
  id_course: number;
  title: string;
  description: string;
}

export const createCourse = async (input: CreateModulInput) => {
  return await prisma.el_modules.create({
    data: {
      id_course: input.id_course,
      title: input.title,
      description: input.description,
    },
  });
};
