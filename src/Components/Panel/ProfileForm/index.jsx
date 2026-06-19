import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import getCroppedImg from "./cropImage";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function PremiumProfileForm({ initialData, onSubmit }) {
  const [cropModal, setCropModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const fileInputRef = useRef(null);

  const handleAvatarUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setCropModal(true);
  };

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleCropSave = async (setFieldValue) => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    setFieldValue("avatar", croppedImage);
    setCropModal(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("این فیلد الزامی است"),
    email: Yup.string()
      .email("ایمیل معتبر نیست")
      .required("این فیلد الزامی است"),
    phone: Yup.string()
      .matches(/^\d+$/, "فقط اعداد مجاز است")
      .required("این فیلد الزامی است"),
    password: Yup.string()
      .min(6, "حداقل ۶ کاراکتر")
      .required("این فیلد الزامی است"),
    newPassword: Yup.string().min(6, "حداقل ۶ کاراکتر"),
  });

  return (
    <Formik
      initialValues={{
        name: initialData?.name || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        avatar: initialData?.avatar || "",
        password: "",
        newPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <>
          <Form>
            <motion.div
              className="relative bg-white/[0.06] backdrop-blur-3xl border border-white/10 
              p-10 rounded-lg shadow-[0_30px_80px_rgba(0,0,0,0.6)] 
              space-y-8 w-full max-w-4xl mx-auto overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
              <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />

              <h2 className="text-white text-3xl font-semibold text-center tracking-wide">
                ویرایش پروفایل
              </h2>

              {/* Avatar */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32 group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-xl opacity-40 group-hover:opacity-70 transition duration-500" />
                  <img
                    src={values.avatar || "/default-avatar.png"}
                    alt=""
                    className="relative w-full h-full rounded-full object-cover border border-white/20 backdrop-blur-md"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-2 right-2 bg-white/10 backdrop-blur-md 
                    border border-white/20 hover:bg-white/20 text-white 
                    px-3 py-1 rounded-full text-xs transition-all"
                  >
                    تغییر
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => handleAvatarUpload(e, setFieldValue)}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["name", "email"].map((field) => (
                  <div key={field} className="relative">
                    <Field
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      placeholder=" "
                      className="w-full px-5 pt-6 pb-3 rounded-2xl bg-white/5 
                      border border-white/10 backdrop-blur-xl text-white 
                      focus:outline-none focus:border-purple-400/60 
                      focus:bg-white/10 transition-all duration-300 peer"
                    />
                    <label className="absolute right-5 top-3 text-xs text-white/50 peer-focus:text-purple-400 transition-all">
                      {field === "name" ? "نام و نام خانوادگی" : "ایمیل"}
                    </label>
                    <ErrorMessage
                      name={field}
                      component="div"
                      className="text-xs text-red-400 mt-1"
                    />
                  </div>
                ))}
              </div>

              <div className="relative">
                <Field
                  name="phone"
                  type="text"
                  placeholder=" "
                  className="w-full px-5 pt-6 pb-3 rounded-2xl bg-white/5 
                  border border-white/10 backdrop-blur-xl text-white 
                  focus:outline-none focus:border-purple-400/60 
                  focus:bg-white/10 transition-all duration-300 peer"
                />
                <label className="absolute right-5 top-3 text-xs text-white/50 peer-focus:text-purple-400 transition-all">
                  شماره تماس
                </label>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-xs text-red-400 mt-1"
                />
              </div>

              <h3 className="text-white/80 font-medium mt-8 border-b border-white/10 pb-3 tracking-wide">
                تغییر رمز عبور
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    className="w-full px-5 pt-6 pb-3 pr-12 rounded-2xl bg-white/5 
                    border border-white/10 backdrop-blur-xl text-white 
                    focus:outline-none focus:border-purple-400/60 
                    focus:bg-white/10 transition-all duration-300 peer"
                  />
                  <label className="absolute right-5 top-3 text-xs text-white/50 peer-focus:text-purple-400 transition-all">
                    رمز عبور فعلی
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-xs text-red-400 mt-1"
                  />
                </div>

                <div className="relative">
                  <Field
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder=" "
                    className="w-full px-5 pt-6 pb-3 pr-12 rounded-2xl bg-white/5 
                    border border-white/10 backdrop-blur-xl text-white 
                    focus:outline-none focus:border-purple-400/60 
                    focus:bg-white/10 transition-all duration-300 peer"
                  />
                  <label className="absolute right-5 top-3 text-xs text-white/50 peer-focus:text-purple-400 transition-all">
                    رمز عبور جدید
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-xs text-red-400 mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group px-8 py-3 rounded-2xl text-sm font-semibold
                  text-white bg-white/10 border border-white/20 backdrop-blur-xl
                  hover:bg-white/20 transition-all duration-300 overflow-hidden flex items-center gap-2"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />
                  ذخیره تغییرات
                  <ArrowLeft size={16} />
                </motion.button>
              </div>
            </motion.div>
          </Form>

          <AnimatePresence>
            {cropModal && (
              <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white/5 backdrop-blur-3xl rounded-[40px] p-8 
                  w-[90%] max-w-md border border-white/10 
                  shadow-[0_40px_120px_rgba(0,0,0,0.7)] flex flex-col gap-6"
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.85 }}
                >
                  <div className="relative w-full h-64 bg-black/20 rounded-xl overflow-hidden">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>

                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.01}
                    onChange={(e, val) => setZoom(val)}
                  />

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setCropModal(false)}
                      className="px-4 py-2 text-sm text-white/60 hover:text-white transition"
                    >
                      لغو
                    </button>
                    <button
                      onClick={() => handleCropSave(setFieldValue)}
                      className="px-4 py-2 rounded-xl text-sm font-medium text-white
                      bg-white/10 border border-white/20 backdrop-blur-xl
                      hover:bg-white/20 transition-all"
                    >
                      ذخیره
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </Formik>
  );
}
