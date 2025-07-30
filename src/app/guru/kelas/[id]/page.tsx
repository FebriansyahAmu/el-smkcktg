"use client";
import { useState } from "react";
import NavDashboard from "@/app/components/NavDashboard";
import Sidebar from "@/app/components/Sidebar";
import Modul from "@/app/components/courseDetailComponents/Modul";
import Murid from "@/app/components/courseDetailComponents/Murid";
import { TabItem, Tabs } from "flowbite-react";
import { useParams } from "next/navigation";
import TugasPages from "@/app/components/guruPageComponents/tugasComponents/tugasComponents";

type CourseDetailPageProps = {
  params: {
    id: number;
  };
};

export default function CourseDetail({ params }: CourseDetailPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const id_course = Number(params.id);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-auto bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <NavDashboard toggleSidebar={toggleSidebar} />
        //main contents goes here
        <main className="mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7">
          <Tabs aria-label="Default tabs" variant="default">
            <TabItem title="Modul">
              <Modul id_course={id_course} />
            </TabItem>
            <TabItem title="Tugas">
              <TugasPages />
            </TabItem>
            <TabItem title="Murid">
              <Murid id_course={id_course} />
            </TabItem>
            <TabItem title="Daftar Hadir">Tugas</TabItem>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
