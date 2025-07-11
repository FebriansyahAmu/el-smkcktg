"use client";

import { useState } from "react";
import NavDashboard from "../NavDashboard";
import Sidebar from "../Sidebar";
import { SectionType } from "@/app/lib/types/section";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

type props = {
  sections: SectionType[];
};

export default function ModulContentPreview({ sections }: props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [expandedSectionIds, setExpandedSectionsIds] = useState<number[]>([]);
  const [isModuleListOpen, setIsModuleListOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSectionExpand = (id: number) => {
    setExpandedSectionsIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <NavDashboard toggleSidebar={toggleSidebar} />
        <main className="mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7 flex overflow-hidden">
          {/* content goes here */}
          <div className="flex-1 overflow-x-auto w-full p-2 pr-16 max-h-full">
            {sections
              .flatMap((s) => [s, ...(s.children ?? [])])
              .filter((s) => s.id_section === activeSectionId)
              .map((s) => (
                <div key={s.id_section}>
                  <h2 className="text-2xl font-bold mb-4">{s.title}</h2>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: s.content }}
                  />
                </div>
              ))}
          </div>

          {/* Sidebar */}

          {!isModuleListOpen && (
            <button
              onClick={() => setIsModuleListOpen(true)}
              className="fixed top-1/2 right-0 z-50 transform -translate-y-1/2 translate-x-3
                 bg-[#0f172a] text-white p-3 rounded-full shadow-md hover:bg-[#1e293b] transition-colors"
              title="Toggle Modul"
            >
              <PiDotsThreeOutlineVerticalFill className="w-6 h-6" />
            </button>
          )}
          {isModuleListOpen && (
            <div
              className={`fixed md:static top-0 right-0 z-50 md:z-0 w-full md:w-96 h-full md:h-auto`}
            >
              <div className=" md:w-full h-screen  p-2 border-1 bg-white">
                {isModuleListOpen && (
                  <button
                    onClick={() => setIsModuleListOpen(false)}
                    className="sticky right-0 z-100 "
                    title="Toggle modul"
                  >
                    <IoIosArrowDroprightCircle className="size-12" />
                  </button>
                )}

                <h3 className="text-lg font-semibold mb-2">Daftar Modul</h3>
                <ul className="p-4">
                  {sections.map((section) => (
                    <li key={section.id_section} className="mb-2">
                      <div className="flex items-center gap-2">
                        {section.children && section.children.length > 0 && (
                          <button
                            onClick={() =>
                              toggleSectionExpand(section.id_section)
                            }
                            className="text-sm text-gray-500 ml-2"
                          >
                            {expandedSectionIds.includes(section.id_section)
                              ? "▲"
                              : "▼"}
                          </button>
                        )}
                        <button
                          onClick={() => setActiveSectionId(section.id_section)}
                          className={`text-left w-full p-2 rounded hover:bg-gray-100 ${
                            activeSectionId === section.id_section
                              ? "bg-blue-100 font-semibold"
                              : ""
                          }`}
                        >
                          {section.title}
                        </button>
                      </div>
                      {expandedSectionIds.includes(section.id_section) &&
                        section.children?.map((child) => (
                          <button
                            key={child.id_section}
                            onClick={() => setActiveSectionId(child.id_section)}
                            className={`ml-4 mt-1 block text-left w-full p-2 rounded hover:bg-gray-100 ${
                              activeSectionId === child.id_section
                                ? "bg-blue-100 font-semibold"
                                : ""
                            }`}
                          >
                            <div className="pl-10">{child.title}</div>
                          </button>
                        ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
