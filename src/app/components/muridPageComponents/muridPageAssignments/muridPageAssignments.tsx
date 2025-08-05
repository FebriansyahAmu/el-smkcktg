"use client";
import MuridPageNavbar from "../muridPageNavbar";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi";
import { FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";

export default function MuridPageTugas() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <MuridPageNavbar />

      <main className="flex-1 w-full max-w-7xl p-9 mx-auto py-8">
        <section className="mb-8">
          <div className="flex items-center text-sm text-gray-500 flex-wrap">
            <Link href={`#`} className="hover:text-indigo-600">
              Dashboard Kelas
            </Link>
            <HiChevronRight className="mx-2 w-4 h-4" />
            <Link href={``} className="hover:text-indigo-600">
              Detail Tugas
            </Link>
          </div>
        </section>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Tugas Pemogramman
            </h1>
            <p className="text-gray-600 mt-2">
              Status: <span className="text-green-600">Belum dikumpulkan</span>
            </p>
          </div>
          {/* add buttons here */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounde-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Detail Tugas
                </h2>
                <div className="text-sm text-gray-500">
                  <span className="bg-green-200 text-green-800 px-2 rounded-full">
                    Tugas Individu
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Tugas Pemograman
                </h3>
                <div className="flex justify-between">
                  <p className="text-gray-500 text-sm">
                    Dibuat: 20 Agustus 2025 - 10:30
                  </p>
                  <p className="text-red-500 text-sm">
                    Deadline: 20 Agustus 2025 - 10:30
                  </p>
                </div>
              </div>

              <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h2 className="font-medium text-gray-800 mb-3">
                  Deskripsi Tugas
                </h2>
                <div className="prose max-w-none">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis ducimus eos at necessitatibus eum aspernatur
                    assumenda officia molestias ad error quasi suscipit quaerat
                    accusantium laboriosam ipsam nesciunt animi, aliquid
                    incidunt?
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Lampiran</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <FaFilePdf className="text-red-500  text-xl mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Soal Tugas
                        </p>
                        <p className="text-xs text-gray-500">2.4 MB</p>
                      </div>
                    </div>
                    <Link
                      href={`#`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Unduh
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Pengumpulan Tugas
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lampirkan Jawaban
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <div className="flex justify-center">
                    <FaCloudUploadAlt className="text-3xl text-gray-400 mb-3" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop file jawaban di sini atau klik untuk memilih
                  </p>
                  <input type="file" className="text-sm mt-2" />
                  <p className="text-xs text-gray-500 mt-2">
                    Format PDF, WORD, PPT maksimal 10MB
                  </p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Kumpulkan Tugas
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
