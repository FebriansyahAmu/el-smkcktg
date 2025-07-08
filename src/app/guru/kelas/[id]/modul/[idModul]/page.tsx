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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    async function fetchSections() {
      try {
        const res = await fetch(`/api/moduls/${params.idModul}/edit`);
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
        <main className="mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7">
          <p>testi</p>
        </main>
      </div>
    </div>
  );
}
