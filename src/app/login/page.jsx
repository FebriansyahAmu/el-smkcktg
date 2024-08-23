"use client";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  return (
    <>
      <Navbar />
      <section className="min-h-screen overflow-hidden flex justify-center items-center ">
        <Background />
        <div className="p-6 bg-gray-200 rounded max-w-md w-full  lg:max-w-8xl">
          <h2 className="text-2xl font-semibold leading-7 text-gray-700 text-center">
            Login <span className="italic text-blue-700">EL-</span>smkcktg
          </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8">
                <div className="col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full h-10 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-blue-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 leading-6 focus:outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-2 text-sm text-red-600 "
                    />
                  </div>
                </div>
                <div className="col-span-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="block w-full h-10 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-blue-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 leading-6 focus:outline-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  <div className="col-span-6 flex justify-center mt-7">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      className="inline-flex justify-center rounded bg-blue-700 py-2 px-6 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    >
                      {isSubmitting ? "Submitting..." : "Login"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-lg text-gray-800 text-center">
          <h1 className="text-sm md:text-base lg:text-lg">
            <span className="text-blue-700 ">E Learning-</span>
            Smk Cokroaminoto Kotamobagu
          </h1>
          <p className="text-center text-sm text-gray-600 mt-1">
            &copy;{new Date().getFullYear()} WriteLine. All rights reserved
          </p>
        </div>
      </section>
    </>
  );
}
