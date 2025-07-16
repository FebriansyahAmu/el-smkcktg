"use client";
import { useState } from "react";
import UserNavDashboard from "../userNavDashboard";
import UserSidebar from "../userSidebar";
import { CoursesType } from "@/app/lib/types/courses";

type props = {
  courses: CoursesType[];
};

export default function GetAllCourses({ courses }: props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastCourses = currentPage * itemsPerPage;
  const indexOfFirstCourses = indexOfLastCourses - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstCourses, indexOfLastCourses);

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Area */}
      <div
        className={`flex flex-col flex-1 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        {/* Navbar */}
        <UserNavDashboard toggleSidebar={toggleSidebar} />

        {/* Main Content + Footer */}
        <div className="flex flex-col flex-1">
          {/* Content */}
          <main className="flex-1 mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentCourses.map((course) => (
                <div
                  key={course.Title}
                  className="bg-white shadow-md rounded-md p-5 hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.Title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {course.Description}
                  </p>
                  <div className="text-xs text-gray-500">
                    Dibuat:{" "}
                    {new Date(course.created_at ?? "").toLocaleDateString(
                      "id-ID"
                    )}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={`/murid/kelas/${course.id_course}`}
                      className="inline-block mt-4 text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-sm hover:bg-blue-700"
                    >
                      Detail kelas
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Sticky Footer Pagination */}
          <footer className="w-full py-4 ">
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
