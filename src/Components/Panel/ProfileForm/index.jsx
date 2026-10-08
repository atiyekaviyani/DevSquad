// import React, { useState, useRef, useCallback, useEffect } from "react";

// import { motion, AnimatePresence } from "framer-motion";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import Cropper from "react-easy-crop";
// import Slider from "@mui/material/Slider";
// import getCroppedImg from "./cropImage";
// import { ArrowLeft, Eye, EyeOff } from "lucide-react";

// // API
// import {
//   getProfile,
//   updateProfile,
// } from "../../../Core/Services/api/profileApi";

// export default function ProfileForm({ initialData, onSubmit }) {
//   const [cropModal, setCropModal] = useState(false);
//   const [imageSrc, setImageSrc] = useState(null);

//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);

//   const [profileData, setProfileData] = useState(initialData || null);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [profileError, setProfileError] = useState("");
//   const [saveMessage, setSaveMessage] = useState("");
//   const [saveError, setSaveError] = useState("");

//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         setProfileError("");

//         const response = await getProfile();

//         console.log("Profile API Response:", response);

//         const data = response?.data;

//         if (data) {
//           setProfileData(data);
//         }
//       } catch (error) {
//         console.error("Get Profile Error:", error);

//         setProfileError(
//           error?.message || "دریافت اطلاعات پروفایل با خطا مواجه شد",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleAvatarUpload = (e, setFieldValue) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     const url = URL.createObjectURL(file);

//     setImageSrc(url);
//     setZoom(1);
//     setCrop({ x: 0, y: 0 });
//     setCropModal(true);

//     // امکان انتخاب مجدد همان فایل
//     e.target.value = "";
//   };

//   // ==========================================
//   // Crop
//   // ==========================================
//   const onCropComplete = useCallback((_, pixels) => {
//     setCroppedAreaPixels(pixels);
//   }, []);

//   const handleCropSave = async (setFieldValue) => {
//     if (!imageSrc || !croppedAreaPixels) return;

//     try {
//       const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

//       setFieldValue("avatar", croppedImage);

//       setCropModal(false);
//     } catch (error) {
//       console.error("Crop Error:", error);
//     }
//   };

//   // ==========================================
//   // بستن Crop Modal
//   // ==========================================
//   const handleCropCancel = () => {
//     setCropModal(false);

//     if (imageSrc) {
//       URL.revokeObjectURL(imageSrc);
//     }

//     setImageSrc(null);
//   };

//   // ==========================================
//   // Validation
//   // ==========================================
//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("نام الزامی است"),

//     family: Yup.string().required("نام خانوادگی الزامی است"),

//     email: Yup.string().email("ایمیل معتبر نیست"),

//     phone: Yup.string()
//       .matches(/^09\d{9}$/, "شماره همراه معتبر نیست")
//       .required("شماره تماس الزامی است"),

//     password: Yup.string().when("newPassword", {
//       is: (value) => value && value.length > 0,
//       then: (schema) =>
//         schema.required("برای تغییر رمز، رمز عبور فعلی را وارد کنید"),
//       otherwise: (schema) => schema,
//     }),

//     newPassword: Yup.string().test(
//       "new-password",
//       "حداقل ۶ کاراکتر",
//       (value) => {
//         if (!value) return true;

//         return value.length >= 6;
//       },
//     ),
//   });

//   // ==========================================
//   // Loading
//   // ==========================================
//   if (loading) {
//     return (
//       <div className="w-full max-w-4xl mx-auto flex justify-center items-center py-20">
//         <div className="text-white/70 text-sm">
//           در حال دریافت اطلاعات پروفایل...
//         </div>
//       </div>
//     );
//   }

//   // ==========================================
//   // Error
//   // ==========================================
//   if (profileError) {
//     return (
//       <div className="w-full max-w-4xl mx-auto flex justify-center items-center py-20">
//         <div className="text-red-400 text-sm">{profileError}</div>
//       </div>
//     );
//   }

//   return (
//     <Formik
//       enableReinitialize
//       initialValues={{
//         // API
//         name: profileData?.name || "",

//         // API
//         family: profileData?.family || "",

//         // API فعلاً email ندارد
//         email: profileData?.email || "",

//         // API
//         phone: profileData?.phone || "",

//         // API فعلاً avatar ندارد
//         avatar: profileData?.avatar || "",

