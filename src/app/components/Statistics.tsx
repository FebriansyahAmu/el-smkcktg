import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaSchool,
} from "react-icons/fa";

function Statistics() {
  const stats = [
    {
      icon: <FaUserGraduate size={50} />,
      title: "Students",
      count: 1200,
    },
    {
      icon: <FaChalkboardTeacher size={50} />,
      title: "Teachers",
      count: 80,
    },
    {
      icon: <FaBook size={50} />,
      title: "Courses",
      count: 50,
    },
    {
      icon: <FaSchool size={50} />,
      title: "Campuses",
      count: 3,
    },
  ];
  return (
    <section className="py-8 mt-16 bg-slate-900">
      <div className="container mx-auto mt-20">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-white p-6 rounded shadow-md bg-slate-700 mb-20"
            >
              {stat.icon}
              <h3 className="mt-4 text-2xl font-semibold">{stat.title}</h3>
              <p className="mt-2 text-xl">{stat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;
