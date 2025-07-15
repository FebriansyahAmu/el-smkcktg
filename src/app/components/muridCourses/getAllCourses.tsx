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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-auto bg-gray-100">
      <UserSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <UserNavDashboard toggleSidebar={toggleSidebar} />
        {/* Content goes here */}
        <main className="mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.map((course) => (
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
                    href={``}
                    className="inline-block mt-4 justify-center text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-sm hover:bg-blue-700"
                  >
                    Detail kelas
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
