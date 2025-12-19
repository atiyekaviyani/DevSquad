import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import {
  FaPhoneAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaMoon,
  FaSun,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import * as Yup from "yup";

const schema = Yup.object({
  phone: Yup.string().when("step", {
    is: "login",
    then: (s) => s.required(" ایمیل الزامی است"),
  }),
  pass: Yup.string().when("step", {
    is: "login",
    then: (s) => s.required("رمز عبور الزامی است"),
  }),
  otp: Yup.string().when("step", {
    is: "otp",
    then: (s) =>
      s.required("کد تایید الزامی است").length(5, "کد باید ۵ رقمی باشد"),
  }),
});

const Index = () => {
  const [dark, setDark] = useState(true);
  const [showPass, setShowPass] = useState(false);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <div className="w-full max-w-md p-10 relative">
        <button
          onClick={() => setDark(!dark)}
          className="absolute top-6 right-6 text-xl"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        <h1 className="text-3xl font-semibold text-center">
مشخصات کاربری        </h1>
        <br />
        <h2 className="ml-20">
ایمیل و پسورد خود را وارد کنید        </h2>

        <Formik
          initialValues={{ phone: "", pass: "", otp: "", step: "login" }}
          validationSchema={schema}
          onSubmit={(values, { setFieldValue }) => {
            if (values.step === "login") {
              setFieldValue("step", "otp");
            } else {
              console.log("Submit OTP", values);
            }
          }}
        >
          {({ values, errors, touched }) => (
            <Form className="flex flex-col gap-6 mt-8">
              {values.step === "login" && (
                <>
                  {/* Phone */}
                  <div className="relative">
                    <FaPhoneAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      name="phone"
                      dir="rtl"
                      placeholder="ایمیل "
                      className="w-full h-12 pr-12 px-4 rounded-lg bg-gray-700 border border-gray-600 text-right"
                    />
                    {errors.phone && touched.phone && (
                      <motion.div className="text-red-400 text-xs mt-2 flex gap-2">
                        <FaExclamationCircle />
                        {errors.phone}
                      </motion.div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                    >
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <Field
                      name="pass"
                      type={showPass ? "text" : "password"}
                      dir="rtl"
                      placeholder="رمز عبور"
                      className="w-full h-12 pr-12 pl-12 px-4 rounded-lg bg-gray-700 border border-gray-600 text-right"
                    />
                    {errors.pass && touched.pass && (
                      <motion.div className="text-red-400 text-xs mt-2 flex gap-2">
                        <FaExclamationCircle />
                        {errors.pass}
                      </motion.div>
                    )}
                  </div>
                </>
              )}

              {values.step === "otp" && (
                <div className="relative">
                  <Field
                    name="otp"
                    dir="rtl"
                    placeholder="کد تایید"
                    className="w-full h-12 px-4 rounded-lg bg-gray-700 border border-gray-600 text-right"
                  />
                  {errors.otp && touched.otp && (
                    <motion.div className="text-red-400 text-xs mt-2 flex gap-2">
                      <FaExclamationCircle />
                      {errors.otp}
                    </motion.div>
                  )}
                </div>
              )}

              <button type="submit" className="w-full bg-black py-3 rounded-lg">
                {values.step === "login" ? "تکمیل ثبت نام" : "تایید کد"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="flex justify-between mt-8 text-sm text-gray-400">
          <NavLink to="/">بازگشت</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Index;
