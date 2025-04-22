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

  async getModul(id_course?: number): Promise<getModulDTO[]> {
    try {
      const modul = await prisma.el_modules.findMany({
        where: id_course ? { id_course } : {},
        select: {
          id_course: true,
          id_modules: true,
          title: true,
          description: true,
          created_at: true,
        },
      });
      return modul.map((data) => ({
        id_course: data.id_course,
        id_modules: data.id_modules,
        title: data.title,
        description: data.description,
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
}
