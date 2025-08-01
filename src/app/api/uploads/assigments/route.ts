import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import fs from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session || session.role !== "Guru") {
    return NextResponse.json({ message: "unauthenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { message: "File tidak ditemukan" },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const cleanName = file.name.replace(/\s+/g, "_");
  const filename = `${Date.now()}-${cleanName}`;
  const uploadPath = path.join(
    process.cwd(),
    "public",
    "uploads",
    "assignments"
  );

  await fs.mkdir(uploadPath, { recursive: true });

  const filePath = path.join(uploadPath, filename);
  await fs.writeFile(filePath, uint8Array);

  const fileUrl = `/uploads/assignments/${filename}`;

  return NextResponse.json({ fileUrl, filename });
}
