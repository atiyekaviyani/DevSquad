// import React, { useState } from "react";
// import { Formik, Form, Field } from "formik";
// import { NavLink } from "react-router-dom";

// import {
//   FaPhoneAlt,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
//   FaMoon,
//   FaSun,
//   FaExclamationCircle,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import * as Yup from "yup";

// const schema = Yup.object({
//   phone: Yup.string().when("step", {
//     is: "login",
//     then: (s) => s.required("شماره همراه الزامی است"),
//   }),
//   pass: Yup.string().when("step", {
//     is: "login",
//     then: (s) => s.required("رمز عبور الزامی است"),
//   }),
//   otp: Yup.string().when("step", {
//     is: "otp",
//     then: (s) =>
//       s.required("کد تایید الزامی است").length(5, "کد باید ۵ رقمی باشد"),
//   }),
// });

// const Index = () => {
//   const [dark, setDark] = useState(true);
//   const [showPass, setShowPass] = useState(false);

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center p-6
//       ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
//     >
//       <div className="w-full max-w-md p-10 relative">
//         <button
//           onClick={() => setDark(!dark)}
//           className="absolute top-6 right-6 text-xl"
//         >
//           {dark ? <FaSun /> : <FaMoon />}
//         </button>

//         <h1 className="text-3xl font-semibold text-center">تغییر رمز عبور</h1>
//         <br />
//         <h2 className="ml-20">جهت دریافت کد شماره خود را وارد کنید</h2>

//         <Formik
//           initialValues={{ phone: "", pass: "", otp: "", step: "login" }}
//           validationSchema={schema}
//           onSubmit={(values, { setFieldValue }) => {
//             if (values.step === "login") {
//               setFieldValue("step", "otp");
//             } else {
//               console.log("Submit OTP", values);
//             }
//           }}
//         >
//           {({ values, errors, touched }) => (
//             <Form className="flex flex-col gap-6 mt-8">
//               {values.step === "login" && (
//                 <>
//                   {/* Phone */}
//                   <div className="relative">
//                     <FaPhoneAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                     <Field
//                       name="phone"
//                       dir="rtl"
//                       placeholder="شماره همراه"
//                       className="w-full h-12 pr-12 px-4 rounded-lg bg-gray-700 border border-gray-600 text-right"
//                     />
//                     {errors.phone && touched.phone && (
//                       <motion.div className="text-red-400 text-xs mt-2 flex gap-2">
//                         <FaExclamationCircle />
//                         {errors.phone}
//                       </motion.div>
//                     )}
//                   </div>
//                 </>
//               )}

//               {values.step === "otp" && (
//                 <div className="relative">
//                   <Field
//                     name="otp"
//                     dir="rtl"
//                     placeholder="کد تایید"
//                     className="w-full h-12 px-4 rounded-lg bg-gray-700 border border-gray-600 text-right"
//                   />
//                   {errors.otp && touched.otp && (
//                     <motion.div className="text-red-400 text-xs mt-2 flex gap-2">
//                       <FaExclamationCircle />
//                       {errors.otp}
//                     </motion.div>
//                   )}
//                 </div>
//               )}

//               <NavLink to="/ChangePass2">
//                 <button
//                   type="submit"
//                   className="w-full bg-black py-3 rounded-lg"
//                 >
//                   {values.step === "login" ? "ورود" : "تایید کد"}
//                 </button>
//               </NavLink>
//             </Form>
//           )}
//         </Formik>

//         <div className="flex justify-between mt-8 text-sm text-gray-400">
//           <NavLink to="/">بازگشت</NavLink>
//         </div>
       
//       </div>
//     </div>
//   );
// };

// export default Index;














// import React, { useState } from "react";
// import { Formik, Form, Field } from "formik";
// import { NavLink } from "react-router-dom";

// import {
//   FaPhoneAlt,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
//   FaMoon,
//   FaSun,
//   FaExclamationCircle,
// } from "react-icons/fa";

