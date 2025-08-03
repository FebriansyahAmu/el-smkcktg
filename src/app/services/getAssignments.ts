import { cookies } from "next/headers";

type PropsParams = {
  idCourse: number;
};

type AssigmnetsDetail = {
  idAssigment: number;
};

export async function GetAssignments({ idCourse }: PropsParams) {
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

  if (!res.ok) {
    throw new Error("Failed to fetching data");
  }

  const data = await res.json();

  return data;
}

export async function GetAssignmentsDetails({ idAssigment }: AssigmnetsDetail) {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  const res = await fetch(
    `${process.env.BASE_URL}/api/instructors/courses/assigments/${idAssigment}`,
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
