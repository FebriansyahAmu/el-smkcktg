"use client";
import React, { useEffect, useState } from "react";

function Header() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('/Images/students.jpg')",
        backgroundAttachment: "fixed",
        backgroundPositionY: `${offsetY * 0.05}px`, // Parallax effect reduced
      }}
    >
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="relative z-0 grid grid-cols-1 max-w-4xl mx-auto p-8">
        <h1 className="font-extrabold text-5xl text-white text-center">
          <span className="text-blue-700">E Learning </span>
          SMK Cokroaminoto Kotamobagu
        </h1>
        <p className="text-base text-white mt-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, quis.
          Labore, architecto assumenda, officiis, soluta facere ab blanditiis
          voluptatum debitis non quae quam necessitatibus harum sed esse in enim
          at!
        </p>
        <div className="flex justify-center items-center mt-4">
          <a
            href="/register"
            className="text-white text-center font-semibold py-3 bg-blue-800 px-4 rounded border-blue-700 hover:bg-blue-900 hover:text-white"
          >
            Daftar Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}

export default Header;
