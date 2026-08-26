// src/components/home/WhyChooseUs.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "تضمین کیفیت",
    desc: "تمام محصولات با بهترین متریال و کنترل کیفیت دقیق عرضه می‌شوند.",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    desc: "ارسال سفارش‌ها در کوتاه‌ترین زمان به سراسر کشور.",
  },
  {
    icon: RefreshCcw,
    title: "۷ روز ضمانت بازگشت",
    desc: "در صورت عدم رضایت، امکان بازگشت کالا بدون دردسر.",
  },
  {
    icon: Headphones,
    title: "پشتیبانی اختصاصی",
    desc: "همراه شما قبل و بعد از خرید برای بهترین تجربه.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28 bg-[#fafafa]" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs tracking-[5px] uppercase text-neutral-400">
            مزایای فروشگاه
          </span>

          <h2 className="mt-5 text-5xl font-light tracking-tight text-neutral-900">
            چرا ما؟
          </h2>

          <p className="mt-6 text-neutral-500 leading-8">
            کیفیت، طراحی مینیمال و تجربه خریدی که باعث می‌شود دوباره
            به فروشگاه ما برگردید.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group bg-white rounded-[32px] p-8 border border-neutral-200 hover:border-black hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition">
                  <Icon size={24} strokeWidth={1.7} />
                </div>

                <h3 className="mt-8 text-xl font-medium text-neutral-900">
                  {item.title}
                </h3>

                <p className="mt-4 text-neutral-500 leading-8 text-sm">
                  {item.desc}
                </p>

                <div className="mt-8 h-px bg-neutral-200 group-hover:bg-black transition" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}