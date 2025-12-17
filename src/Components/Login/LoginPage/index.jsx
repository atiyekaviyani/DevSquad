import { Field, Form, Formik } from "formik";
import React from "react";
import { NavLink } from "react-router-dom";

const Index = () => {
  const onSubmit = (values) => {
    const obj = {
      phoneOrGmail: values.phone,
      password: values.pass,
      rememberMe: true,
    };
    console.log("فرم ارسال شد:", obj);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md p-10">
        <h1 className="text-3xl font-semibold mb-2 text-white text-center">
         ! به لونا شاپ خوش آمدید
        </h1>
        <p className="text-gray-400 mb-8 text-center">
          برای ورود به حساب خود ایمیل و رمز عبور خود را وارد کنید
        </p>

        <Formik initialValues={{ phone: "", pass: "" }} onSubmit={onSubmit}>
          <Form className="flex flex-col gap-6">
            <Field
              name="phone"
              placeholder="شماره همراه"
              className="w-full h-12 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
            <Field
              name="pass"
              type="password"
              placeholder="رمز عبور"
              className="w-full h-12 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            />

            <label className="flex items-center gap-3 text-gray-300 text-sm select-none cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-gray-300 focus:ring-2 focus:ring-gray-400"
              />
              مرا به خاطر بسپار
            </label>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg shadow-lg hover:bg-gray-950 transition duration-300 font-semibold"
            >
              تایید
            </button>

            <NavLink
              to="/"
              className="block text-center mt-6 text-gray-400 hover:text-gray-200 transition"
            >
              بازگشت به صفحه اصلی
            </NavLink>

            <div className="flex justify-between mt-6 text-sm text-gray-400">
              <NavLink to="/Register" className="hover:text-gray-200 transition">
                ایجاد حساب کاربری
              </NavLink>
              <NavLink to="" className="hover:text-gray-200 transition">
                فراموشی رمز
              </NavLink>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Index;
