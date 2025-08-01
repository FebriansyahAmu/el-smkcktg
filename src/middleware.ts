import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getSession(req);

  // Jika tidak login, redirect ke login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userRole = session.role;

  // Cek role berdasarkan prefix path
  const isGuruPage =
    pathname.startsWith("/dashboard/guru") || pathname.startsWith("/guru");
  const isMuridPage =
    pathname.startsWith("/dashboard/murid") || pathname.startsWith("/murid");

  if (isGuruPage && userRole !== "Guru") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  if (isMuridPage && userRole !== "Murid") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
}

// Konfigurasi matcher
export const config = {
  matcher: [
    "/dashboard/guru/:path*",
    "/dashboard/murid/:path*",
    "/guru/:path*",
    "/murid/:path*",
  ],
};
