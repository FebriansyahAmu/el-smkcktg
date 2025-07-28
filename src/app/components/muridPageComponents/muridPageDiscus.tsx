"use client";
import { useState } from "react";
import MuridPageNavbar from "./muridPageNavbar";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi";
export default function MuridPageDiscussion() {
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
              Diskusi Kelas
            </Link>
          </div>
        </section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Diskusi Kelas
        </h2>

        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="font-medium text-gray-800 mb-4">Buat Diskusi Baru</h3>
          <form>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Tulis pertanyaan disini"
            />
          </form>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-sm hover:bg-indigo-700 transition">
            Kirim
          </button>
        </section>

        <section className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h4 className="font-bold text-gray-800">
              Pertanyaan tentang Soal Hal 45
            </h4>
            <p className="text-gray-600 mt-2">
              Saya tidak mengerti cara menyelesaikan soal nomor 5. Ada yang bisa
              membantu?
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                oleh Andi · 2 jam lalu
              </span>
              <button className="text-indigo-600 hover:underline">Balas</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
