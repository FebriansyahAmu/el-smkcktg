"use client";
import { useState } from "react";
import UserNavDashboard from "../userNavDashboard";
import UserSidebar from "../userSidebar";
import { CoursesType } from "@/app/lib/types/courses";
import { FaStar, FaUserGraduate, FaClock } from "react-icons/fa";

type props = {
  courses: CoursesType[];
};

export default function GetCoursByID({ courses }: props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const course = courses[0];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex flex-col flex-1 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <UserNavDashboard toggleSidebar={toggleSidebar} />

        <div className="flex flex-col flex-1">
          <main className="flex-1 mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full md:w-1/3">
                <img src="" className="object-cover h-full w-full" />
                <div className="bg-teal-600 text-white text-sm font-semibold text-center py-1">
                  Gratis
                </div>
              </div>

              <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium text-gray-700">
                      4.86
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {course.Title}
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
                    <div className="flex items-center gap-1">
                      <FaUserGraduate /> <span>24.182 Siswa Terdaftar</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mt-3">
                    {course.Description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 w-full sm:w-auto">
                    Enroll Kelas
                  </button>
                  <button className="border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 w-full sm:w-auto">
                    Informasi Kelas
                  </button>
                  <button className="border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 w-full sm:w-auto">
                    Lihat Silabus
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
