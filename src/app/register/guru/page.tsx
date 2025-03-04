"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Background from "@/app/components/Background";
import Link from "next/link";
import { registerGuru } from "@/app/services/registerGuru";

export default function RegisterGuru() {
  const validationSchema = Yup.object({
    name: Yup.string().required("Fullname is required"),
    email: Yup.string()
      .email("Invalid email addresss")
      .required("Email address is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Password must match")
      .required("Confirm Password is required"),
    konsentrasiKeahlian: Yup.string().required(
      "Please select a field of expertise"
    ),
  });

  const konsentrasiOptions = [
    "Rekayasa Perangkat Lunak",
    "Teknik Komputer dan Jaringan",
    "Teknik Instalasi Tenaga Listrik",
    "Teknik Pemesinan",
    "Teknik Kendaraan Ringan",
    "Teknik Bisnis Sepeda Motor",
    "Design Komunikasi Visual",
    "Desing Pemodelan & Informasi Bangunan",
  ];

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center">
        <Background />
        <div className="container w-full mx-auto px-4 flex items-center justify-center mt-20 overflow-hidden">
          <div className="flex flex-col lg:flex-row w-full max-w-6xl space-y-12 lg:space-y-0 lg:space-x-12 items-center">
            <div className="mt-10 md:mt-12 lg:mt-2 lg:w-1/2 px-4 py-2">
              <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold text-blue-700">
                Selamat Datang
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Suscipit, laborum ea iste sed sunt rem error adipisci
                repudiandae non excepturi quia voluptatum illum iusto omnis eos
                molestiae quam eum? Magni.
              </p>
              <Link
                href="/register"
                className="py-2 text-sm font-medium text-blue-700 hover:text-blue-800"
              >
                Daftar Sebagai Murid
              </Link>
            </div>
            <div className="w-full md:w-3/4 lg:w-1/2 shadow-lg rounded-lg p-8 bg-white">
              <h2 className="text-xl lg:text-2xl text-blue-700">
                Personal Information
              </h2>
              <p className="text-gray-400 m-1 text-sm mb-6">
                Lengkapi form ini untuk daftar akun
              </p>

              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    const result = await registerGuru(values);
                    alert("Registrasi berhasil: " + JSON.stringify(result));
                    resetForm();
                  } catch (error: any) {
                    alert("Error " + error.message);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nama Lengkap
                      </label>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 focus:outline-none"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="konsentrasiKeahlian"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Konsentrasi Keahlian
                      </label>
                      <Field
                        as="select"
                        id="konsentrasiKeahlian"
                        name="konsentrasiKeahlian"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 focus:outline-none"
                      >
                        <option value="">Pilih Konsentrasi</option>
                        {konsentrasiOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="konsentrasiKeahlian"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 focus:outline-none"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 focus:outline-none"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 focus:outline-none"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-900 "
                      >
                        Register Akun
                      </button>
                      <p className="text-gray-400 m1- text-sm mt-2">
                        Sudah punya akun?
                        <Link href="/login" className="text-blue-700">
                          <span> Login Sekarang</span>
                        </Link>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
