import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const ContactSection = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
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

  // انیمیشن ها
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div>
      <div>
        <img
          src="Blog4.png"
          alt="blog banner"
          className="w-full h-40 object-cover"
        />
      </div>
      <section className="max-w-6xl mx-auto px-4 py-16" dir="rtl">
        <motion.div
          className="flex flex-col lg:flex-row gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.form
            onSubmit={formik.handleSubmit}
            className="w-full lg:w-1/2 flex flex-col gap-6"
            variants={itemVariants}
          >
            <div>
              <label className="block mb-2 text-sm">نام *</label>
              <input
                type="text"
                name="name"
                placeholder="نام و نام خانوادگی"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-black"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">ایمیل *</label>
              <input
                type="email"
                name="email"
                placeholder="ایمیل"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-black"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">پیام *</label>
              <textarea
                name="message"
                rows="5"
                placeholder="پیام"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-black"
                {...formik.getFieldProps("message")}
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="py-3 bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition hover:opacity-90"
            >
              ارسال
            </button>
          </motion.form>

          <motion.div
            className="w-full lg:w-1/2 text-gray-700 space-y-8"
            variants={itemVariants}
          >
            <div>
              <h3 className="font-semibold mb-2">آدرس :</h3>
              <p>مازندران، ساری، خیابان فرهنگ، فروشگاه لونا شاپ</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">راه های ارتباطی :</h3>
              <p>۰۹۰۳۲۳۳****</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">ایمیل :</h3>
              <p>Lonashoop@gmail.com</p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactSection;
