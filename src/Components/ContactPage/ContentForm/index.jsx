import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const ContactSection = () => {
  const formik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("نام الزامی است"),
      email: Yup.string()
        .email("ایمیل معتبر نیست")
        .required("ایمیل الزامی است"),
      message: Yup.string().required("پیام الزامی است"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white min-h-screen font-yekan">
      <div>
        <img
          src="Blog4.png"
          alt="blog banner"
          className="w-full h-40 object-cover rounded-b-md shadow-sm"
        />
      </div>
      <section className="max-w-5xl mx-auto px-6 py-20" dir="rtl">
        <motion.div
          className="flex flex-col lg:flex-row gap-16 items-start bg-white p-12 rounded-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.form
            onSubmit={formik.handleSubmit}
            className="w-full lg:w-1/2 flex flex-col gap-8"
            variants={itemVariants}
            noValidate
          >
            <div>
              <label className="block mb-2 text-sm font-semibold text-black">
                نام <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="نام و نام خانوادگی"
                className="w-full border border-gray-300 rounded-lg px-5 py-3 text-black placeholder-gray-400
                  focus:outline-none -black transition-shadow duration-300"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-600 text-xs mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-black">
                ایمیل <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="ایمیل"
                className="w-full border border-gray-300 rounded-lg px-5 py-3 text-black placeholder-gray-400
                  focus:outline-none  transition-shadow duration-300"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-black">
                پیام <span className="text-red-600">*</span>
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="پیام"
                className="w-full border border-gray-300 rounded-lg px-5 py-3 resize-none text-black placeholder-gray-400
                  focus:outline-none transition-shadow duration-300"
                {...formik.getFieldProps("message")}
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-600 text-xs mt-1">
                  {formik.errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="py-3 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-900 active:scale-95 transition-transform duration-150 ease-in-out"
            >
              ارسال
            </button>
          </motion.form>

          <motion.div
            className="w-full lg:w-1/2 text-black space-y-10 text-right"
            variants={itemVariants}
          >
            <div>
              <h3 className="font-semibold mb-3 text-lg">آدرس :</h3>
              <p>مازندران، ساری، خیابان فرهنگ، فروشگاه لونا شاپ</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-lg">راه های ارتباطی :</h3>
              <p>۰۹۰۳۲۳۳****</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-lg">ایمیل :</h3>
              <p>Lonashoop@gmail.com</p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactSection;
