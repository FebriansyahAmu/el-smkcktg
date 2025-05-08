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
import { fetchModules } from "@/app/services/getModules";
import { FaEye, FaEdit } from "react-icons/fa";
import Link from "next/link";

type ModulProps = {
  id_course: number;
};

const Modul = ({ id_course }: ModulProps) => {
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
      const response = await fetch("/api/moduls/create", {
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

    const sendingData = {
      ...formData,
      id_course,
    };

    try {
      //fetch kirim form disini
      await addModulMutation.mutateAsync(sendingData);
      setFormData({ title: "", description: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      //setLoading(false) nanti
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["modules"],
    queryFn: () => fetchModules(id_course),
    enabled: !!id_course,
  });

  const modul = data?.data || [];

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setOpenModal(true)}>Tambah Modul</Button>
      </div>
      {modul.map((modul: any) => {
        return (
          <div className="w-full mt-4">
            <div className="flex w-full flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100 transition">
              <div className="w-full md:w-48 h-96 md:h-full ">
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
                  src="/Images/logo.webp"
                  alt=""
                />
              </div>
              <div className="flex w-full  flex-col justify-between p-10 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {modul.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700">
                  {modul.description}
                </p>
              </div>
              <div className="flex justify-end gap-2 p-5">
                <Link
                  href={`/guru/kelas/${modul.id_course}/modul/${modul.id_modules}`}
                  className="inline-flex items-center gap-2 px-4  py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                  aria-label="Lihat detail modul"
                >
                  <FaEye /> View content
                </Link>

                <Link
                  href={`/guru/kelas/${modul.id_course}/modul/${modul.id_modules}/edit`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                  aria-label="Edit modul"
                >
                  <FaEdit /> Edit content
                </Link>
              </div>
            </div>
          </div>
        );
      })}
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
};

export default Modul;
