import { GetAssignmentsDetails } from "@/app/services/getAssignments";
import DetailAssignments from "@/app/components/guruPageComponents/tugasComponents/detailTugasComponents/detailTugasComponents";
import { notFound } from "next/navigation";

type IdTugasProps = {
  params: {
    idTugas: number;
  };
};

export default async function DetailTugas({ params }: IdTugasProps) {
  const id_tugas = Number(params.idTugas);

  const res = await GetAssignmentsDetails({ idAssigment: id_tugas });
  const detailAssignments = res?.data;

  if (!res || !detailAssignments) {
    notFound();
  }

  console.log(detailAssignments);

  return <DetailAssignments assignments={detailAssignments} />;
}
