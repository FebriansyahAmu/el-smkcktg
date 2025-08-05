"use client";
import Link from "next/link";
import MuridPageNavbar from "../muridPageNavbar";
import { HiChevronRight } from "react-icons/hi";

export default function MuridTugasPageCore() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <MuridPageNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto p-9 py-8">
        <section className="mb-8">
          <div className="flex items-center text-sm text-gray-500 flex-wrap">
            <Link href={`#`} className="hover:text-indigo-600">
              Dashboard Kelas
            </Link>
            <HiChevronRight className="mx-2 w-4 -h4" />
            <Link href={``} className="hover:text-indigo-600">
              Tugas
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Tugas</p>
                <h3 className="text-2xl font-bold text-gray-800">10</h3>
              </div>
              {/* Tambahkan Icon yang sesuai disini */}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Deadline mendekati
                </p>
                <h3 className="text-2xl font-bold text-gray-800">2</h3>
              </div>
              {/* Tambah icon yang sesuai disini */}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Selesai</p>
                <h3 className="text-2xl font-bold text-gray-800">5</h3>
              </div>
              {/* Tambah icon disini  */}
            </div>
          </div>
        </div>

        {/* card for list tugas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition duration-300 hover:border-blue-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Pemograman web
                </span>
                <span className="text-xs text-gray-500">20 Agustus 2025</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Buatlah website sederhana
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Similique unde nulla aliquid...
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-500 mb-1">Deadline</p>
                  <p className="text-sm font-medium text-red-500">
                    15 Agustus 2025, 23:59
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-blue-600 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs font-medium text-gray-700">
                    Baru
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t border-gray-200">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Febriansyah Dirgantara Amu
                </span>
              </div>
              <Link
                href={`#`}
                className="text-white bg-blue-600 p-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Detail Tugas
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition duration-300 hover:border-blue-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Pemograman web
                </span>
                <span className="text-xs text-gray-500">20 Agustus 2025</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Buatlah website sederhana
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Similique unde nulla aliquid...
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-500 mb-1">Deadline</p>
                  <p className="text-sm font-medium text-red-500">
                    15 Agustus 2025, 23:59
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-gray-600 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs font-medium text-gray-700">
                    Lewat
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t border-gray-200">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Febriansyah Dirgantara Amu
                </span>
              </div>
              <Link
                href={`#`}
                className="text-white bg-blue-600 p-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Detail Tugas
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition duration-300 hover:border-blue-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Pemograman web
                </span>
                <span className="text-xs text-gray-500">20 Agustus 2025</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Buatlah website sederhana
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Similique unde nulla aliquid...
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-500 mb-1">Deadline</p>
                  <p className="text-sm font-medium text-red-500">
                    15 Agustus 2025, 23:59
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-600 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs font-medium text-gray-700">
                    Baru
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t border-gray-200">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Febriansyah Dirgantara Amu
                </span>
              </div>
              <Link
                href={`#`}
                className="text-white bg-blue-600 p-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Detail Tugas
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
