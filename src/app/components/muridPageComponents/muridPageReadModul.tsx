"use client";
import MuridPageNavRead from "./muridPageNavRead";
import { HiChevronRight } from "react-icons/hi";
import Link from "next/link";
import { SectionType } from "@/app/lib/types/section";


export default function MuridPageReadModul() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <MuridPageNavRead />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <section className="mb-8">
          <div className="flex items-center text-sm text-gray-500 flex-wrap">
            <Link href={"#"} className="hover:text-indigo-600">
              Dashboard Kelas
            </Link>
            <HiChevronRight className="mx-2 w-4 h-4" />
            <Link href={"#"} className="hover:text-indigo-600">
              Daftar Modul
            </Link>
            <HiChevronRight className="mx-2 w-4 h-4" />
            <Link href={"#"} className="hover:text-indigo-600">
              Modul Pemrogramman Web
            </Link>
          </div>
        </section>

        {/* Konten dan Sidebar */}
        <div className="flex flex-col lg:flex-row ">
          {/* Konten Utama Scrollable */}
          <section className="flex-1 bg-white shadow  p-6 h-[80vh] overflow-y-auto">
            {[...Array(20)].map((_, i) => (
              <p key={i} className="mb-4 text-gray-700">
                {i + 1}. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Nulla officiis suscipit eligendi doloremque, vero repellat
                quas ducimus itaque illum. Nostrum perferendis asperiores, atque
                in amet inventore dicta saepe molestiae natus.
              </p>
            ))}
          </section>

          {/* Sidebar Sticky */}
          <aside className="w-full lg:w-1/3 bg-white shadow  p-6 h-fit lg:sticky top-28 self-start">
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">
              Navigasi Modul
            </h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <a href="#" className="hover:text-indigo-600 font-medium">
                  1. Pendahuluan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 font-medium">
                  2. HTML Dasar
                </a>
                <ul className="ml-4 mt-1 space-y-1 text-gray-500">
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      2.1 Struktur
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      2.2 Tag Umum
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 font-medium">
                  3. CSS Dasar
                </a>
                <ul className="ml-4 mt-1 space-y-1 text-gray-500">
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      3.1 Selector
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      3.2 Layouting
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 font-medium">
                  4. JavaScript Dasar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 font-medium">
                  5. Penutup & Ujian
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
  );
}
