// import React from "react";

// const FAQ = () => {
//   return (
//     <div className="max-w-2xl mx-auto space-y-3">
//       <div className="collapse bg-base-100 border border-base-300">
//         <input type="radio" name="my-accordion-1" defaultChecked />
//         <div className="collapse-title font-semibold">
//           ❓ آیا امکان تعویض یا مرجوعی کالا وجود دارد؟{" "}
//         </div>
//         <div className="collapse-content text-sm">
//           ✅ بله. در لونا شاپ شما تا ۷ روز پس از دریافت سفارش فرصت دارید در صورت
//           وجود مشکل در سایز یا ایراد ظاهری، کالا را طبق شرایط مرجوع یا تعویض
//           کنید.
//         </div>
//       </div>

//       <div className="collapse bg-base-100 border border-base-300">
//         <input type="radio" name="my-accordion-1" />
//         <div className="collapse-title font-semibold">
//           ❓ چطور سایز مناسب خودم را انتخاب کنم؟{" "}
//         </div>
//         <div className="collapse-content text-sm">
//           📏 برای هر محصول راهنمای دقیق سایزبندی قرار داده شده است. همچنین تیم
//           پشتیبانی لونا شاپ آماده است تا با توجه به قد، وزن و استایل موردنظر،
//           شما را راهنمایی کند.
//         </div>
//       </div>

//       <div className="collapse bg-base-100 border border-base-300">
//         <input type="radio" name="my-accordion-1" />
//         <div className="collapse-title font-semibold">
//           ❓ آیا تصاویر محصولات با واقعیت مطابقت دارند؟{" "}
//         </div>
//         <div className="collapse-content text-sm">
//           📸 بله. تمام تصاویر محصولات واقعی و بدون فیلتر اغراق‌آمیز هستند تا
//           لباسی که دریافت می‌کنید دقیقاً مطابق چیزی باشد که می‌بینید.{" "}
//         </div>
//       </div>
//       <div className="collapse bg-base-100 border border-base-300">
//         <input type="radio" name="my-accordion-1" />
//         <div className="collapse-title font-semibold">
//           ❓ آیا امکان خرید امن و پرداخت در محل وجود دارد؟{" "}
//         </div>
//         <div className="collapse-content text-sm">
//           🔒 بله. پرداخت‌ها از طریق درگاه امن بانکی انجام می‌شود و در برخی شهرها
//           امکان پرداخت در محل نیز فراهم است.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQ;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "آیا امکان تعویض یا مرجوعی کالا وجود دارد؟",
    answer:
      " بله. در لونا شاپ شما تا ۷ روز پس از دریافت سفارش فرصت دارید در صورت وجود مشکل در سایز یا ایراد ظاهری، کالا را طبق شرایط مرجوع یا تعویض کنید.",
  },
  {
    question: " چطور سایز مناسب خودم را انتخاب کنم؟",
    answer:
      " برای هر محصول راهنمای دقیق سایزبندی قرار داده شده است. همچنین تیم پشتیبانی لونا شاپ آماده است تا با توجه به قد، وزن و استایل موردنظر، شما را راهنمایی کند.",
  },
  {
    question: " آیا تصاویر محصولات با واقعیت مطابقت دارند؟",
    answer:
      " بله. تمام تصاویر محصولات واقعی و بدون فیلتر اغراق‌آمیز هستند تا لباسی که دریافت می‌کنید دقیقاً مطابق چیزی باشد که می‌بینید.",
  },
  {
    question: " آیا امکان خرید امن و پرداخت در محل وجود دارد؟",
    answer:
      " بله. پرداخت‌ها از طریق درگاه امن بانکی انجام می‌شود و در برخی شهرها امکان پرداخت در محل نیز فراهم است.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div
      className="max-w-2xl mx-auto space-y-4 p-4 rounded-xl font-IRANYekanXFaNum"
      data-theme="luxury"
      dir="rtl"
    >
      {faqs.map((item, index) => (
        <div
          key={index}
          className="border border-base-300 rounded-xl overflow-hidden bg-base-100"
        >
          <button
            onClick={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
            className="w-full text-right px-4 py-4 font-semibold flex justify-between items-center"
          >
            <span>{item.question}</span>
            <span className="text-lg">
              {activeIndex === index ? "−" : "+"}
            </span>
          </button>

          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-4 text-sm leading-7 text-base-content/80"
              >
                {item.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQ; // ✅ همین خط نجات‌دهنده
