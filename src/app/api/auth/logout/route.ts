import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Sign Out" });

  response.cookies.set("session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
