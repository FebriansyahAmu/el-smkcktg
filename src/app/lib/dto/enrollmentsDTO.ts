export interface getEnrollmentsDTO {
  id_enrollments: number;
  id_student: number;
  id_course: number;
  Enrollment_date: Date;
  completion_status: "Progress" | "Completed";
  completion_date: Date | null;
}
