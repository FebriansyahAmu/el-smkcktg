"use client";
import { useState } from "react";
import UserNavDashboard from "../../components/userNavDashboard";
import UserSidebar from "@/app/components/userSidebar";

export default function Dashboard() {
  // Jangan lupa untuk kapitalisasi nama komponen menjadi `Dashboard`
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <UserNavDashboard toggleSidebar={toggleSidebar} />
      <UserSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Content goes here */}
      <main></main>
    </>
  );
}
