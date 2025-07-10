import { buildHierarchy } from "@/app/utils/buildHierarchy";
import { SectionType } from "@/app/lib/types/section";
import ModulContentPreview from "@/app/components/courseDetailComponents/ModulContentPreview";
import { cookies } from "next/headers";

type PropsParams = {
  params: {
    id: number;
    idModul: number;
  };
};

export default async function ModulDetail({ params }: PropsParams) {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;
  const res = await fetch(
    `${process.env.BASE_URL}/api/moduls/${params.idModul}/preview`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const result = await res.json();

  if (!result || result.status !== "success") {
    return <div>Gagal mengambil data modul</div>;
  }

  const sections: SectionType[] = buildHierarchy(result.data);
  return <ModulContentPreview sections={sections} />;
}
