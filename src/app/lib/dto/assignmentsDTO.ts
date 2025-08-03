export interface getAssignments {
  id_assigment: number;
  id_course: number;
  id_instructors: number;
  title: string;
  description: string;
  due_date: Date;
  tipe_tugas: string;
  file_url: string | null;
  created_at: Date | null;
}

export interface getDetailAssignments {
  id_assigment: number;
  title: string;
  description: string;
  due_date: Date;
  tipe_tugas: string;
  file_url: string | null;
  created_at: Date | null;
}

export type getAssignmentsSummaryDTO = Pick<
  getAssignments,
  "id_assigment" | "title" | "description" | "due_date" | "created_at"
>;
