"use client";
import { useState } from "react";
import Link from "next/link";
import { HiCloudUpload, HiUser } from "react-icons/hi";
import { FiFile } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { assignmentsSummaryType } from "@/app/lib/types/assignmentsSummary";
import { format } from "date-fns";

type IDCProps = {
  id_course: number;
  assignments: assignmentsSummaryType[];
};

export default function TugasPages({ id_course, assignments }: IDCProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tipe_tugas: null as "Individu" | "Kelompok" | null,
    date: "",
    time: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (val: "Individu" | "Kelompok") => {
    setFormData((prev) => ({ ...prev, tipe_tugas: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!file) return null;

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/uploads/assigments", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("upload gagal");
      }

      const json = await res.json();
      return json.fileUrl as string;
    } catch (error) {
      alert("gagal upload file");
      return null;
    }
  };

  const handleSubmit = async () => {
    let fileUrl = null;

    if (file) {
      fileUrl = await uploadFile();
      if (!fileUrl) {
        return;
      }
    }

    const payload = {
      id_course,
      ...formData,
      file_url: fileUrl,
    };

    const res = await fetch("/api/instructors/courses/assigments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res) {
      alert("Terjadi kesalahan");
    } else {
      alert("BErhasil membuat tugas");
    }
  };

  return (
    <div className="flex-1 mt-4 mb-8 max-w-7xl">
      <section className="w-full flex justify-between items-center mb-8">
        <div>
          <h3 className="text-3xl font-semibold text-gray-900">
            Buat Tugas Baru
          </h3>
          <p className="mt-2 text-gray-600">
            Buat dan kelola tugas untuk siswa anda
          </p>
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200 transition-colors">
          Kembali
        </button>
      </section>

      <section className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:cols-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-md font-semibol text-gray-800 mb-6">
                Detail Tugas
              </h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Tugas
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  id="judul"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  placeholder="Misal: Tugas Matematika Aljabar"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Tulis deskripsi tugas..."
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lampirkan file
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex justify-center">
                    <HiCloudUpload className="text-3xl text-gray-400 mb-3" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop file disini atau klik untuk mengunggah
                  </p>
                  <input
                    type="file"
                    name="testing"
                    onChange={handleFileChange}
                    role="button"
                    accept=".pdf,.docx,.pptx,.xlsx"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Format dokument, presentasi, spreadsheet (PDF, DOCX, PPTX,
                    XLSX)
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Tugas
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-600">
                    <input
                      type="radio"
                      name="tipe_tugas"
                      checked={formData.tipe_tugas === "Individu"}
                      onChange={() => handleTypeChange("Individu")}
                      className="h-4 w-4 text-gray-700"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">
                        Tugas Individu
                      </p>
                      <p className="text-xs text-gray-500">
                        Siswa mengerjakan sendiri
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-600">
                    <input
                      type="radio"
                      name="tipe_tugas"
                      checked={formData.tipe_tugas === "Kelompok"}
                      onChange={() => handleTypeChange("Kelompok")}
                      className="h-4 w-4 text-gray-700"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">
                        Tugas kelompok
                      </p>
                      <p className="text-xs text-gray-500">
                        Siswa bekerjasama dalam kelompok
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Tenggat
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-700 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waktu Tenggat
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-700 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-900 transition-colors"
                >
                  Simpan Tugas
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-5">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Informasi Kelas
              </h2>
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c1fe19c2-f00a-4652-b851-b1c2c5087bde.png"
                  alt="Foto kelas dengan papan tulis yang terlihat di latar belakang dan beberapa siswa"
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    Pemogramman Website
                  </h3>
                  <p className="text-sm text-gray-500">
                    TP. 2023/2024 - Semester Genap
                  </p>
                  <div className="flex items-center mt-1">
                    <HiUser className="mr-2" />
                    <span className="text-xs text-gray-500">20 Siswa</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Daftar Tugas
              </h2>

              <div className="space-y-4">
                {assignments.length === 0 ? (
                  <p className="text-gray-600">Belum ada tugas.</p>
                ) : (
                  assignments.map((assignment) => (
                    <div
                      key={assignment.id_assigment}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
                        {assignment.title}
                      </h3>

                      <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                        {assignment.description}
                      </p>

                      <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>
                          Dibuat:{" "}
                          {format(
                            new Date(assignment.created_at),
                            "dd/MM/yyyy"
                          )}
                        </span>
                      </div>

                      <div className="flex items-center text-xs text-red-500 mb-2">
                        <FiClock className="mr-1" />
                        Deadline waktu:{" "}
                        <span className="ml-1 text-gray-700 font-medium">
                          {format(
                            new Date(assignment.due_date),
                            "dd/MM/yyyy HH:mm"
                          )}
                        </span>
                      </div>

                      <div className="text-right">
                        <Link
                          href={`${id_course}/tugas/${assignment.id_assigment}`}
                        >
                          <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded transition">
                            Detail
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
