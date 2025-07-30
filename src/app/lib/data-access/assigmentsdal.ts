import { prisma } from "@/app/lib/prisma";

interface AssigmentsInput {
  id_course: number;
  id_instructors: number;
  title: string;
  description: string;
  due_date: Date;
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
        due_date: input.due_date,
      },
    });
  }
}
