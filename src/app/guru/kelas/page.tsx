"use client";
import { useState, useEffect } from "react";
import NavDashboard from "@/app/components/NavDashboard";
import Sidebar from "@/app/components/Sidebar";
import { Button, Modal, Label, TextInput, Textarea } from "flowbite-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCourses } from "@/app/services/getCourses";

export default function DaftarKelas() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const [title, setTitle] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState<{ title: boolean; description: boolean }>({
    title: false,
    description: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // useEffect(() => {
  //   setError((prev) => ({
  //     ...prev,
  //     title: formData.title.trim() === "",
  //   }));
  // }, [formData.title]);

  //fetching data to api

  interface Course {
    id_course: number;
    title: string;
    description: string;
  }

  const addCourseMutation = useMutation<
    Course,
    Error,
    { title: string; description: string },
    { previousCourses?: Course[] }
  >({
    mutationFn: async (newCourse) => {
      console.log("Submitting course:", newCourse); // ✅ Debugging

      const response = await fetch("/api/courses/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal membuat kelas");
      }

      return response.json();
    },

    onSuccess: (data) => {
      alert(data.message || "Kelas berhasil dibuat!"); // ✅ Menampilkan alert sukses
    },

    onError: (err, newCourse, context) => {
      console.error("Mutation error:", err); // ✅ Debugging
      if (context?.previousCourses) {
        queryClient.setQueryData(["courses"], context.previousCourses);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const handleValidation = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: formData.title.trim() === "",
      description: formData.description.trim() == "",
    };

    setError(newErrors);
    if (newErrors.title || newErrors.description) {
      return;
    }
    try {
      console.log("Sending data:", formData); // ✅ Debugging
      await addCourseMutation.mutateAsync(formData);
      setFormData({ title: "", description: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      // setLoading(false) ini tambahkan loading spinner nanti yak
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const courses = data?.data || [];

  return (
    <div className="flex h-screen overflow-auto bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <NavDashboard toggleSidebar={toggleSidebar} />
        <main className="mt-14 p-4 md:ml-14 md:p-7 lg:ml-0 lg:p-7">
          <h1 className="text-2xl font-bold mb-4">Daftar Courses</h1>

          {/* Statistik */}
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="flex justify-self-end text-white bg-green-700  font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Buat Courses
          </button>
          {/* <Button>Toggle modal</Button> */}
          <section className="grid lg:ml-0 gap-2 lg:grid-cols-3 md:grid-cols-2  justify-center items-center mb-6 mx-auto">
            {courses.map((course: any) => {
              return (
                <div className="max-w-sm gap-2 mt-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#" className="flex justify-center items-center">
                    <img
                      className="rounded-t-lg"
                      src="/Images/logo.webp"
                      alt=""
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5
                        className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                        key={course.id_course}
                      >
                        {course.Title}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {course.Description}
                    </p>
                    <a
                      href={`/guru/kelas/${course.id_course}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              );
            })}
          </section>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Buat Kelas Baru</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <form
                  className="flex max-w-md flex-col gap-4 mx-auto"
                  onSubmit={handleValidation}
                >
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="title" value="Title Kelas" />
                    </div>
                    <TextInput
                      id="title"
                      type="text"
                      name="title"
                      placeholder="Contoh: Rekayasa Perangkat Lunak Kelas XII"
                      value={formData.title}
                      onChange={handleChange}
                      color={error.title ? "failure" : undefined} // Warna merah jika error
                    />
                    {error.title && (
                      <p className="text-sm text-red-600">
                        <span className="font-medium">Oops!</span> Berikan title
                        yang valid.
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="description" value="Description" />
                    </div>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      placeholder="Description"
                      onChange={handleChange}
                      color={error.description ? "failure" : undefined}
                    />
                    {error.description && (
                      <p className="text-sm text-red-600">
                        <span className="font-medium">Oops!</span> Deskripsi
                        tidak boleh kosong!
                      </p>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Button type="submit">Buat Kelas</Button>
                  </div>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-end">
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Batal
              </Button>
            </Modal.Footer>
          </Modal>
        </main>
      </div>
    </div>
  );
}
