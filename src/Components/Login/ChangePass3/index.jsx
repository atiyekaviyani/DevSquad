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
//     then: (s) => s.required("  رمز عبور الزامی است"),
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

//         <h1 className="text-3xl font-semibold text-center"> رمز عبور جدید</h1>
//         <br />
//         <h2 className="ml-20"> رمز عبور جدید خود را وارد کنید </h2>

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
//                     <FaPhoneAlt className="absolute right-4 top-6 -translate-y-1/2 text-gray-400" />
//                     <Field
//                       name="phone"
//                       dir="rtl"
//                       placeholder="رمز عبور  "
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
//                     placeholder="رمز عبور "
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

//               <NavLink to="/ChangePass3">
//                 <button
//                   type="submit"
//                   className="w-full bg-black py-3 rounded-lg"
//                 >
//                   {values.step === "login" ? " تکمیل فرایند" : "تایید کد"}
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
// import { NavLink, useNavigate } from "react-router-dom";

// import {
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
//   newPassword: Yup.string()
//     .required("رمز عبور جدید الزامی است")
//     .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
//     .matches(
//       /[A-Z]/,
//       "رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد"
//     )
//     .matches(
//       /[a-z]/,
//       "رمز عبور باید حداقل یک حرف کوچک انگلیسی داشته باشد"
//     )
//     .matches(
//       /\d/,
//       "رمز عبور باید حداقل یک عدد داشته باشد"
//     )
//     .matches(
//       /[@#$%^&*!]/,
//       "رمز عبور باید حداقل یک کاراکتر ویژه مثل # $ % ^ & داشته باشد"
//     ),

//   confirmPassword: Yup.string()
//     .required("تکرار رمز عبور الزامی است")
//     .oneOf(
//       [Yup.ref("newPassword")],
//       "رمزهای عبور یکسان نیستند"
//     ),
// });

// const Index = () => {
//   // پیش‌فرض Light Mode
//   const [dark, setDark] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState(false);

//   const navigate = useNavigate();

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
//         dark
//           ? "bg-gray-900 text-white"
//           : "bg-stone-50 text-gray-900"
//       }`}
//     >
//       <div className="w-full max-w-md p-10 relative">

//         {/* =========================
//             Theme Toggle
//         ========================= */}
//         <button
//           type="button"
//           onClick={() => setDark(!dark)}
//           className={`absolute top-6 right-6 text-xl transition-colors duration-200 ${
//             dark
//               ? "text-white hover:text-gray-300"
//               : "text-gray-700 hover:text-gray-900"
//           }`}
//           aria-label="تغییر حالت نمایش"
//         >
//           {dark ? <FaSun /> : <FaMoon />}
//         </button>

//         {/* =========================
//             Title
//         ========================= */}
//         <h1 className="text-3xl font-semibold text-center">
//           رمز عبور جدید
//         </h1>

//         <br />

//         <h2
//           className={`text-center text-sm ${
//             dark
//               ? "text-gray-400"
//               : "text-gray-500"
//           }`}
//         >
//           رمز عبور جدید خود را وارد کنید
//         </h2>

//         {/* =========================
//             Formik
//         ========================= */}
//         <Formik
//           initialValues={{
//             newPassword: "",
//             confirmPassword: "",
//           }}
//           validationSchema={schema}
//           onSubmit={(values) => {
//             console.log(
//               "New Password:",
//               values.newPassword
//             );

//             // بعداً API تغییر رمز اینجا قرار می‌گیرد

//             navigate("/ChangePass3");
//           }}
//         >
//           {({ errors, touched }) => (
//             <Form className="flex flex-col gap-6 mt-8">

//               {/* =========================
//                   New Password
//               ========================= */}
//               <div className="relative">

//                 <FaLock
//                   className={`absolute right-4 top-6 -translate-y-1/2 ${
//                     dark
//                       ? "text-gray-400"
//                       : "text-gray-500"
//                   }`}
//                 />

//                 <Field
//                   name="newPassword"
//                   type={
//                     showPassword
//                       ? "text"
//                       : "password"
//                   }
//                   dir="ltr"
//                   placeholder="رمز عبور جدید"
//                   className={`w-full h-12 pr-12 pl-12 px-4 rounded-lg border text-left outline-none transition-all duration-200 ${
//                     dark
//                       ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
//                       : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-400"
//                   }`}
//                 />

//                 {/* Show / Hide Password */}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowPassword(!showPassword)
//                   }
//                   className={`absolute left-4 top-6 -translate-y-1/2 transition-colors ${
//                     dark
//                       ? "text-gray-400 hover:text-white"
//                       : "text-gray-400 hover:text-gray-700"
//                   }`}
//                   aria-label={
//                     showPassword
//                       ? "مخفی کردن رمز عبور"
//                       : "نمایش رمز عبور"
//                   }
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash />
//                   ) : (
//                     <FaEye />
//                   )}
//                 </button>

