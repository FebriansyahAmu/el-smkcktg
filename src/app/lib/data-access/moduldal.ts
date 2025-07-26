import { prisma } from "@/app/lib/prisma";
import { getModulDTO } from "../dto/modulDTO";
import { getModulSectionsDTO } from "../dto/modulSectionsDTO";

interface CreateModulInput {
  id_course: number;
  title: string;
  description: string;
}

interface EditModulContents {
  id_section: null;
  id_modules: number;
  parent_id: number;
  title: string;
  order: number;
  content: string;
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

  async editModulesContents(input: EditModulContents) {
    if (input.id_section) {
      // Jika id_section disediakan, lakukan update pada record yang sesuai
      return prisma.el_module_sections.update({
        where: { id_section: input.id_section },
        data: {
          title: input.title,
          content: input.content,
          order: input.order,
          parent_id: input.parent_id,
        },
      });
    } else {
      // Jika tidak ada id_section, buat section/sub-section baru
      return prisma.el_module_sections.create({
        data: {
          id_module: input.id_modules,
          parent_id: input.parent_id,
          title: input.title,
          content: input.content,
          order: input.order,
          created_at: new Date(),
        },
      });
    }
  }

  async getModulSections(id_module?: number): Promise<getModulSectionsDTO[]> {
    try {
      const modulSections = await prisma.el_module_sections.findMany({
        where: id_module ? { id_module } : {},
        select: {
          id_section: true,
          id_module: true,
          parent_id: true,
          title: true,
          order: true,
          content: true,
          created_at: true,
        },
      });

      return modulSections.map((data) => ({
        id_section: data.id_section,
        id_module: data.id_module,
        parent_id: data.parent_id,
        title: data.title,
        content: data.content,
        order: data.order,
        created_at: data.created_at,
      }));
    } catch (err: any) {
      console.error("Error fetching modules sections", err);
      if (process.env.NODE_ENV === "production") {
        return [];
      } else {
        throw err;
      }
    }
  }

  async getModulByID(
    id_course?: number,
    id_modules?: number
  ): Promise<getModulDTO | null> {
    try {
      const modul = await prisma.el_modules.findFirst({
        where: {
          ...(id_modules && { id_modules }),
          ...(id_course && { id_course }),
        },
        select: {
          id_course: true,
          id_modules: true,
          title: true,
          description: true,
          created_at: true,
        },
      });

      return modul
        ? {
            id_course: modul.id_course,
            id_modules: modul.id_modules,
            title: modul.title,
            description: modul.description,
            created_at: modul.created_at,
          }
        : null;
    } catch (err: unknown) {
      console.error("Error fetching courses", err);
      if (process.env.NODE_ENV === "production") {
        return null;
      } else {
        throw err;
      }
    }
  }
}
