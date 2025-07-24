"use client";
import { useState } from "react";
import MuridPageNavbar from "./muridPageNavbar";
import { ModulsType } from "@/app/lib/types/moduls";

type props = {
  moduls: ModulsType[];
};

export default function MuridPageModul({ moduls }: props) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <MuridPageNavbar />

      <main className="flex-1 w-full max-w-7xl p-9 mx-auto py-8">
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              Modul Kelas Pemrograman Web
            </h2>
          </div>
        </section>

        {moduls.map((modul) => (
          <section key={modul.id_modules} className="w-full mb-8">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full md:w-1/3">
                <img src="" className="object-cover h-full w-full" />
              </div>

              <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-2"></div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {modul.title}
                  </h2>

                  <div className="mb-3">
                    <span className="font-semibold text-gray-700 mr-2">
                      Topik:
                    </span>
                    <span className="bg-gray-200 text-sm rounded-full px-2 py-1 mr-1">
                      Computer Science
                    </span>
                    <span className="bg-gray-200 text-sm rounded-full px-2 py-1">
                      Softskill
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="underline text-blue-600 font-medium">
                      Level: Dasar
                    </span>
                    {/* <div className="flex items-center gap-1">
                                  <FaClock /> <span>11 Jam Belajar</span>
                                </div> */}
                  </div>

                  <p className="text-sm text-gray-700 mt-3">
                    {modul.description}
                  </p>
                </div>
                <button className="mt-4 w-full py-2 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg text-sm font-medium transition duration-300">
                  Buka Modul
                </button>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
