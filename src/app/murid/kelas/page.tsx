import { CoursesType } from "@/app/lib/types/courses";
import GetAllCourses from "@/app/components/muridCourses/getAllCourses";
import { cookies } from "next/headers";

export default async function Courses() {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  const res = await fetch(`${process.env.BASE_URL}/api/courses`, {
    cache: "no-cache",
    headers: {
      Cookie: `session=${session}`,
    },
  });
  const course = await res.json();
  console.log("response api", course);
  const courses: CoursesType[] = course.data;

  return <GetAllCourses courses={courses} />;
}
