import DashMurid from "@/app/components/muridPageComponents/dashMurid";
import { cookies } from "next/headers";

export default async function DashboardMurid() {
  const cookieStore = cookies();
  const sessio = cookieStore.get("session")?.value;

  return <DashMurid />;
}
