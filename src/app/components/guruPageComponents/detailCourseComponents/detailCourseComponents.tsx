"use client";
import { useState } from "react";
import NavDashboard from "@/app/components/NavDashboard";
import Sidebar from "@/app/components/Sidebar";
import Modul from "@/app/components/courseDetailComponents/Modul";
import Murid from "@/app/components/courseDetailComponents/Murid";
import TugasPages from "../tugasComponents/tugasComponents";
import { TabItem, Tabs } from "flowbite-react";
import { assignmentsSummaryType } from "@/app/lib/types/assignmentsSummary";
import DaftarHadir from "../daftarHadirComponents/daftarHadir";

type CourseIDProps = {
  id_course: number;
  assignments: assignmentsSummaryType[];
  enrollToken: string;
};

export default function GuruCourseTabs({
  id_course,
  assignments,
  enrollToken,
}: CourseIDProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

        <main className="mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p7">
          <Tabs aria-label="Default tabs" variant="default">
            <TabItem title="Modul">
              <Modul id_course={id_course} />
            </TabItem>
            <TabItem title="Tugas">
              <TugasPages id_course={id_course} assignments={assignments} />
            </TabItem>
            <TabItem title="Murid">
              <Murid id_course={id_course} enrollments_token={enrollToken} />
            </TabItem>
            <TabItem title="Daftar Hadir">
              <DaftarHadir id_course={id_course} />
            </TabItem>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
