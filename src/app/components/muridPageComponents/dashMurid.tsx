"use client";
import { useState } from "react";
import UserNavDashboard from "../userNavDashboard";
import UserSidebar from "../userSidebar";

export default function DashMurid() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex flex-ccol flex-1 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <UserNavDashboard toggleSidebar={toggleSidebar} />
        <div className="flex flex-col flex-1">
          <main className="flex-1 mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7">
            <div>
              <h3 className="text-3xl font-semibold font-sans">
                Selamat Datang -Nama Lengkap- disisni
              </h3>
              <p className="text-sm font-sans mt-2">
                Semoga Aktifitas belajarmu menyenangkan
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-2">
              <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-bold mb-3">Daftar Kelas</h2>
                <div className="grid grid-cols-1 p-4 bg-gray-100 rounded-sm">
                  <h6 className="font-semibold mb-2">Sedang dipelajari</h6>
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm font-light flex-1">
                      Pemograman Website
                    </p>
                    <a
                      href="#"
                      className="text-blue-500 text-sm shrink-0 whitespace-nowrap hover:underline"
                    >
                      Lanjut belajar
                    </a>
                  </div>
                </div>
              </div>

              {/* Grid kedua: Daftar Tugas */}
              <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-bold mb-3">Daftar Tugas</h2>
                <ul className="space-y-2">
                  <li className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
                    Tugas 1: Persamaan Linear
                  </li>
                  <li className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
                    Tugas 2: Hukum Newton
                  </li>
                  <li className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
                    Tugas 3: Sistem Pencernaan
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
