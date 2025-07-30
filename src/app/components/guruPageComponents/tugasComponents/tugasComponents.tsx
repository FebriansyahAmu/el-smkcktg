"use client";
import { useState } from "react";
import Link from "next/link";
import { HiCloudUpload, HiUser } from "react-icons/hi";
import { FiFile } from "react-icons/fi";

export default function TugasPages() {
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
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary rounded-lg hover:bg-gray-300 transition-colors">
                    <FiFile className="text-base" />
                    <span className="text-sm font-medium">Pilih File</span>
                  </button>
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
                      className="h-4 w-4 text-gray-700"
                      checked
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
                    <input type="radio" className="h-4 w-4 text-gray-700" />
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-700 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waktu Tenggat
                  </label>
                  <input
                    type="time"
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
                  className="px-6 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-900 transition-colors"
                >
                  Simpan Tugas
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="flex items-start space-x-4 mb-4">
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
          </div>
        </div>
      </section>
    </div>
  );
}
