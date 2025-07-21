import MuridCoursesDash from "@/app/components/muridCourses/coursesDash/muridCourseDash";
import { cookies } from "next/headers";

type PropsParams = {
  params: {
    idCourse: number;
  };
};

export default async function EnrolledCourses({ params }: PropsParams) {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  return <MuridCoursesDash />;
}
