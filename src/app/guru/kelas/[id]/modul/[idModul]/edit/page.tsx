"use client";
import { useState } from "react";
import NavDashboard from "@/app/components/NavDashboard";
import Sidebar from "@/app/components/Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type PropsParams = {
  params: {
    id: Number;
    idModul: Number;
  };
};

export default function EditContentModul({ params }: PropsParams) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];
  return (
    <div className="flex h-screen overflow-auto bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 flex flex-col transition-all duratioin-300 ${
          isSidebarOpen ? "lg-pl64" : "lg:pl-20"
        }`}
      >
        <NavDashboard toggleSidebar={toggleSidebar} />
        //main content goes here
        <main className="mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7">
          <div className="bg-white rounded-2xl shadow p-4 mb-4 border border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 w-full">
                <div className="text-gray-400 cursor-grab">≡</div>
                <input
                  className="text-lg font-semibold outline-none border-b border-transparent focus:border-blue-500 transition w-full"
                  placeholder="Judul Section"
                />
              </div>

              <div className="flex gap-2 items-center ml-2">
                <button title="Expand / Collapse">
                  <span className="text-gray-600 text-xl">⌄</span>
                </button>
                <button title="Naikkan Urutan">
                  <span className="text-gray-600 text-xl">↑</span>
                </button>
                <button title="Turunkan Urutan">
                  <span className="text-gray-600 text-xl">↓</span>
                </button>
                <button title="Hapus Section">
                  <span className="text-red-500 text-xl">🗑</span>
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div
                className="min-h-[200px] bg-white border rounded-lg p-2"
                id="editor-placeholder"
              >
                {/* Quill akan di-mount di sini nanti */}
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  placeholder="Tulis konten di sini..."
                  className="h-36 border-0 shadow-none"
                />
              </div>

              <div className="flex justify-between items-center mt-4">
                <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
                  Simpan
                </button>
                <button className="text-blue-600 flex items-center gap-1 hover:underline">
                  ➕ Tambah Sub-section
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
