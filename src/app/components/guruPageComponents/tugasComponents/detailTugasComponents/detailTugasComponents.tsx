"use client";
import { useState } from "react";
import NavDashboard from "@/app/components/NavDashboard";
import Sidebar from "@/app/components/Sidebar";
import { DetailAssignmentsType } from "@/app/lib/types/detailAssignments";
import { FiTrash2, FiEdit2, FiCheckCircle } from "react-icons/fi";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import Link from "next/link";
import { format } from "date-fns";
import { getFileMeta } from "@/app/utils/getFileMeta";

type DetailTugasProps = {
  assignments: DetailAssignmentsType;
};

export default function DetailAssignments({ assignments }: DetailTugasProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-auto bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <NavDashboard toggleSidebar={toggleSidebar} />

        <main className="mt-14 p-4 md:ml-14 md:p-7 lg:ml-0">
          <div className="flex-1 mt-4 mb-8 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Detail Tugas
                </h1>
                <p className="mt-2 text-gray-600">
                  Lihat detail lengkap tugas dan pengumpulan siswa
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="flex items-center gap-2 px-4 py-2 text-white text-sm bg-red-500 rounded-sm hover:bg-red-600 transition-colors">
                  <FiTrash2 className="text-lg" />
                  Hapus
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-white text-sm bg-blue-500 rounded-sm hover:bg-blue-600 transition-colors">
                  <FiEdit2 className="text-lg" />
                  Edit
                </button>
              </div>
            </div>

            {/* Content goes here container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      Detail Tugas
                    </h2>

                    <div className="text-sm text-gray-500">
                      <span className="inline-flex items-center gap-1 bg-green-300 text-green-800 px-3 py-1 rounded-full font-medium">
                        <FiCheckCircle className="text-green-800 text-base" />
                        Aktif
                      </span>
                    </div>
                  </div>

                  {/* Judul tugas */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {assignments.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      DIbuat Pada:{" "}
                      {format(new Date(assignments.created_at), "dd-MM-yyyy")}
                    </p>
                  </div>

                  {/* Deskripsi */}
                  <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-700 mb-3">
                      Deskripsi tugas :
                    </h4>
                    <div className="max-w-none">
                      <p>{assignments.description}</p>
                    </div>
                  </div>

                  {/* Lampiran files */}
                  {assignments.file_url && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 mb-3">
                        Lampiran
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            {getFileMeta(assignments.file_url).icon}
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                {getFileMeta(assignments.file_url).label}
                              </p>
                              <p className="text-xs text-gray-500">
                                Klik untuk melihat atau unduh
                              </p>

                              {getFileMeta(assignments.file_url).isImage && (
                                <img
                                  src={assignments.file_url}
                                  alt="Lampiran"
                                  className="mt-2 w-48 rounded border"
                                />
                              )}
                            </div>
                          </div>
                          <Link
                            href={assignments.file_url}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-blue-500 hover:text-blue-800 text-sm"
                          >
                            Unduh
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detail tugas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Tipe Tugas
                      </h4>
                      <p className="text-gray-600">
                        Tugas: {assignments.tipe_tugas}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Status</h4>
                      <p className="text-green-600 font-medium">
                        Aktif (24/28 siswa telah mengumpulkan)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Tenggat Waktu
                      </h4>
                      <p className="text-red-600 font-medium">
                        {format(
                          new Date(assignments.due_date),
                          "dd-MM-yyyy HH:mm"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Here */}
              <div className="lg:col-span-1 space-y-6">
                {/* Satistik */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Statistik Pengumpulan Tugas
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flext justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Progress Pengumpulan
                        </span>
                        <span className="text-sm font-medium text-gray-700 ml-1">
                          24/28 (82%)
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full w-[82%]"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-green-200 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">
                            23
                          </p>
                          <p className="text-xs text-gray-600">Tepat Waktu</p>
                        </div>
                        <div className="p-3 bg-yellow-200 rounded-lg">
                          <p className="text-2xl font-bold text-yellow-600">
                            3
                          </p>
                          <p className="text-xs text-gray-600">Terlambat</p>
                        </div>
                        <div className="p-3 bg-red-200 rounded-lg">
                          <p className="text-2xl font-bold text-red-600">5</p>
                          <p className="text-xs text-gray-600">Belum</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
