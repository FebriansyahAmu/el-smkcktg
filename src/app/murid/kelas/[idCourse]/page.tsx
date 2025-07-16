import { CoursesType } from "@/app/lib/types/courses";
import GetCoursByID from "@/app/components/muridCourses/getCourse";
import { cookies } from "next/headers";

type PropsParams = {
  params: {
    idCourse: number;
  };
};

export default async function CoursesByID({ params }: PropsParams) {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  const res = await fetch(
    `${process.env.BASE_URL}/api/courses/${params.idCourse}`,
    {
      cache: "no-cache",
      headers: {
        Cookie: `session=${session}`,
      },
    }
  );

  const coursebyID = await res.json();
  const course = coursebyID.data;
  console.log("response api", course);

  return <GetCoursByID courses={course} />;
}
