"use client";

import { useState } from "react";
import NavDashboard from "../NavDashboard";
import Sidebar from "../Sidebar";
import { SectionType } from "@/app/lib/types/section";

type props = {
  sections: SectionType[];
};

export default function ModulContentPreview({ sections }: props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [expandedSectionIds, setExpandedSectionsIds] = useState<number[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSectionExpand = (id: number) => {
    setExpandedSectionsIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen overflow-auto bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <NavDashboard toggleSidebar={toggleSidebar} />
        <main className="mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7 flex">
          {/* content goes here */}
          <div className="p-4 w-full">
            <div className="flex">
              <div className="flex-1 pr-4">
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 p-4 border-1 bg-white">
            <h3 className="text-lg font-semibold mb-2">Daftar Modul</h3>
            <ul>
              {sections.map((section) => (
                <li key={section.id_section} className="mb-2">
                  <div className="flex items-center gap-2">
                    {section.children && section.children.length > 0 && (
                      <button
                        onClick={() => toggleSectionExpand(section.id_section)}
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
        </main>
      </div>
    </div>
  );
}