//                 {/* Password Error */}
//                 {errors.newPassword &&
//                   touched.newPassword && (
//                     <motion.div
//                       initial={{
//                         opacity: 0,
//                         y: -5,
//                       }}
//                       animate={{
//                         opacity: 1,
//                         y: 0,
//                       }}
//                       className="text-red-400 text-xs mt-2 flex gap-2 items-center"
//                     >
//                       <FaExclamationCircle />
//                       {errors.newPassword}
//                     </motion.div>
//                   )}

//                 {/* Password Guide */}
//                 {!errors.newPassword && (
//                   <p
//                     className={`text-xs mt-2 leading-6 ${
//                       dark
//                         ? "text-gray-400"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     رمز عبور باید حداقل ۸ کاراکتر باشد
//                     و شامل حرف بزرگ، حرف کوچک، عدد و
//                     کاراکتر ویژه مثل
//                     <span className="font-medium mx-1">
//                       # $ % ^ &
//                     </span>
//                     باشد.
//                   </p>
//                 )}
//               </div>

//               {/* =========================
//                   Confirm Password
//               ========================= */}
//               <div className="relative">

//                 <FaLock
//                   className={`absolute right-4 top-6 -translate-y-1/2 ${
//                     dark
//                       ? "text-gray-400"
//                       : "text-gray-500"
//                   }`}
//                 />

//                 <Field
//                   name="confirmPassword"
//                   type={
//                     showConfirmPassword
//                       ? "text"
//                       : "password"
//                   }
//                   dir="ltr"
//                   placeholder="تکرار رمز عبور"
//                   className={`w-full h-12 pr-12 pl-12 px-4 rounded-lg border text-left outline-none transition-all duration-200 ${
//                     dark
//                       ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
//                       : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-400"
//                   }`}
//                 />

//                 {/* Show / Hide Confirm Password */}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowConfirmPassword(
//                       !showConfirmPassword
//                     )
//                   }
//                   className={`absolute left-4 top-6 -translate-y-1/2 transition-colors ${
//                     dark
//                       ? "text-gray-400 hover:text-white"
//                       : "text-gray-400 hover:text-gray-700"
//                   }`}
//                   aria-label={
//                     showConfirmPassword
//                       ? "مخفی کردن رمز عبور"
//                       : "نمایش رمز عبور"
//                   }
//                 >
//                   {showConfirmPassword ? (
//                     <FaEyeSlash />
//                   ) : (
//                     <FaEye />
//                   )}
//                 </button>

//                 {/* Confirm Password Error */}
//                 {errors.confirmPassword &&
//                   touched.confirmPassword && (
//                     <motion.div
//                       initial={{
//                         opacity: 0,
//                         y: -5,
//                       }}
//                       animate={{
//                         opacity: 1,
//                         y: 0,
//                       }}
//                       className="text-red-400 text-xs mt-2 flex gap-2 items-center"
//                     >
//                       <FaExclamationCircle />
//                       {errors.confirmPassword}
//                     </motion.div>
//                   )}
//               </div>

//               {/* =========================
//                   Submit
//               ========================= */}
//               <button
//                 type="submit"
//                 className={`w-full py-3 rounded-lg transition-all duration-200 ${
//                   dark
//                     ? "bg-black text-white hover:bg-gray-950"
//                     : "bg-gray-900 text-white hover:bg-gray-800"
//                 }`}
//               >
//                 تکمیل فرایند
//               </button>

//             </Form>
//           )}
//         </Formik>

//         {/* =========================
//             Back
//         ========================= */}
//         <div
//           className={`flex justify-center mt-8 text-sm ${
//             dark
//               ? "text-gray-400"
//               : "text-gray-500"
//           }`}
//         >
//           <NavLink
//             to="/"
//             className={`transition-colors duration-200 ${
//               dark
//                 ? "hover:text-white"
//                 : "hover:text-gray-900"
//             }`}
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
import { NavLink } from "react-router-dom";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaMoon,
  FaSun,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";

import { motion } from "framer-motion";
import * as Yup from "yup";

