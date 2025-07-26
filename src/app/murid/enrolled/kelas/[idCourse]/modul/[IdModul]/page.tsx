import MuridPageReadModul from "@/app/components/muridPageComponents/muridPageReadModul";
import { cookies } from "next/headers";
import { buildHierarchy } from "@/app/utils/buildHierarchy";
import { SectionType } from "@/app/lib/types/section";

type PropsParams = {
  params: {
    idCourse: number;
    IdModul: number;
  };
};

export default async function MuridReadPage({ params }: PropsParams) {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  const res = await fetch(
    `${process.env.BASE_URL}/api/students/enrolled/${params.idCourse}/moduls/${params.IdModul}/sections`,
    {
      cache: "no-store",
      headers: {
        Cookie: `session=${session}`,
      },
    }
  );

  const modulRes = await fetch(
    `${process.env.BASE_URL}/api/students/enrolled/${params.idCourse}/moduls/${params.IdModul}`,
    {
      cache: "no-store",
      headers: {
        Cookie: `session=${session}`,
      },
    }
  );

  const result = await res.json();
  const sections: SectionType[] = buildHierarchy(result.data);

  const modulResData = await modulRes.json();
  const modulData = modulResData.data;

  return <MuridPageReadModul sections={sections} moduls={modulData} />;
}
