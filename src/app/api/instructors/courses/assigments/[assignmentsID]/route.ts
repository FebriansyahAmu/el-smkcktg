import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { AssigmentsDAL } from "@/app/lib/data-access/assigmentsdal";

const assignmentsdal = new AssigmentsDAL();

export async function GET(
  request: NextRequest,
  { params }: { params: { assignmentsID: number } }
) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== "Guru") {
      return NextResponse.json(
        {
          status: "error",
          message: "unauthenticate",
        },
        { status: 401 }
      );
    }

    const insturctorsID = Number(session?.id_instructor ?? isNaN);
    if (isNaN(insturctorsID)) {
      return NextResponse.json(
        {
          status: "error",
          message: "invalid session data",
        },
        { status: 401 }
      );
    }

    const isAssignments = await assignmentsdal.isAssignmentsOwnedByInstructors(
      Number(params.assignmentsID),
      insturctorsID
    );

    if (!isAssignments) {
      return NextResponse.json(
        {
          status: "error",
          message: "Tugas tidak ditemukan",
        },
        { status: 404 }
      );
    }

    const detailAssignments = await assignmentsdal.getAssignmentsDetail(
      Number(params.assignmentsID),
      insturctorsID
    );

    if (!detailAssignments) {
      return NextResponse.json(
        {
          status: "error",
          message: "Tugas tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        data: detailAssignments,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Error saat mengambil detail tugas:", err);

    return NextResponse.json(
      {
        status: "error",
        message:
          process.env.NODE_ENV === "production"
            ? "Terjadi kesalahan di server."
            : `Error: ${err instanceof Error ? err.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
