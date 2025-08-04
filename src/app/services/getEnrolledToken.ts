import { cookies } from "next/headers";

type PropsParams = {
  idCourse: number;
};

export async function getEnrollToken({ idCourse }: PropsParams) {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  const res = await fetch(
    `${process.env.BASE_URL}/api/instructors/courses/${idCourse}/token`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        Cookie: `session=${session}`,
      },
    }
  );

  const data = await res.json();

  const enrollments_token = data?.data?.enrollments_token;

  return enrollments_token;
}
