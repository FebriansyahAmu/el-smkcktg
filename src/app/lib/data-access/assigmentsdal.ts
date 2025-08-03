import { prisma } from "@/app/lib/prisma";
import {
  getAssignmentsSummaryDTO,
  getDetailAssignments,
} from "../dto/assignmentsDTO";

interface AssigmentsInput {
  id_course: number;
  id_instructors: number;
  title: string;
  description: string;
  due_date: Date;
  tipe_tugas: "Individu" | "Kelompok";
  file_url: string | null;
}

export class AssigmentsDAL {
  async createAssigments(input: AssigmentsInput) {
    return await prisma.el_assigments.create({
      data: {
        id_course: input.id_course,
        id_instructors: input.id_instructors,
        title: input.title,
        description: input.description,
        file_url: input.file_url,
        due_date: input.due_date,
        tipe_tugas: input.tipe_tugas,
      },
    });
  }

  async isAssignmentsOwnedByInstructors(
    assignmentsId: number,
    id_instructor: number
  ) {
    if (!assignmentsId || !id_instructor) return false;

    const assignments = await prisma.el_assigments.findFirst({
      where: {
        id_assigment: assignmentsId,
        id_instructors: id_instructor,
      },
      select: {
        id_assigment: true,
      },
    });

    return !!assignments;
  }

  async getAssignmentsSummaryByInstructors(
    idCourse: number,
    id_instructor: number
  ): Promise<getAssignmentsSummaryDTO[]> {
    try {
      const assignments = await prisma.el_assigments.findMany({
        where: {
          id_course: idCourse,
          id_instructors: id_instructor,
        },
        select: {
          id_assigment: true,
          title: true,
          description: true,
          due_date: true,
          created_at: true,
        },
      });

      return assignments.map((data) => ({
        id_assigment: data.id_assigment,
        title: data.title,
        description: data.description,
        due_date: data.due_date,
        created_at: data.created_at,
      }));
    } catch (err: unknown) {
      console.error("Error get data", err);
      if (process.env.NODE_ENV === "production") {
        return [];
      } else {
        throw err;
      }
    }
  }

  async getAssignmentsDetail(
    idAssigment: number,
    id_instructor: number
  ): Promise<getDetailAssignments | null> {
    try {
      const assignmentsDetail = await prisma.el_assigments.findFirst({
        where: {
          id_assigment: idAssigment,
          id_instructors: id_instructor,
        },
        select: {
          id_assigment: true,
          title: true,
          description: true,
          due_date: true,
          tipe_tugas: true,
          file_url: true,
          created_at: true,
        },
      });

      return assignmentsDetail;
    } catch (err: unknown) {
      console.error("error get data", err);
      if (process.env.NODE_ENV === "production") {
        return null;
      } else {
        throw err;
      }
    }
  }
}