// import { motion } from "framer-motion";
// import * as Yup from "yup";

// const schema = Yup.object({
//   phone: Yup.string().when("step", {
//     is: "login",
//     then: (s) => s.required("شماره همراه الزامی است"),
//   }),

//   pass: Yup.string().when("step", {
//     is: "login",
//     then: (s) => s.required("رمز عبور الزامی است"),
//   }),

//   otp: Yup.string().when("step", {
//     is: "otp",
//     then: (s) =>
//       s
//         .required("کد تایید الزامی است")
//         .length(5, "کد باید ۵ رقمی باشد"),
//   }),
// });

// const Index = () => {
//   // پیش‌فرض: Light Mode
//   const [dark, setDark] = useState(false);

//   const [showPass, setShowPass] = useState(false);

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300
//       ${
//         dark
//           ? "bg-gray-900 text-white"
//           : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       <div className="w-full max-w-md p-10 relative">

//         {/* Theme Toggle */}
//         <button
//           type="button"
//           onClick={() => setDark(!dark)}
//           className={`absolute top-6 right-6 text-xl transition-colors
//             ${
//               dark
//                 ? "text-white hover:text-gray-300"
//                 : "text-gray-700 hover:text-gray-900"
//             }`}
//         >
//           {dark ? <FaSun /> : <FaMoon />}
//         </button>

//         {/* Title */}
//         <h1 className="text-3xl font-semibold text-center">
//           تغییر رمز عبور
//         </h1>

//         <br />

//         <h2
//           className={`text-center text-sm
//             ${dark ? "text-gray-400" : "text-gray-500"}`}
//         >
//           جهت دریافت کد شماره خود را وارد کنید
//         </h2>

//         <Formik
//           initialValues={{
//             phone: "",
//             pass: "",
//             otp: "",
//             step: "login",
//           }}
//           validationSchema={schema}
//           onSubmit={(values, { setFieldValue }) => {
//             if (values.step === "login") {
//               setFieldValue("step", "otp");
//             } else {
//               console.log("Submit OTP", values);
//             }
//           }}
//         >
//           {({ values, errors, touched }) => (
//             <Form className="flex flex-col gap-6 mt-8">

//               {/* =========================
//                   مرحله شماره موبایل و رمز
//               ========================= */}
//               {values.step === "login" && (
//                 <>
//                   {/* Phone */}
//                   <div className="relative">

//                     <FaPhoneAlt
//                       className={`absolute right-4 top-1/2 -translate-y-1/2
//                         ${
//                           dark
//                             ? "text-gray-400"
//                             : "text-gray-500"
//                         }`}
//                     />

//                     <Field
//                       name="phone"
//                       dir="rtl"
//                       placeholder="شماره همراه"
//                       className={`w-full h-12 pr-12 px-4 rounded-lg border text-right outline-none transition-all duration-200
//                         ${
//                           dark
//                             ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
//                             : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-400"
//                         }`}
//                     />

//                     {errors.phone && touched.phone && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -5 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="text-red-400 text-xs mt-2 flex gap-2 items-center"
//                       >
//                         <FaExclamationCircle />
//                         {errors.phone}
//                       </motion.div>
//                     )}
//                   </div>

//                   {/* Password */}
//                   <div className="relative">

//                     <FaLock
//                       className={`absolute right-4 top-1/2 -translate-y-1/2
//                         ${
//                           dark
//                             ? "text-gray-400"
//                             : "text-gray-500"
//                         }`}
//                     />

//                     <Field
//                       name="pass"
//                       type={showPass ? "text" : "password"}
//                       dir="rtl"
//                       placeholder="رمز عبور"
//                       className={`w-full h-12 pr-12 pl-12 px-4 rounded-lg border text-right outline-none transition-all duration-200
//                         ${
//                           dark
//                             ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
//                             : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-400"
//                         }`}
//                     />

