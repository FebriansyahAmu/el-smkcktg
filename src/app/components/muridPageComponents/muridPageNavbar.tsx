"use client";
import React from "react";
import { FaBell } from "react-icons/fa";

function MuridPageNavbar() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center justify-between flex-wrap">
          {/* Logo dan Judul */}
          <div className="flex items-center space-x-3">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0d1f3072-faa6-4e15-9cbd-a18a19506355.png"
              alt="Logo EduLearn"
              className="h-10 w-10 rounded-lg"
            />
            <span className="text-xl font-bold text-indigo-700">
              E-Learning
            </span>
          </div>

          {/* Placeholder menu kanan */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Tambahkan menu jika perlu */}
            <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
              Beranda
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
              Daftar Tugas
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
              Pengaturan
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-indigo-600">
              <i className="fas fa-bell text-lg"></i>
            </button>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-indigo-600">
                <FaBell className="text-lg" />
              </button>
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5754be22-ca58-43a4-9a20-c842db41d8c7.png"
                alt="Foto profil murid dengan latar belakang biru muda dan ekspresi ramah"
                className="h-8 w-8 rounded-full"
              />
              <span className="hidden md:inline text-sm font-medium">
                Nama Murid
              </span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default MuridPageNavbar;
