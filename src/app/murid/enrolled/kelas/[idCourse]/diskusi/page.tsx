import MuridPageDiscussion from "@/app/components/muridPageComponents/muridPageDiscus";
import { cookies } from "next/headers";

type PropsParams = {
  params: {
    idCourse: number;
  };
};

export default async function Discussion({ params }: PropsParams) {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  return <MuridPageDiscussion />;
}
