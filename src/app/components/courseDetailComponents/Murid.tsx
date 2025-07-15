import React from "react";
import {
  FiUsers,
  FiBarChart2,
  FiAlertCircle,
  FiTrendingDown,
} from "react-icons/fi";

type ModulProps = {
  id_course: number;
};

const Murid = ({ id_course }: ModulProps) => {
  const handleGenerateToken = async () => {
    const res = await fetch(`/api/courses/${id_course}/generateToken`, {
      method: "POST",
    });
    const data = await res.json();
    // setEnrollmentsToken(data.token);
  };
  return (
    <>
      <div className="flex justify-end space-x-2 mt-4">
        <input
          type="text"
          id="enrollment-token"
          value="SC-M00721B"
          readOnly
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-sm px-4 py-2 w-64 cursor-default"
        />
        <button
          type="button"
          onClick={handleGenerateToken}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-sm  "
        >
          Generate Token
        </button>
      </div>

      <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 h-48 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
          <FiUsers className="text-3xl mx-auto text-blue-500 mb-2 size-16" />
          <h3 className="text-lg font-semibold mb-2">Jumlah Siswa Terdaftar</h3>
          <p>25 Siswa</p>
        </div>
        <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
          <FiBarChart2 className="text-3xl text-green-500 mb-2 mx-auto size-16" />
          <h3 className="text-lg font-semibold mb-2">Progress Rata - rata</h3>
          <p>75% Materi Diselesaikan</p>
        </div>
        <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
          <FiTrendingDown className="text-3xl text-red-500 mx-auto mb-2 size-16" />
          <h3 className="text-lg font-semibold mb-2">
            Progress Belajar Rendah
          </h3>
          <p>7 Murid di bawah 45% progress</p>
        </div>
      </div>
      <div className="w-full mt-10 overflow-x-auto">
        <div className="">
          <h3>Daftar Murid</h3>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Siswa
              </th>
              <th scope="col" className="px-6 py-3">
                Kelas
              </th>
              <th scope="col" className="px-6 py-3">
                Progress
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { nama: "Budi Santoso", kelas: "10A", progress: 85 },
              { nama: "Sari Andini", kelas: "10A", progress: 72 },
              { nama: "Rian Pratama", kelas: "10B", progress: 90 },
              { nama: "Indah Lestari", kelas: "10B", progress: 66 },
              { nama: "Dimas Saputra", kelas: "10A", progress: 40 },
              { nama: "Lina Marlina", kelas: "10C", progress: 78 },
              { nama: "Yusuf Ramadhan", kelas: "10A", progress: 55 },
              { nama: "Citra Dewi", kelas: "10B", progress: 92 },
              { nama: "Agus Wijaya", kelas: "10C", progress: 30 },
              { nama: "Nina Kurnia", kelas: "10A", progress: 88 },
            ].map((siswa, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{siswa.nama}</td>
                <td className="px-6 py-4">{siswa.kelas}</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${siswa.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-700 ml-1">
                    {siswa.progress}%
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="text-blue-600 hover:underline">
                    Detail
                  </button>
                  <button className="text-yellow-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Murid;