const schema = Yup.object({
  newPassword: Yup.string()
    .required("رمز عبور جدید الزامی است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .matches(
      /[A-Z]/,
      "رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد"
    )
    .matches(
      /[a-z]/,
      "رمز عبور باید حداقل یک حرف کوچک انگلیسی داشته باشد"
    )
    .matches(
      /\d/,
      "رمز عبور باید حداقل یک عدد داشته باشد"
    )
    .matches(
      /[@#$%^&*!]/,
      "رمز عبور باید حداقل یک کاراکتر ویژه مثل # $ % ^ & داشته باشد"
    ),

  confirmPassword: Yup.string()
    .required("تکرار رمز عبور الزامی است")
    .oneOf(
      [Yup.ref("newPassword")],
      "رمزهای عبور یکسان نیستند"
    ),
});

const Index = () => {
  // پیش‌فرض Light Mode
  const [dark, setDark] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [success, setSuccess] = useState(false);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        dark
          ? "bg-gray-900 text-white"
          : "bg-stone-50 text-gray-900"
      }`}
    >
      <div className="w-full max-w-md p-10 relative">

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={() => setDark(!dark)}
          className={`absolute top-6 right-6 text-xl transition-colors duration-200 ${
            dark
              ? "text-white hover:text-gray-300"
              : "text-gray-700 hover:text-gray-900"
          }`}
          aria-label="تغییر حالت نمایش"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        {success ? (
          /* =========================
             Success
          ========================= */
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="flex flex-col items-center text-center pt-12"
          >
            <FaCheckCircle
              className={`text-5xl mb-6 ${
                dark
                  ? "text-green-400"
                  : "text-green-600"
              }`}
            />

            <h1 className="text-2xl font-semibold mb-4">
              رمز عبور با موفقیت تغییر کرد
            </h1>

            <p
              className={`text-sm leading-7 ${
                dark
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              رمز عبور جدید شما با موفقیت ثبت شد.
            </p>

            <NavLink
              to="/Login"
              className={`w-full mt-8 py-3 rounded-lg text-center transition-colors duration-200 ${
                dark
                  ? "bg-black text-white hover:bg-gray-950"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              ورود به حساب کاربری
            </NavLink>
          </motion.div>
        ) : (
          <>
            {/* Title */}
            <h1 className="text-3xl font-semibold text-center">
              رمز عبور جدید
            </h1>

            <br />

            <h2
              className={`text-center text-sm ${
                dark
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              رمز عبور جدید خود را وارد کنید
            </h2>

            <Formik
              initialValues={{
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                console.log(
                  "New Password:",
                  values.newPassword
                );

                // بعداً API تغییر رمز اینجا قرار می‌گیرد
                setSuccess(true);
              }}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col gap-6 mt-8">

                  {/* New Password */}
                  <div className="relative">

                    <FaLock
                      className={`absolute right-4 top-6 -translate-y-1/2 ${
                        dark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    />

                    <Field
                      name="newPassword"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      dir="ltr"
                      placeholder="رمز عبور جدید"
                      className={`w-full h-12 pr-12 pl-12 px-4 rounded-lg border text-left outline-none transition-all duration-200 ${
                        dark
                          ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                          : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-400"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className={`absolute left-4 top-6 -translate-y-1/2 transition-colors ${
                        dark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-400 hover:text-gray-700"
                      }`}
                      aria-label={
                        showPassword
                          ? "مخفی کردن رمز عبور"
                          : "نمایش رمز عبور"
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                    {errors.newPassword &&
                      touched.newPassword && (
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
                          {errors.newPassword}
                        </motion.div>
                      )}

                    {!errors.newPassword && (
                      <p
                        className={`text-xs mt-2 leading-6 ${
                          dark
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        رمز عبور باید حداقل ۸ کاراکتر باشد
                        و شامل حرف بزرگ، حرف کوچک، عدد و
                        کاراکتر ویژه مثل
                        <span className="font-medium mx-1">
                          # $ % ^ &
                        </span>
                        باشد.
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">

                    <FaLock
                      className={`absolute right-4 top-6 -translate-y-1/2 ${
                        dark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    />

                    <Field
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      dir="ltr"
                      placeholder="تکرار رمز عبور"
                      className={`w-full h-12 pr-12 pl-12 px-4 rounded-lg border text-left outline-none transition-all duration-200 ${
                        dark
                          ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-400"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className={`absolute left-4 top-6 -translate-y-1/2 transition-colors ${
                        dark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-400 hover:text-gray-700"
                      }`}
                      aria-label={
                        showConfirmPassword
                          ? "مخفی کردن رمز عبور"
                          : "نمایش رمز عبور"
                      }
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                    {errors.confirmPassword &&
                      touched.confirmPassword && (
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
                          {errors.confirmPassword}
                        </motion.div>
                      )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className={`w-full py-3 rounded-lg transition-all duration-200 ${
                      dark
                        ? "bg-black text-white hover:bg-gray-950"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    تکمیل فرایند
                  </button>

                </Form>
              )}
            </Formik>

            {/* Back */}
            <div
              className={`flex justify-center mt-8 text-sm ${
                dark
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              <NavLink
                to="/"
                className={`transition-colors duration-200 ${
                  dark
                    ? "hover:text-white"
                    : "hover:text-gray-900"
                }`}
              >
                ورود به حساب کاربری
              </NavLink>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Index;