import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getSession(req);

  // Jika tidak ada session atau pengguna belum login, redirect ke login
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Ambil role dari session payload
  const userRole = session.role;

  // Cek akses berdasarkan role dan path
  if (
    (pathname.startsWith("/dashboard/guru") && userRole !== "Guru") ||
    (pathname.startsWith("/dashboard/murid") && userRole !== "Murid")
  ) {
    // Jika role tidak cocok dengan path yang diakses, redirect ke halaman akses ditolak atau dashboard utama
    const accessDeniedUrl = new URL("/403", req.url);
    return NextResponse.redirect(accessDeniedUrl);
  }

  // Jika role sesuai dengan path, izinkan akses
  return NextResponse.next();
}

// Konfigurasi matcher middleware
export const config = {
  matcher: ["/dashboard/:role*", "/murid/:path*", "/guru/:path*"], // Cocokkan semua rute yang dimulai dengan /dashboard/guru atau /dashboard/murid
};
