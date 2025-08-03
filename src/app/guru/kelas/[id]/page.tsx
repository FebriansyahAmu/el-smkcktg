import GuruCourseTabs from "@/app/components/guruPageComponents/detailCourseComponents/detailCourseComponents";
import { GetAssignments } from "@/app/services/getAssignments";

type IdCourseProps = {
  params: {
    id: number;
  };
};

export default async function CourseDetail({ params }: IdCourseProps) {
  const id_courses = params.id;

  const res = await GetAssignments({ idCourse: id_courses });

  const assignmentsArr = res?.data;
  return <GuruCourseTabs id_course={id_courses} assignments={assignmentsArr} />;
}
