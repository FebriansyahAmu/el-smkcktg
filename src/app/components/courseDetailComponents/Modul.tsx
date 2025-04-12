"use client";
import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

function Modul() {
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

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

  interface Modul {
    id_Course: number;
    title: string;
    description: string;
  }

  const addModulMutation = useMutation<
    Modul,
    Error,
    { id_course: number; title: string; description: string },
    { previouseModul?: Modul[] }
  >({
    mutationFn: async (newModul) => {
      const response = await fetch("api/modul/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newModul),
      });

      return response.json();
    },

    onSuccess: (data) => {
      alert(data.message || "Modul berhasil dibuat");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },

    onError: (err, newModul, context) => {
      if (context?.previouseModul) {
        queryClient.setQueryData(["modules"], context.previouseModul);
      }
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

    const params = useParams();
    const id_course = Number(params.id);

    try {
      addModulMutation.mutate({
        id_course: id_course,
        title: formData.title,
        description: formData.description,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      //setLoading(false) nanti
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setOpenModal(true)}>Tambah Modul</Button>
      </div>
      <a
        href="#"
        className="flex flex-col mt-4 w-full items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row  hover:bg-gray-100 "
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
          src="/Images/logo.webp"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </a>
      {/* modal goes here */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Tambah Modul</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <form
              className="flex max-w-md flex-col gap-4 mx-auto"
              onSubmit={handleValidation}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title Modul" />
                  <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Contoh: Dasar - dasar pemrograman web"
                    color={error.title ? "failure" : undefined}
                  />
                  {error.title && (
                    <p className="text-sm text-red-600">
                      <span className="font-medium">Oops!</span> Berikan title
                      yang valid!
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="description" value="Description" />
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Deskripsi"
                  value={formData.description}
                  onChange={handleChange}
                  color={error.description ? "failure" : undefined}
                />
                {error.description && (
                  <p className="text-sm text-red-600">
                    <span className="font-medium">Oops!</span> Deskripsi tidak
                    boleh kosong!
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <Button type="submit">Tambah Modul</Button>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Modul;
