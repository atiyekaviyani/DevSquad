import React, { useState } from "react";

const faqs = [
  {
    question: "آیا امکان تعویض یا مرجوعی کالا وجود دارد؟",
    answer:
      " بله. در لونا شاپ شما تا ۷ روز پس از دریافت سفارش فرصت دارید در صورت وجود مشکل در سایز یا ایراد ظاهری، کالا را طبق شرایط مرجوع یا تعویض کنید.",
  },
  {
    question: "چطور سایز مناسب خودم را انتخاب کنم؟",
    answer:
      "برای هر محصول راهنمای دقیق سایزبندی قرار داده شده است. همچنین تیم پشتیبانی لونا شاپ آماده است تا با توجه به قد، وزن و استایل موردنظر، شما را راهنمایی کند.",
  },
  {
    question: "آیا تصاویر محصولات با واقعیت مطابقت دارند؟",
    answer:
      "بله. تمام تصاویر محصولات واقعی و بدون فیلتر اغراق‌آمیز هستند تا لباسی که دریافت می‌کنید دقیقاً مطابق چیزی باشد که می‌بینید.",
  },
  {
    question: " آیا امکان خرید امن و پرداخت در محل وجود دارد؟",
    answer:
      "بله. پرداخت‌ها از طریق درگاه امن بانکی انجام می‌شود و در برخی شهرها امکان پرداخت در محل نیز فراهم است.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <h2 className="mb-12 text-center text-3xl font-semibold text-gray-900">
         سوالات متداول
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border bg-white p-6 transition-shadow ${
                  isOpen ? "shadow-lg" : "shadow-sm"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {item.question}
                  </span>

                  <span
                    className={`text-xl font-medium transition-transform ${
                      isOpen ? "rotate-45 text-red-500" : "text-gray-500"
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <p className="mt-4 text-sm leading-relaxed text-gray-500">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
