import DetailAssignments from "@/app/components/guruPageComponents/tugasComponents/detailTugasComponents/detailTugasComponents";

type IdTugasProps = {
  params: {
    idTugas: number;
  };
};

export default async function DetailTugas({ params }: IdTugasProps) {
  return <DetailAssignments />;
}
