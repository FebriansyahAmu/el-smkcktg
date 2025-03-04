"use client";
import Navbar from "../components/Navbar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Background from "../components/Background";
import { registerUser } from "../services/userService";
import Link from "next/link";

export default function Register() {
  const validationSchema = Yup.object({
    nisn: Yup.number().required("NISN is required"),
    name: Yup.string().required("Fullname is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center  ">
        <Background />
        <div className=" container w-full mx-auto px-4 flex items-center justify-center mt-20 overflow-hidden ">
          <div className="flex flex-col lg:flex-row w-full max-w-6xl  space-y-12 lg:space-y-0 lg:space-x-12 items-center ">
            <div className="mt-10 md:mt-2 lg:mt-2 lg:w-1/2 px-4 py-2">
              <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold text-blue-700">
                Selamat Datang
              </h2>
              <p className="mt-2 text-sm  text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores harum dicta veritatis officiis deleniti non eum quis?
                Maxime esse qui rem numquam nulla, ipsa debitis illo velit quis?
                Enim, molestias.
              </p>
              <Link
                href="/register/guru"
                className="inline-flex items-center justify-center py-2 text-sm font-medium text-blue-700 hover:text-blue-800"
              >
                Daftar Sebagai Guru
              </Link>
            </div>

            <div className="w-full md:w-3/4 lg:w-1/2 shadow-lg rounded-lg p-8 bg-white">
              <h2 className="text-xl md:text-2xl lg:text-2xl text-blue-700 font-semibold ">
                Personal Information
              </h2>
              <p className="text-gray-400 m-1 text-sm mb-6">
                Lengkapi form ini untuk daftar akun
              </p>
              <Formik
                initialValues={{
                  nisn: "",
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    const result = await registerUser(values);
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
                        htmlFor="nisn"
                        className="block text-sm font-medium text-gray-700"
                      >
                        NISN
                      </label>
                      <Field
                        id="nisn"
                        name="nisn"
                        type="number"
                        className="block w-44 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 focus:outline-none"
                      />
                      <ErrorMessage
                        name="nisn"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 focus:outline-none"
                      />

                      <ErrorMessage
                        name="name"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 focus:outline-none"
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
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 focus:outline-none"
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
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 focus:outline-none"
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
                        className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-900"
                      >
                        Register Akun
                      </button>
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
