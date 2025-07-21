"use client";
import { useState } from "react";
import {
  FaBookOpen,
  FaClipboardList,
  FaCheckCircle,
  FaComments,
  FaChartLine,
  FaClock,
} from "react-icons/fa";
import MuridPageNavbar from "../../muridPageComponents/muridPageNavbar";

export default function MuridCoursesDash() {
  return (
    <div className="min-h-screen  flex flex-col bg-gray-100">
      <MuridPageNavbar />

      <main className="flex-1 w-full max-w-7xl p-9 mx-auto py-8  ">
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              Pemrograman Web
            </h2>
          </div>
        </section>

        <section className="flex flex-wrap gap-4 mb-8">
          <a
            href=""
            className="px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-sm font-normal flex items-center transition-colors duration-200"
          >
            <FaClipboardList className="text-md mr-2" />
            Modul
          </a>
          <a
            href=""
            className="px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-sm font-normal flex items-center transition-colors duration-200"
          >
            <FaClipboardList className="text-md mr-2" />
            Tugas
          </a>
          <a
            href=""
            className="px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-sm font-normal flex items-center transition-colors duration-200"
          >
            <FaCheckCircle className="text-md mr-2" />
            Presensi
          </a>
          <a
            href=""
            className="px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-sm font-normal flex items-center transition-colors duration-200"
          >
            <FaComments className="text-md mr-2" />
            Diskusi
          </a>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
              <FaChartLine className="text-indigo-600" />
              Progress Belajar
            </h3>

            <div className="h-2 bg-gray-200 rounded-full mb-2">
              <div className="h-2 bg-indigo-600 rounded-full w-[25%] transition-all duration-300"></div>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>25% Complete</span>
              <span>3/12 Materi</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
              <FaClock className="text-red-500" />
              Deadline Tugas
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Tugas 1</span>
                <span className="text-red-600 font-medium">23 Juli 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Tugas 2</span>
                <span className="text-red-600 font-medium">28 Juli 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Tugas 3</span>
                <span className="text-red-600 font-medium">30 Juli 2025</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
              <FaComments className="text-green-600" />
              Diskusi Terbaru
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <p className="font-medium text-gray-800">"Apa itu JWT?"</p>
                <span className="text-xs text-gray-500">
                  Oleh: Budi | 2 jam lalu
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  "Cara submit tugas gimana?"
                </p>
                <span className="text-xs text-gray-500">
                  Oleh: Sinta | 5 jam lalu
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  "Materi minggu depan apa?"
                </p>
                <span className="text-xs text-gray-500">
                  Oleh: Andi | Kemarin
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
