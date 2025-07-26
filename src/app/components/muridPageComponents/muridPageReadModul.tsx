"use client";

import MuridPageNavRead from "./muridPageNavRead";
import { HiChevronRight } from "react-icons/hi";
import {
  FaChevronRight,
  FaChevronDown,
  FaBook,
  FaRegFileAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { SectionType } from "@/app/lib/types/section";
import { ModulsType } from "@/app/lib/types/moduls";

type Props = {
  sections: SectionType[];
  moduls: ModulsType;
};

export default function MuridPageReadModul({ sections, moduls }: Props) {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectSection = (id: number) => {
    setActiveSectionId(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <MuridPageNavRead />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <section className="mb-8">
          <div className="flex items-center text-sm text-gray-500 flex-wrap">
            <Link href={"#"} className="hover:text-indigo-600">
              Dashboard Kelas
            </Link>
            <HiChevronRight className="mx-2 w-4 h-4" />
            <Link href={"../modul"} className="hover:text-indigo-600">
              Daftar Modul
            </Link>
            <HiChevronRight className="mx-2 w-4 h-4" />
            <Link href={"#"} className="hover:text-indigo-600">
              {moduls.title}
            </Link>
          </div>
        </section>

        {/* Konten dan Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Konten Utama */}
          <section className="flex-1 bg-white shadow p-6 h-[80vh] overflow-y-auto rounded-xl">
            {sections
              .flatMap((s) => [s, ...(s.children ?? [])])
              .filter((s) => s.id_section === activeSectionId)
              .map((s) => (
                <div key={s.id_section}>
                  <h3 className="text-2xl font-semibold mb-4">{s.title}</h3>
                  <div
                    className="prose "
                    dangerouslySetInnerHTML={{ __html: s.content }}
                  />
                </div>
              ))}
          </section>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 bg-white shadow p-6 h-fit lg:sticky top-28 self-start rounded-xl border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">
              Navigasi Modul
            </h2>
            <ul className="space-y-3 text-sm text-gray-700">
              {sections.map((section) => (
                <li key={section.id_section}>
                  {section.children && section.children.length > 0 ? (
                    <>
                      <button
                        onClick={() => {
                          handleSelectSection(section.id_section);
                          toggleExpand(section.id_section);
                        }}
                        className="flex items-center justify-between w-full font-medium hover:text-indigo-600"
                      >
                        <div className="flex items-center gap-2">
                          <FaBook className="text-indigo-600" />
                          {section.title}
                        </div>
                        {expanded[section.id_section] ? (
                          <FaChevronDown className="text-xs" />
                        ) : (
                          <FaChevronRight className="text-xs" />
                        )}
                      </button>
                      {expanded[section.id_section] && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-500">
                          {section.children.map((child) => (
                            <li key={child.id_section}>
                              <button
                                onClick={() =>
                                  handleSelectSection(child.id_section)
                                }
                                className={`flex items-center gap-2 hover:text-indigo-600 ${
                                  activeSectionId === child.id_section
                                    ? "text-indigo-600 font-semibold"
                                    : ""
                                }`}
                              >
                                <FaRegFileAlt className="text-gray-400" />
                                {child.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleSelectSection(section.id_section)}
                      className={`flex items-center gap-2 hover:text-indigo-600 font-medium ${
                        activeSectionId === section.id_section
                          ? "text-indigo-600"
                          : ""
                      }`}
                    >
                      <FaBook className="text-indigo-600" />
                      {section.title}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
    </div>
  );
}
