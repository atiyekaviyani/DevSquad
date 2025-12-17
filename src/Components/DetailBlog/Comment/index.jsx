import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CommentSection() {
  const initialValues = {
    name: "",
    email: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("نام الزامی است"),
    email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
    comment: Yup.string()
      .min(5, "نظر باید حداقل ۵ کاراکتر باشد")
      .required("نوشتن نظر الزامی است"),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values); // ارسال به API
    resetForm();
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 text-right">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">نظرات</h2>

      <p className="text-gray-500 mb-8">
        نظرات خود را راجع به مقالات برای ما ارسال کنید
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="نام *"
                  className={`w-full border  px-4 py-3 focus:outline-none transition placeholder:text-right
                    ${
                      touched.name && errors.name
                        ? "border-red-500"
                        : "border-gray-300 focus:border-gray-800"
                    }`}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="ایمیل *"
                  className={`w-full border  px-4 py-3 focus:outline-none transition placeholder:text-right
                    ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "border-gray-300 focus:border-gray-800"
                    }`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Comment */}
            <div>
              <Field
                as="textarea"
                name="comment"
                rows="5"
                placeholder="نظر شما *"
                className={`w-full border  px-4 py-3 focus:outline-none transition resize-none
                placeholder:text-right  ${
                    touched.comment && errors.comment
                      ? "border-red-500"
                      : "border-gray-300 focus:border-gray-800"
                  }`}
              />
              <ErrorMessage
                name="comment"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-3  hover:bg-gray-700 transition"
            >
              ارسال نظر
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

