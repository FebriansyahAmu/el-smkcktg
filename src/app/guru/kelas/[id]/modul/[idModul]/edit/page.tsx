"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import NavDashboard from "@/app/components/NavDashboard";
import Sidebar from "@/app/components/Sidebar";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { FiSave } from "react-icons/fi";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type PropsParams = {
  params: {
    id: number;
    idModul: number;
  };
};

type SectionType = {
  id: number | null; // Will be null until saved to DB
  tempId: string; // Unique ID for frontend operations
  parent_id: number | null;
  title: string;
  content: string;
  order: number;
  children?: SectionType[];
};

const generateTempId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function EditContentModul({ params }: PropsParams) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [sections, setSections] = useState<SectionType[]>([]);

  const updateSection = (
    tempId: string,
    key: keyof SectionType,
    value: string
  ) => {
    const update = (items: SectionType[]): SectionType[] =>
      items.map((item) => {
        if (item.tempId === tempId) {
          return { ...item, [key]: value };
        } else if (item.children?.length) {
          return { ...item, children: update(item.children) };
        }
        return item;
      });
    setSections(update(sections));
  };

  const addSection = () => {
    const newSection: SectionType = {
      id: null,
      tempId: generateTempId(),
      parent_id: null,
      title: "",
      content: "",
      order: sections.length + 1,
      children: [],
    };
    setSections([...sections, newSection]);
  };

  const addSubSection = (parentTempId: string) => {
    const insert = (items: SectionType[], level = 1): SectionType[] =>
      items.map((item) => {
        if (item.tempId === parentTempId) {
          if (level >= 2) return item;

          const currentChildrenCount = item.children?.length ?? 0;

          const newChild: SectionType = {
            id: null,
            tempId: generateTempId(),
            parent_id: null,
            title: "",
            content: "",
            order: currentChildrenCount + 1,
            children: [],
          };

          return {
            ...item,
            children: [...(item.children || []), newChild],
          };
        } else if (item.children?.length) {
          return {
            ...item,
            children: insert(item.children, level + 1),
          };
        }
        return item;
      });

    setSections((prev) => insert(prev));
  };

  const removeSection = (tempId: string) => {
    const remove = (items: SectionType[]): SectionType[] =>
      items
        .filter((item) => item.tempId !== tempId)
        .map((item) => ({
          ...item,
          children: item.children ? remove(item.children) : [],
        }));
    setSections(remove(sections));
  };

  const saveSection = async (parentTempId: string) => {
    const parentSection = sections.find((s) => s.tempId === parentTempId);

    if (!parentSection) {
      console.error("Parent section tidak ditemukan");
      return;
    }

    // const subSections = sections.filter(
    //   (s) => s.parent_id === parentSection.id
    // );

    const subSections = parentSection.children || [];

    const payload = {
      parent: {
        id_section: parentSection.id ?? undefined,
        id_modules: Number(params.idModul),
        title: parentSection.title.trim(),
        content: parentSection.content.trim(),
        order: parentSection.order ?? 1,
      },
      children: subSections.map((sub, index) => ({
        id_section: sub.id ?? undefined,
        title: sub.title.trim(),
        content: sub.content.trim(),
        order: index + 1,
      })),
    };

    const res = await fetch(`/api/moduls/${params.idModul}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok) {
      console.log("Berhasil disimpan,", result.id);
    }

    alert("Section dan sub-section berhasil disimpan");
  };

  const renderSections = (items: SectionType[], level = 0): JSX.Element[] =>
    items.map((section) => (
      <div
        key={section.tempId}
        className={`mt-4 mb-6 ml-${
          level * 4
        } bg-white border rounded-md p-4 shadow`}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 w-full">
            <div className="text-gray-400 cursor-grab">≡</div>
            <input
              type="text"
              placeholder="Judul Section"
              value={section.title}
              onChange={(e) =>
                updateSection(section.tempId, "title", e.target.value)
              }
              className="text-lg font-semibold outline-none border-b border-transparent focus:border-blue-500 transition w-full mb-4"
            />
          </div>

          {/* <div className="flex gap-2 items-center ml-2">
            <button onClick={() => addSubSection(section.tempId)}>
              <span
                className="text-green-600 text-xl"
                title="Tambah Sub-section"
              >
                <AiOutlinePlus className="text-green-600 text-xl" />
              </span>
            </button>
            <button onClick={() => removeSection(section.tempId)}>
              <span className="text-red-500 text-xl" title="Hapus Section">
                <AiOutlineDelete className="text-red-500 text-xl" />
              </span>
            </button>
            <button
              // onClick={() => saveSection(section.tempId)}
              title="Simpan Section"
            >
              <FiSave className="text-blue-600 text-xl" />
            </button>
          </div> */}

          <div className="flex gap-2 items-center ml-2">
            {level === 0 && (
              <>
                <button onClick={() => addSubSection(section.tempId)}>
                  <AiOutlinePlus
                    className="text-green-600 text-xl"
                    title="Tambah Sub-section"
                  />
                </button>
                <button
                  onClick={() => {
                    saveSection(section.tempId);
                  }}
                  title="Simpan Section"
                >
                  <FiSave className="text-blue-600 text-xl" />
                </button>
              </>
            )}

            <button onClick={() => removeSection(section.tempId)}>
              <AiOutlineDelete
                className="text-red-500 text-xl"
                title="Hapus Section"
              />
            </button>
          </div>
        </div>

        <ReactQuill
          value={section.content}
          onChange={(value) => updateSection(section.tempId, "content", value)}
          modules={modules}
          formats={formats}
          placeholder="Tulis konten di sini..."
        />

        {/* Render children */}
        {section.children && section.children.length > 0 && (
          <div className="ml-4">
            {renderSections(section.children, level + 1)}
          </div>
        )}
      </div>
    ));

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
      ["code-block"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "font",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "code",
    "code-block",
  ];

  return (
    <div className="flex h-screen overflow-auto bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg-pl64" : "lg:pl-20"
        }`}
      >
        <NavDashboard toggleSidebar={toggleSidebar} />

        <main className="mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7">
          {sections.length > 0 ? (
            renderSections(sections)
          ) : (
            <p className="text-gray-600 mb-4">
              Belum ada section. Klik tombol "Tambah Section" untuk memulai.
            </p>
          )}

          <div className="mt-4">
            <button
              onClick={addSection}
              className="px-3 py-3 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Tambah Section
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