//                     {/* Show / Hide Password */}
//                     <button
//                       type="button"
//                       onClick={() => setShowPass(!showPass)}
//                       className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors
//                         ${
//                           dark
//                             ? "text-gray-400 hover:text-white"
//                             : "text-gray-400 hover:text-gray-700"
//                         }`}
//                     >
//                       {showPass ? (
//                         <FaEyeSlash />
//                       ) : (
//                         <FaEye />
//                       )}
//                     </button>

//                     {errors.pass && touched.pass && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -5 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="text-red-400 text-xs mt-2 flex gap-2 items-center"
//                       >
//                         <FaExclamationCircle />
//                         {errors.pass}
//                       </motion.div>
//                     )}
//                   </div>
//                 </>
//               )}

//               {/* =========================
//                   مرحله OTP
//               ========================= */}
//               {values.step === "otp" && (
//                 <div className="relative">

//                   <Field
//                     name="otp"
//                     dir="ltr"
//                     maxLength="5"
//                     placeholder="کد تایید"
//                     className={`w-full h-12 px-4 rounded-lg border text-center tracking-[8px] outline-none transition-all duration-200
//                       ${
//                         dark
//                           ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
//                           : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-400"
//                       }`}
//                   />

//                   {errors.otp && touched.otp && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -5 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="text-red-400 text-xs mt-2 flex gap-2 items-center"
//                     >
//                       <FaExclamationCircle />
//                       {errors.otp}
//                     </motion.div>
//                   )}
//                 </div>
//               )}

//               {/* Submit */}
//               <button
//                 type="submit"
//                 className={`w-full py-3 rounded-lg transition-all duration-200
//                   ${
//                     dark
//                       ? "bg-black text-white hover:bg-gray-950"
//                       : "bg-gray-900 text-white hover:bg-gray-800"
//                   }`}
//               >
//                 {values.step === "login"
//                   ? "ورود"
//                   : "تایید کد"}
//               </button>

//             </Form>
//           )}
//         </Formik>

//         {/* Back */}
//         <div
//           className={`flex justify-between mt-8 text-sm
//             ${dark ? "text-gray-400" : "text-gray-500"}`}
//         >
//           <NavLink
//             to="/"
//             className={`transition-colors
//               ${
//                 dark
//                   ? "hover:text-white"
//                   : "hover:text-gray-900"
//               }`}
//           >
//             بازگشت
//           </NavLink>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Index;


import React, { useState } from "react";
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

const schema = Yup.object({
  phone: Yup.string().when("step", {
    is: "login",
    then: (s) =>
      s
        .required("شماره همراه الزامی است")
        .matches(
          /^09\d{9}$/,
          "شماره همراه معتبر نیست"
        ),
  }),

  otp: Yup.string().when("step", {
    is: "otp",
    then: (s) =>
      s
        .required("کد تایید الزامی است")
        .matches(
          /^\d{5}$/,
          "کد باید ۵ رقمی باشد"
        ),
  }),
});

