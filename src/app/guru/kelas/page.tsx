"use client";
import { useState } from "react";
import NavDashboard from "@/app/components/NavDashboard";
import Sidebar from "@/app/components/Sidebar";
import { Button, Modal, Label, TextInput, Textarea } from "flowbite-react";

export default function DaftarKelas() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const handleValidation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError(true);
    } else {
      setError(false);
    }
  };

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
          <section className="grid lg:ml-0 gap-6 mb-6">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#" className="flex justify-center items-center">
                <img className="rounded-t-lg" src="/Images/logo.png" alt="" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy technology acquisitions 2021
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                {/* <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                </a> */}
              </div>
            </div>

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
                        placeholder="Contoh: Rekayasa Perangkat Lunak Kelas XII"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        color={error ? "failure" : undefined} // Warna merah jika error
                      />
                      {error && (
                        <p className="text-sm text-red-600">
                          <span className="font-medium">Oops!</span> Berikan
                          title yang valid.
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="description" value="Description" />
                      </div>
                      <Textarea id="description" placeholder="Description" />
                    </div>
                    <div className="flex justify-center">
                      <Button type="submit">Buat Kelas</Button>
                    </div>
                  </form>
                </div>
              </Modal.Body>
              <Modal.Footer className="justify-end">
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Decline
                </Button>
              </Modal.Footer>
            </Modal>
          </section>
        </main>
      </div>
    </div>
  );
}
