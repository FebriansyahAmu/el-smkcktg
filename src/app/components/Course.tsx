import React from "react";

function Course() {
  const courses = [
    {
      title: "Rekayasa Perangkat Lunak",
      images: "/Images/rpl.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis odio sint, mollitia tempora autem consectetur.",
    },
    {
      title: "Teknik Komputer dan Jaringan",
      images: "/Images/tkj.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis odio sint, mollitia tempora autem consectetur.",
    },
    {
      title: "Teknik Instalasi Tenaga Listrik",
      images: "/Images/listrik.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis odio sint, mollitia tempora autem consectetur.",
    },
    {
      title: "Teknik Pemesinan",
      images: "/Images/mesin.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis odio sint, mollitia tempora autem consectetur.",
    },
    {
      title: "Teknik Kendaraan Ringan",
      images: "/Images/tkr.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis odio sint, mollitia tempora autem consectetur.",
    },
    {
      title: "Teknik Bisnis Sepeda Motor",
      images: "/Images/tbsm.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis odio sint, mollitia tempora autem consectetur.",
    },
    {
      title: "Design Komunikasi Visual / Multimedia",
      images: "/Images/dkv2.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis odio sint, mollitia tempora autem consectetur.",
    },
    {
      title: "Design Pemodelan & Informasi Bangungan",
      images: "/Images/dpib.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis odio sint, mollitia tempora autem consectetur.",
    },
  ];

  return (
    <section className=" py-8 mt-16">
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-extrabold mb-10">Courses</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-center">
          {courses.map((course, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform will-change-transform transition-transform duration-300 hover:scale-[1.02]"
            >
              <a href="">
                <img
                  loading="lazy"
                  className="w-full h-[330px] rounded-t-lg object-cover"
                  src={course.images}
                  alt={course.title}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {course.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700">
                    {course.description}
                  </p>
                </a>
                <div className="mt-4 justify-center flex">
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Course;
