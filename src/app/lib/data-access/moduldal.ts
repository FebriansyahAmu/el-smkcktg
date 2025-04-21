import { prisma } from "@/app/lib/prisma";
import { getModulDTO } from "../dto/modulDTO";

interface CreateModulInput {
  id_course: number;
  title: string;
  description: string;
}

export class ModulsDAL {
  async createModul(input: CreateModulInput) {
    return await prisma.el_modules.create({
      data: {
        id_course: input.id_course,
        title: input.title,
        description: input.description,
      },
    });
  }
}