//         // رمزها در ابتدا خالی باشند
//         password: "",
//         newPassword: "",
//       }}
//       validationSchema={validationSchema}
//       onSubmit={async (values, { resetForm }) => {
//         try {
//           setSaving(true);
//           setSaveMessage("");
//           setSaveError("");

//           // اطلاعاتی که API update می‌خواهد
//           const profilePayload = {
//             name: values.name,
//             family: values.family,
//             phone: values.phone,
//           };

//           // فقط در صورتی که کاربر رمز وارد کرده باشد
//           if (values.password) {
//             profilePayload.password = values.password;
//           }

//           if (values.newPassword) {
//             profilePayload.new_password = values.newPassword;
//           }

//           console.log("Update Profile Payload:", profilePayload);

//           // ======================================
//           // UPDATE PROFILE API
//           // POST /user/profile/update
//           // ======================================
//           const response = await updateProfile(profilePayload);

//           console.log("Update Profile Response:", response);

//           setSaveMessage(
//             response?.message || "اطلاعات پروفایل با موفقیت ذخیره شد",
//           );

//           // اطلاعات جدید را در State هم آپدیت می‌کنیم
//           setProfileData((prev) => ({
//             ...prev,
//             name: values.name,
//             family: values.family,
//             full_name: `${values.name} ${values.family}`.trim(),
//             phone: values.phone,
//           }));

//           // رمزها بعد از ذخیره پاک شوند
//           resetForm({
//             values: {
//               ...values,
//               password: "",
//               newPassword: "",
//             },
//           });

//           // اگر Profile.jsx قبلاً onSubmit دارد
//           if (onSubmit) {
//             await onSubmit(values);
//           }
//         } catch (error) {
//           console.error("Update Profile Error:", error);

//           setSaveError(error?.message || "ذخیره تغییرات با خطا مواجه شد");
//         } finally {
//           setSaving(false);
//         }
//       }}
//     >
//       {({ values, setFieldValue }) => (
//         <>
//           <Form>
//             <motion.div
//               className="relative bg-white/[0.06] backdrop-blur-3xl border border-white/10
//               p-10 rounded-lg shadow-[0_30px_80px_rgba(0,0,0,0.6)]
//               space-y-8 w-full max-w-4xl mx-auto overflow-hidden"
//               initial={{
//                 opacity: 0,
//                 y: 40,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               transition={{
//                 duration: 0.6,
//               }}
//             >
//               {/* Background Effects */}
//               <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

//               <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />

//               {/* Title */}
//               <h2 className="text-white text-3xl font-semibold text-center tracking-wide">
//                 ویرایش پروفایل
//               </h2>

//               {/* ================= Avatar ================= */}
//               <div className="flex justify-center">
//                 <div className="relative w-32 h-32 group">
//                   <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-xl opacity-40 group-hover:opacity-70 transition duration-500" />

//                   <img
//                     src={values.avatar || "/default-avatar.png"}
//                     alt="avatar"
//                     className="relative w-full h-full rounded-full object-cover border border-white/20 backdrop-blur-md"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     className="absolute bottom-2 right-2 bg-white/10 backdrop-blur-md
//                     border border-white/20 hover:bg-white/20 text-white
//                     px-3 py-1 rounded-full text-xs transition-all"
//                   >
//                     تغییر
//                   </button>

//                   <input
//                     type="file"
//                     accept="image/*"
//                     ref={fileInputRef}
//                     onChange={(e) => handleAvatarUpload(e, setFieldValue)}
//                     className="hidden"
//                   />
//                 </div>
//               </div>

//               {/* ================= Name + Family ================= */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {/* Name */}
//                 <div className="relative">
//                   <Field
//                     name="name"
//                     type="text"
//                     placeholder=" "
//                     className="w-full px-5 pt-6 pb-3 rounded-2xl bg-white/5
//                     border border-white/10 backdrop-blur-xl text-white
//                     focus:outline-none focus:border-purple-400/60
//                     focus:bg-white/10 transition-all duration-300 peer"
//                   />

//                   <label className="absolute right-5 top-3 text-xs text-white/50 peer-focus:text-purple-400 transition-all">
//                     نام
//                   </label>

//                   <ErrorMessage
//                     name="name"
//                     component="div"
//                     className="text-xs text-red-400 mt-1"
//                   />
//                 </div>

