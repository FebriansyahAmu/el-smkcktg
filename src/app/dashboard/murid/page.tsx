import DashMurid from "@/app/components/muridPageComponents/dashMurid";
import { cookies } from "next/headers";

export default async function DashboardMurid() {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  const res = await fetch(`${process.env.BASE_URL}/api/courses/enrolled`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      Cookie: `session=${session}`,
    },
  });

  const getEnrollCourses = await res.json();
  const enrolled = getEnrollCourses.data;

  return <DashMurid courses={enrolled} />;
}
