import React from "react";
import { FaBell } from "react-icons/fa";

function MuridPageNavRead() {
  const progress = 65;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
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

          {/* Menu Kanan */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Progress Bar Inline */}
            <div className="flex items-center space-x-3 w-64">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Progress: {progress}%
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Notifikasi & Profil */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5754be22-ca58-43a4-9a20-c842db41d8c7.png"
                alt="Foto profil murid"
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

export default MuridPageNavRead;
