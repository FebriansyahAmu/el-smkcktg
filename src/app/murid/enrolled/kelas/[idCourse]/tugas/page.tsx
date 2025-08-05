import MuridTugasPageCore from "@/app/components/muridPageComponents/muridPageAssignments/muridPageAssignmentsCore";

type PropsParams = {
  params: {
    idCourse: number;
  };
};

export default function TugasMurid({ params }: PropsParams) {
  return <MuridTugasPageCore />;
}
