"use client";
import { useState } from "react";
import NavDashboard from "../components/NavDashboard";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  // Jangan lupa untuk kapitalisasi nama komponen menjadi `Dashboard`
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavDashboard toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Content goes here */}
      <main></main>
    </>
  );
}
