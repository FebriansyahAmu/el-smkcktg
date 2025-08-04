import GuruCourseTabs from "@/app/components/guruPageComponents/detailCourseComponents/detailCourseComponents";
import { GetAssignments } from "@/app/services/getAssignments";
import { getEnrollToken } from "@/app/services/getEnrolledToken";

type IdCourseProps = {
  params: {
    id: number;
  };
};

export default async function CourseDetail({ params }: IdCourseProps) {
  const id_courses = params.id;

  const res = await GetAssignments({ idCourse: id_courses });
  const assignmentsArr = res?.data;

  const resToken = await getEnrollToken({ idCourse: id_courses });
  return (
    <GuruCourseTabs
      id_course={id_courses}
      assignments={assignmentsArr}
      enrollToken={resToken}
    />
  );
}
