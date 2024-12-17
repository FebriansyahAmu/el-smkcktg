"use client";
import { useState } from "react";
import NavDashboard from "@/app/components/NavDashboard";
import Sidebar from "@/app/components/Sidebar";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <NavDashboard toggleSidebar={toggleSidebar} />
        <main className="p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7">
          <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

          {/* Statistik */}
          <section className="grid grid-cols-1 md:grid-cols-3 lg:ml-0 gap-6 mb-6">
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">Monthly Sales</h2>
              <p className="text-3xl font-bold text-green-600">$12,345</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">Pending Orders</h2>
              <p className="text-3xl font-bold text-red-600">56</p>
            </div>
          </section>

          {/* Grafik */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
            <div className="p-4 bg-white shadow rounded-lg">
              <p>
                Grafik placeholder (Anda dapat mengganti dengan chart library
                seperti Chart.js atau Recharts)
              </p>
            </div>
          </section>

          {/* Aktivitas Terbaru */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="bg-white shadow rounded-lg">
              <ul className="divide-y divide-gray-200">
                <li className="p-4">User John Doe signed up</li>
                <li className="p-4">Order #1234 has been processed</li>
                <li className="p-4">Product "Widget A" was updated</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