const Index = () => {
  // پیش‌فرض Light Mode
  const [dark, setDark] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300
        ${
          dark
            ? "bg-gray-900 text-white"
            : "bg-stone-50 text-gray-900"
        }`}
    >
      <div className="w-full max-w-md p-10 relative">

        {/* =========================
            Theme Toggle
        ========================= */}
        <button
          type="button"
          onClick={() => setDark(!dark)}
          className={`absolute top-6 right-6 text-xl transition-colors duration-200
            ${
              dark
                ? "text-white hover:text-gray-300"
                : "text-gray-700 hover:text-gray-900"
            }`}
          aria-label="تغییر حالت نمایش"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        {/* =========================
            Title
        ========================= */}
        <h1 className="text-3xl font-semibold text-center">
          تغییر رمز عبور
        </h1>

        <br />

        <h2
          className={`text-center text-sm
            ${
              dark
                ? "text-gray-400"
                : "text-gray-500"
            }`}
        >
          {/*
            متن بر اساس مرحله تغییر می‌کند
          */}
          جهت دریافت کد شماره خود را وارد کنید
        </h2>

        <Formik
          initialValues={{
            phone: "",
            otp: "",
            step: "login",
          }}
          validationSchema={schema}
          onSubmit={async (
            values,
            { setFieldValue }
          ) => {
            // =========================
            // مرحله دریافت OTP
            // =========================
            if (values.step === "login") {

              /*
                اینجا بعداً API ارسال OTP
                قرار می‌گیرد.
              */

              setFieldValue("step", "otp");
            }

            // =========================
            // مرحله تأیید OTP
            // =========================
            else if (values.step === "otp") {

              /*
                اینجا بعداً API تأیید OTP
                قرار می‌گیرد.

                بعد از موفقیت:
              */

              navigate("/ChangePass3");
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form className="flex flex-col gap-6 mt-8">

              {/* =========================
                  مرحله شماره موبایل
              ========================= */}
              {values.step === "login" && (
                <div className="relative">

                  {/* Phone Icon */}
                  <FaPhoneAlt
                    className={`absolute right-4 top-1/2 -translate-y-1/2
                      ${
                        dark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                  />

                  {/* Phone Input */}
                  <Field
                    name="phone"
                    type="tel"
                    dir="ltr"
                    inputMode="numeric"
                    maxLength="11"
                    placeholder="09123456789"
                    className={`w-full h-12 pr-12 pl-4 rounded-lg border text-left outline-none transition-all duration-200
                      ${
                        dark
                          ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                          : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-400"
                      }`}
                  />

                  {/* Phone Error */}
                  {errors.phone && touched.phone && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="text-red-400 text-xs mt-2 flex gap-2 items-center"
                    >
                      <FaExclamationCircle />
                      {errors.phone}
                    </motion.div>
                  )}
                </div>
              )}

              {/* =========================
                  مرحله OTP
              ========================= */}
              {values.step === "otp" && (
                <>
                  {/* OTP Description */}
                  <div
                    className={`text-center text-sm leading-7
                      ${
                        dark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                  >
                    کد تایید ارسال شده به شماره

                    <span
                      className={`mx-1 font-medium
                        ${
                          dark
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                    >
                      {values.phone}
                    </span>

                    را وارد کنید.
                  </div>

                  {/* OTP Input */}
                  <div className="relative">

                    <Field
                      name="otp"
                      type="text"
                      dir="ltr"
                      inputMode="numeric"
                      maxLength="5"
                      placeholder="کد تایید"
                      className={`w-full h-12 px-4 rounded-lg border text-center tracking-[8px] outline-none transition-all duration-200
                        ${
                          dark
                            ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                            : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-400"
                        }`}
                    />

                    {/* OTP Error */}
                    {errors.otp && touched.otp && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="text-red-400 text-xs mt-2 flex gap-2 items-center"
                      >
                        <FaExclamationCircle />
                        {errors.otp}
                      </motion.div>
                    )}
                  </div>

                  {/* Change Phone */}
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue(
                        "step",
                        "login"
                      );

                      setFieldValue(
                        "otp",
                        ""
                      );
                    }}
                    className={`text-sm text-center transition-colors duration-200
                      ${
                        dark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                  >
                    تغییر شماره موبایل
                  </button>
                </>
              )}

              {/* =========================
                  Submit Button
              ========================= */}
              <button
                type="submit"
                className={`w-full py-3 rounded-lg transition-all duration-200
                  ${
                    dark
                      ? "bg-black text-white hover:bg-gray-950"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
              >
                {values.step === "login"
                  ? "دریافت کد تایید"
                  : "تایید کد"}
              </button>

            </Form>
          )}
        </Formik>

        {/* =========================
            Back
        ========================= */}
        <div
          className={`flex justify-center mt-8 text-sm
            ${
              dark
                ? "text-gray-400"
                : "text-gray-500"
            }`}
        >
          <NavLink
            to="/"
            className={`transition-colors duration-200
              ${
                dark
                  ? "hover:text-white"
                  : "hover:text-gray-900"
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
