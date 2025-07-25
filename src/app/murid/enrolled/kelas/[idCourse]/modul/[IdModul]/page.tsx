import MuridPageReadModul from "@/app/components/muridPageComponents/muridPageReadModul";
import { cookies } from "next/headers";

export default async function MuridReadPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  return <MuridPageReadModul />;
}
