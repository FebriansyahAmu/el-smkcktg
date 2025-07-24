import MuridPageModul from "@/app/components/muridPageComponents/muridPageModul";
import { cookies } from "next/headers";

type PropsParams = {
  params: {
    idCourse: number;
  };
};

export default async function MuridModulPage({ params }: PropsParams) {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  const res = await fetch(
    `${process.env.BASE_URL}/api/students/enrolled/${params.idCourse}/moduls`,
    {
      cache: "no-cache",
      headers: {
        Cookie: `session=${session}`,
      },
    }
  );

  const isModul = await res.json();
  const moduls = isModul.data;

  return <MuridPageModul moduls={moduls} />;
}
