import { cookies } from "next/headers";

type PropsParams = {
  idCourse: number;
};

export default async function GetAssignments({ idCourse }: PropsParams) {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  const res = await fetch(
    `${process.env.BASE_URL}/api/instructors/courses/${idCourse}/assignments`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        Cookie: `session=${session}`,
      },
    }
  );

  const data = await res.json();

  return data;
}
