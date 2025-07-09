"use client";
import { useState, useEffect } from "react";
import NavDashboard from "@/app/components/NavDashboard";
import Sidebar from "@/app/components/Sidebar";

type PropsParams = {
  params: {
    id: Number;
    idModul: Number;
  };
};

type SectionType = {
  id_section: number;
  id_module: number;
  parent_id: number | null;
  title: string;
  content: string;
  order: number;
  children?: SectionType[];
};

export default function ModulDetail({ params }: PropsParams) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sections, setSections] = useState<SectionType[]>([]);
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

  useEffect(() => {
    async function fetchSections() {
      try {
        const res = await fetch(`/api/moduls/${params.idModul}/preview`);
        const result = await res.json();

        if (result.status === "success") {
          const tree = buildHierarchy(result.data);
          setSections(tree);
        }
      } catch (err) {
        console.error("Gagal fetch section:", err);
      }
    }

    fetchSections();
  }, [params.idModul]);

  const buildHierarchy = (flatData: SectionType[]): SectionType[] => {
    const map = new Map<number, SectionType>();
    const roots: SectionType[] = [];

    flatData.forEach((item) => {
      item.children = [];
      map.set(item.id_section, item);
    });

    flatData.forEach((item) => {
      const node = map.get(item.id_section)!;
      if (item.parent_id === null) {
        roots.push(node);
      } else {
        const parent = map.get(item.parent_id);
        if (parent) {
          parent.children!.push(node);
        }
      }
    });

    const sortSections = (sections: SectionType[]): SectionType[] =>
      sections
        .sort((a, b) => a.order - b.order)
        .map((s) => ({
          ...s,
          children: sortSections(s.children ?? []),
        }));

    return sortSections(roots);
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
        //main contents goes here
        <main className="mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7 flex">
          <div className="p-4 w-full">
            <div className="flex">
              <div className="flex-1 pr-4">
                {sections
                  .flatMap((section) => [section, ...(section.children ?? [])])
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
          <div className="w-80 p-4 border-">
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
