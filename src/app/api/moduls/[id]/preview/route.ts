import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { ModulsDAL } from "@/app/lib/data-access/moduldal";

const modulDal = new ModulsDAL();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    // const session = await getSession(request);
    // if (!session || session.role !== "Guru") {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "unauthorization",
    //     },
    //     {
    //       status: 401,
    //     }
    //   );
    // }

    const id_modules = Number(params.id);
    const modulesSections = await modulDal.getModulSections(id_modules);

    return NextResponse.json({
      status: "success",
      data: modulesSections,
    });
  } catch (error: any) {}
}
