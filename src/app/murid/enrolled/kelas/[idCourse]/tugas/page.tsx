import MuridPageTugas from "@/app/components/muridPageComponents/muridPageAssignments/muridPageAssignments";

type PropsParams = {
  params: {
    idCourse: number;
  };
};

export default function Tugas({ params }: PropsParams) {
  return <MuridPageTugas />;
}
