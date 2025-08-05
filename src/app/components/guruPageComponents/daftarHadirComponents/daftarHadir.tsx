"use client";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie,
} from "react-icons/fa";

type PropsParams = {
  id_course: number;
};

export default function DaftarHadir({ id_course }: PropsParams) {
  return (
    <section className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="flex-1 mt-4 max-w-7xl mx-auto">
        {/* Header Info */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Pemrograman Web
                </h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Kelas Aktif
                </span>
              </div>
              <p className="text-gray-600 mt-1 text-sm">
                Kode Kelas: MC-AR30R01
              </p>
              <div className="mt-2 flex flex-col sm:flex-row flex-wrap gap-2 text-gray-600 text-sm">
                <span>Semester Ganjil 2024/2025</span>
                <span>Senin 08:00 - 10:30</span>
                <span>32 siswa terdaftar</span>
              </div>
            </div>
            <div className="flex items-start">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Ringkasan Kehadiran */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Total Pertemuan",
              value: "12",
              icon: <FaCalendarAlt />,
              bg: "bg-blue-100",
              color: "text-blue-600",
            },
            {
              label: "Hadir",
              value: "248",
              icon: <FaCheckCircle />,
              bg: "bg-green-200",
              color: "text-green-600",
            },
            {
              label: "Tidak Hadir",
              value: "18",
              icon: <FaTimesCircle />,
              bg: "bg-red-200",
              color: "text-red-600",
            },
            {
              label: "Persentase",
              value: "80%",
              icon: <FaChartPie />,
              bg: "bg-blue-300",
              color: "text-blue-600",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-2xl font-bold mt-1">{item.value}</p>
                </div>
                <div className={`p-3 ${item.bg} rounded-full ${item.color}`}>
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabel Pertemuan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="font-semibold text-lg">Pertemuan</h3>
            <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              Tambah Pertemuan
            </button>
          </div>

          {/* Table wrapper for horizontal scroll */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-[700px] w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["No", "Tanggal", "Topik", "Kehadiran", "Action"].map(
                    (head, idx) => (
                      <th
                        key={idx}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    12 Sep 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Turunan Fungsi
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    90 menit
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      30/32
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