//                 {/* Family */}
//                 <div className="relative">
//                   <Field
//                     name="family"
//                     type="text"
//                     placeholder=" "
//                     className="w-full px-5 pt-6 pb-3 rounded-2xl bg-white/5
//                     border border-white/10 backdrop-blur-xl text-white
//                     focus:outline-none focus:border-purple-400/60
//                     focus:bg-white/10 transition-all duration-300 peer"
//                   />

//                   <label className="absolute right-5 top-3 text-xs text-white/50 peer-focus:text-purple-400 transition-all">
//                     نام خانوادگی
//                   </label>

//                   <ErrorMessage
//                     name="family"
//                     component="div"
//                     className="text-xs text-red-400 mt-1"
//                   />
//                 </div>
//               </div>

//               {/* ================= Email ================= */}
//               <div className="relative">
//                 <Field
//                   name="email"
//                   type="email"
//                   placeholder=" "
//                   className="w-full px-5 pt-6 pb-3 rounded-2xl bg-white/5
//                   border border-white/10 backdrop-blur-xl text-white
//                   focus:outline-none focus:border-purple-400/60
//                   focus:bg-white/10 transition-all duration-300 peer"
//                 />

//                 <label className="absolute right-5 top-3 text-xs text-white/50 peer-focus:text-purple-400 transition-all">
//                   ایمیل
//                 </label>

//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-xs text-red-400 mt-1"
//                 />
//               </div>

//               {/* ================= Phone ================= */}
//               <div className="relative">
//                 <Field
//                   name="phone"
//                   type="text"
//                   placeholder=" "
//                   className="w-full px-5 pt-6 pb-3 rounded-2xl bg-white/5
//                   border border-white/10 backdrop-blur-xl text-white
//                   focus:outline-none focus:border-purple-400/60
//                   focus:bg-white/10 transition-all duration-300 peer"
//                 />

//                 <label className="absolute right-5 top-3 text-xs text-white/50 peer-focus:text-purple-400 transition-all">
//                   شماره تماس
//                 </label>

//                 <ErrorMessage
//                   name="phone"
//                   component="div"
//                   className="text-xs text-red-400 mt-1"
//                 />
//               </div>

//               {/* ================= Password ================= */}
//               <h3 className="text-white/80 font-medium mt-8 border-b border-white/10 pb-3 tracking-wide">
//                 تغییر رمز عبور
//               </h3>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {/* Current Password */}
//                 <div className="relative">
//                   <Field
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder=" "
//                     className="w-full px-5 pt-6 pb-3 pr-12 rounded-2xl bg-white/5
//                     border border-white/10 backdrop-blur-xl text-white
//                     focus:outline-none focus:border-purple-400/60
//                     focus:bg-white/10 transition-all duration-300 peer"
//                   />

//                   <label className="absolute right-5 top-3 text-xs text-white/50 peer-focus:text-purple-400 transition-all">
//                     رمز عبور فعلی
//                   </label>

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>

//                   <ErrorMessage
//                     name="password"
//                     component="div"
//                     className="text-xs text-red-400 mt-1"
//                   />
//                 </div>

//                 {/* New Password */}
//                 <div className="relative">
//                   <Field
//                     name="newPassword"
//                     type={showNewPassword ? "text" : "password"}
//                     placeholder=" "
//                     className="w-full px-5 py-6 pb-3 pr-12 rounded-2xl bg-white/5
//                     border border-white/10 backdrop-blur-xl text-white
//                     focus:outline-none focus:border-purple-400/60
//                     focus:bg-white/10 transition-all duration-300 peer"
//                   />

//                   <label className="absolute right-5 top-3 text-xs text-white/50 peer-focus:text-purple-400 transition-all">
//                     رمز عبور جدید
//                   </label>

//                   <button
//                     type="button"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
//                   >
//                     {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>

//                   <ErrorMessage
//                     name="newPassword"
//                     component="div"
//                     className="text-xs text-red-400 mt-1"
//                   />
//                 </div>
//               </div>

//               {/* ================= Messages ================= */}

//               {saveMessage && (
//                 <div className="text-center text-sm text-green-400">
//                   {saveMessage}
//                 </div>
//               )}

//               {saveError && (
//                 <div className="text-center text-sm text-red-400">
//                   {saveError}
//                 </div>
//               )}

