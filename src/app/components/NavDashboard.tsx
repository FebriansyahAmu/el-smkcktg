"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface NavDashboardProps {
  toggleSidebar: () => void;
}

function NavDashboard({ toggleSidebar }: NavDashboardProps) {
  const [isOpen, setisOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setisOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setisOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-slate-900">
      <div className="py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start ml-0">
            <Link href="/" className="flex ms-2 text-xl text-white mr-20">
              <span className="self-center italic text-blue-700 text-xl font-semibold sm:text-2xl whitespace-nowrap">
                EL-
              </span>
              smkcktg
            </Link>
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex p-2 text-sm text-gray-500 rounded-lg hover:bg-slate-800 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center mr-5">
            <div className="relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-slate-700"
                aria-expanded="false"
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
              </button>
              {isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 origin-top-right bg-slate-800 divide-y divide-gray-100 rounded-md shadow-lg z-50"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-white" role="none">
                      User
                    </p>
                    <p
                      className="text-sm font-medium text-white truncate"
                      role="none"
                    >
                      useremail@writeline.site
                    </p>
                  </div>
                  <ul className="p-2" role="none">
                    <li>
                      <a
                        href="#"
                        className="block rounded px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-gray-100"
                        role="menuitem"
                      >
                        Profiles
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block rounded px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-gray-100"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block rounded px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-gray-100"
                        role="menuitem"
                      >
                        Log out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavDashboard;
