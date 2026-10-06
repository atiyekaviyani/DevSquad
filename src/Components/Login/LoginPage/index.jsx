import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaPhoneAlt,
  FaMoon,
  FaSun,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { AuthContext } from "../../../context/AuthContext";

const BASE_URL = "https://dorane.ir/api/v1";

const schema = Yup.object({
  phone: Yup.string().when("step", {
    is: "login",
    then: (s) =>
      s
        .required("شماره همراه الزامی است")
        .matches(/^09\d{9}$/, "شماره همراه معتبر نیست"),
    otherwise: (s) => s,
  }),

  // OTP چهار رقمی
  otp: Yup.string().when("step", {
    is: "otp",
    then: (s) =>
      s
        .required("کد تایید الزامی است")
        .matches(/^\d{4}$/, "کد تایید باید ۴ رقمی باشد"),
    otherwise: (s) => s,
  }),

  step: Yup.string().required(),
});

const Index = () => {
  const { login } = useContext(AuthContext);

  const [dark, setDark] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="w-full max-w-md p-10 relative">
        {/* =========================
            Dark / Light
        ========================= */}
        <button
          type="button"
          onClick={() => setDark(!dark)}
          className={`absolute top-6 right-6 text-xl transition-colors ${
            dark ? "text-white" : "text-gray-700"
          }`}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        <h1 className="text-3xl font-semibold text-center">
          به لونا شاپ خوش آمدید!
        </h1>

        <br />

        <h2
          className={`text-center text-sm ${
            dark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          شماره همراه خود را وارد کنید
        </h2>

        <Formik
          initialValues={{
            phone: "",
            otp: "",
            step: "login",
          }}
          validationSchema={schema}
          onSubmit={async (values, { setFieldValue, setSubmitting }) => {
            setApiError("");
            setApiMessage("");

            try {
              // =====================================================
              // مرحله اول: ارسال OTP
              // =====================================================
              if (values.step === "login") {
                const response = await fetch(`${BASE_URL}/otp/send`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    phone: values.phone,
                  }),
                });

                const text = await response.text();

                let data = {};

                try {
                  data = text ? JSON.parse(text) : {};
                } catch {
                  data = {};
                }

                console.log("SEND OTP STATUS:", response.status);
                console.log("SEND OTP RESPONSE:", data);

                if (!response.ok || data.status !== true) {
                  throw new Error(
                    data.message || "ارسال کد با خطا مواجه شد"
                  );
                }

                setApiMessage(data.message || "کد تایید ارسال شد");

                // پاک کردن OTP قبلی
                await setFieldValue("otp", "");

                // رفتن به مرحله OTP
                await setFieldValue("step", "otp");

                return;
              }

              // =====================================================
              // مرحله دوم: تایید OTP
              // =====================================================
              if (values.step === "otp") {
                const phone = values.phone.trim();
                const otp = String(values.otp).trim();

                // OTP باید ۴ رقمی باشد
                if (!/^\d{4}$/.test(otp)) {
                  setApiError("کد تایید باید ۴ رقمی باشد.");
                  return;
                }

                // =====================================================
                // اطلاعات ارسال شده به بک‌اند
                // =====================================================
                const requestBody = {
                  phone: phone,
                  otp_code: otp,
                };

                console.log("VERIFY REQUEST:", requestBody);

                // =====================================================
                // درخواست Verify
                // =====================================================
                const response = await fetch(`${BASE_URL}/otp/verify`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify(requestBody),
                });

                const text = await response.text();

                console.log("VERIFY STATUS:", response.status);
                console.log("VERIFY RESPONSE:", text);

                let data = {};

                try {
                  data = text ? JSON.parse(text) : {};
                } catch {
                  data = {};
                }

                // =====================================================
                // بررسی خطای HTTP
                // =====================================================
                if (!response.ok) {
                  throw new Error(
                    data?.message ||
                      "کد تایید صحیح نیست یا درخواست نامعتبر است."
                  );
                }

                // =====================================================
                // بررسی وضعیت API
                // =====================================================
                if (data.status !== true) {
                  throw new Error(
                    data?.message || "کد تایید صحیح نیست."
                  );
                }

                // =====================================================
                // ورود به AuthContext و ذخیره اطلاعات کاربر
                // =====================================================
                if (data?.data?.token) {
                  login(
                    data.data.token,
                    data?.data?.user
                  );
                }

                setApiMessage(
                  data.message || "ورود با موفقیت انجام شد"
                );

                // =====================================================
                // کاربر جدید / قدیمی
                // =====================================================
                if (data?.data?.is_new === true) {
                  navigate("/Register");
                } else {
                  navigate("/Panel");
                }
              }
            } catch (error) {
              console.error("AUTH ERROR:", error);

              setApiError(
                error?.message || "خطایی رخ داد، دوباره تلاش کنید"
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col gap-6 mt-8">
              {/* =================================================
                  مرحله شماره موبایل
              ================================================= */}
              {values.step === "login" && (
                <div className="relative">
                  <FaPhoneAlt
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                      dark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />

                  <Field
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    dir="ltr"
                    placeholder="09123456789"
                    className={`w-full h-12 pr-12 px-4 rounded-lg border text-right outline-none transition-all duration-200 ${
                      dark
                        ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                        : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-400"
                    }`}
                  />

                  {errors.phone && touched.phone && (
                    <motion.div className="text-red-400 text-xs mt-2 flex gap-2">
                      <FaExclamationCircle />
                      {errors.phone}
                    </motion.div>
                  )}
                </div>
              )}

              {/* =================================================
                  مرحله OTP
              ================================================= */}
              {values.step === "otp" && (
                <>
                  <div
                    className={`text-center text-sm ${
                      dark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    کد ارسال شده به شماره{" "}
                    <span
                      className={dark ? "text-white" : "text-gray-900"}
                    >
                      {values.phone}
                    </span>{" "}
                    را وارد کنید
                  </div>

                  <div className="relative">
                    <Field
                      name="otp"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={4}
                      dir="ltr"
                      placeholder="1234"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                      className={`w-full h-12 px-4 rounded-lg border text-center tracking-[8px] outline-none transition-all duration-200 ${
                        dark
                          ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                          : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-400"
                      }`}
                    />

                    {errors.otp && touched.otp && (
                      <motion.div className="text-red-400 text-xs mt-2 flex gap-2">
                        <FaExclamationCircle />
                        {errors.otp}
                      </motion.div>
                    )}
                  </div>

                  {/* تغییر شماره */}
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue("step", "login");
                      setFieldValue("otp", "");
                      setApiError("");
                      setApiMessage("");
                    }}
                    className={`text-sm transition-colors ${
                      dark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    تغییر شماره موبایل
                  </button>
                </>
              )}

              {/* =================================================
                  پیام موفقیت
              ================================================= */}
              {apiMessage && (
                <div className="text-green-500 text-sm text-center">
                  {apiMessage}
                </div>
              )}

              {/* =================================================
                  خطای API
              ================================================= */}
              {apiError && (
                <div className="text-red-400 text-sm text-center flex items-center justify-center gap-2">
                  <FaExclamationCircle />
                  {apiError}
                </div>
              )}

              {/* =================================================
                  Submit
              ================================================= */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg transition-all duration-200 disabled:opacity-50 ${
                  dark
                    ? "bg-black text-white hover:bg-gray-950"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {isSubmitting
                  ? "لطفاً صبر کنید..."
                  : values.step === "login"
                    ? "ارسال کد تایید"
                    : "تایید کد"}
              </button>
            </Form>
          )}
        </Formik>

        {/* =================================================
            لینک‌ها
        ================================================= */}
        <div
          className={`flex justify-between mt-8 text-sm ${
            dark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <NavLink
            to="/Register"
            className={`transition-colors ${
              dark ? "hover:text-white" : "hover:text-gray-900"
            }`}
          >
            ایجاد حساب
          </NavLink>

          <NavLink
            to="/ChangePass"
            className={`transition-colors ${
              dark ? "hover:text-white" : "hover:text-gray-900"
            }`}
          >
            فراموشی رمز
          </NavLink>

          <NavLink
            to="/"
            className={`transition-colors ${
              dark ? "hover:text-white" : "hover:text-gray-900"
            }`}
          >
            بازگشت
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Index;