//               {/* ================= Submit ================= */}
//               <div className="flex justify-center pt-4">
//                 <motion.button
//                   type="submit"
//                   disabled={saving}
//                   whileHover={{
//                     scale: saving ? 1 : 1.04,
//                   }}
//                   whileTap={{
//                     scale: saving ? 1 : 0.97,
//                   }}
//                   className="relative group px-8 py-3 rounded-2xl text-sm font-semibold
//                   text-white bg-white/10 border border-white/20 backdrop-blur-xl
//                   hover:bg-white/20 transition-all duration-300 overflow-hidden flex items-center gap-2
//                   disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />

//                   {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}

//                   {!saving && <ArrowLeft size={16} />}
//                 </motion.button>
//               </div>
//             </motion.div>
//           </Form>

//           {/* ================= Crop Modal ================= */}
//           <AnimatePresence>
//             {cropModal && (
//               <motion.div
//                 className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <motion.div
//                   className="bg-white/5 backdrop-blur-3xl rounded-[40px] p-8
//                   w-[90%] max-w-md border border-white/10
//                   shadow-[0_40px_120px_rgba(0,0,0,0.7)] flex flex-col gap-6"
//                   initial={{
//                     scale: 0.85,
//                   }}
//                   animate={{
//                     scale: 1,
//                   }}
//                   exit={{
//                     scale: 0.85,
//                   }}
//                 >
//                   <div className="relative w-full h-64 bg-black/20 rounded-xl overflow-hidden">
//                     <Cropper
//                       image={imageSrc}
//                       crop={crop}
//                       zoom={zoom}
//                       aspect={1}
//                       onCropChange={setCrop}
//                       onZoomChange={setZoom}
//                       onCropComplete={onCropComplete}
//                     />
//                   </div>

//                   <Slider
//                     value={zoom}
//                     min={1}
//                     max={3}
//                     step={0.01}
//                     onChange={(e, val) => setZoom(val)}
//                   />

//                   <div className="flex justify-end gap-3">
//                     <button
//                       type="button"
//                       onClick={handleCropCancel}
//                       className="px-4 py-2 text-sm text-white/60 hover:text-white transition"
//                     >
//                       لغو
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => handleCropSave(setFieldValue)}
//                       className="px-4 py-2 rounded-xl text-sm font-medium text-white
//                       bg-white/10 border border-white/20 backdrop-blur-xl
//                       hover:bg-white/20 transition-all"
//                     >
//                       ذخیره
//                     </button>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </>
//       )}
//     </Formik>
//   );
// }

import React, { useEffect, useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { getProfile } from "../../../Core/Services/api/profileApi";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProfile();

        /*
          پاسخ API:

          {
            status: true,
            message: "...",
            data: {
              name: "...",
              family: "...",
              full_name: "...",
              phone: "...",
              is_completed_profile: true
            }
          }
        */

        const data = response?.data || {};

        setProfile({
          full_name: data.full_name || "",
          phone: data.phone || "",
        });
      } catch (err) {
        console.error("Profile Error:", err);

        setError("دریافت اطلاعات پروفایل با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  
  if (loading) {
    return (
      <div className="w-full flex justify-center px-4 py-6">
        <div className="w-full max-w-2xl rounded-2xl bg-gray-900 p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

            <p className="text-sm text-gray-500">
              در حال دریافت اطلاعات پروفایل...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6" dir="rtl">
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-gray-950 p-5 shadow-sm sm:p-8">
       
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-900">
            <FaUser className="text-lg" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-200">پروفایل من</h2>

            <p className="mt-1 text-sm text-gray-500">
              اطلاعات حساب کاربری شما
            </p>
          </div>
        </div>

      
        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

      
        <div className="space-y-5">
        
          <div>
            <label
              htmlFor="full_name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              نام و نام خانوادگی
            </label>

            <div className="relative">
              <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

              <input
                id="full_name"
                type="text"
                value={profile.full_name}
                readOnly
                placeholder="نام و نام خانوادگی"
                className="h-10 w-full rounded-xl border border-gray-200 bg-slate-900 px-4 pr-11 text-sm text-gray-50 outline-none transition placeholder:text-gray-400"
              />
            </div>
          </div>

         
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              شماره همراه
            </label>

            <div className="relative">
              <FaPhoneAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

              <input
                id="phone"
                type="text"
                value={profile.phone}
                readOnly
                placeholder="شماره همراه"
                dir="ltr"
                className="h-10 w-full rounded-xl border border-gray-200 bg-slate-900 px-4 pr-11 text-left text-sm text-gray-50 outline-none transition placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
