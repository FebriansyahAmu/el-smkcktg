import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaBook, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } sm:block lg:hidden`}
        onClick={toggleSidebar} // Close sidebar when clicking on the overlay
      ></div>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 h-screen pt-20 transition-all transform bg-slate-900  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:${isOpen ? "translate-x-0 w-64" : "w-20"} sm:w-64 md:${
          isOpen ? "translate-x-0" : "translate-x-0 md:w-20"
        } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-3 overflow-y-auto bg-slate-900 mt-7">
          <h3
            className={`text-blue-700 mb-4 ml-2 font-semibold transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Menu
          </h3>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/dashboard/guru"
                className="flex items-center text-white p-2 hover:text-slate-700 rounded-lg hover:bg-gray-100 group"
              >
                <AiFillDashboard
                  className={`transition-all duration-300 ${
                    isOpen ? "w-6 h-6" : "w-8 h-8 flex ml-1"
                  } text-white group-hover:text-gray-900`}
                />
                <span
                  className={`ms-3 transition-all duration-300 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/guru/kelas"
                className="flex items-center text-white p-2 hover:text-slate-700 rounded-lg hover:bg-gray-100 group"
              >
                <FaBook
                  className={`transition-all duration-300 ${
                    isOpen ? "w-6 h-6" : "w-8 h-8 ml-1"
                  } text-white group-hover:text-gray-900`}
                />
                <span
                  className={`ms-3 transition-all duration-300 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Courses
                </span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-white p-2 hover:text-slate-700 rounded-lg hover:bg-gray-100 group"
              >
                <FaCalendarAlt
                  className={`transition-all duration-300 ${
                    isOpen ? "w-6 h-6" : "w-8 h-8 ml-1"
                  } text-white group-hover:text-gray-900`}
                />
                <span
                  className={`ms-3 transition-all duration-300 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Kalender
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-white p-2 hover:text-slate-700 rounded-lg hover:bg-gray-100 group"
              >
                <FaClipboardList
                  className={`transition-all duration-300 ${
                    isOpen ? "w-6 h-6" : "w-8 h-8 ml-1"
                  } text-white group-hover:text-gray-900`}
                />
                <span
                  className={`ms-3 transition-all duration-300 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Daftar Tugas
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
