// src/components/home/InstagramGallery.jsx

import React from "react";
import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

const gallery = [
  "/images/community-1.jpg",
  "/images/community-2.jpg",
  "/images/community-3.jpg",
  "/images/community-4.jpg",
  "/images/community-5.jpg",
  "/images/community-6.jpg",
];

export default function InstagramGallery() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16"
        >
          <div>
            <span className="tracking-[5px] uppercase text-xs text-neutral-400">
              جامعه ما
            </span>

            <h2 className="mt-4 text-5xl font-light text-neutral-900">
              استایل شما، الهام ما
            </h2>

            <p className="mt-6 max-w-xl text-neutral-500 leading-8">
              تصاویر منتشر شده توسط مشتریان ما را ببینید و استایل خودتان را با
              ما به اشتراک بگذارید.
            </p>
          </div>

          <button className="group flex items-center gap-3 border border-neutral-300 rounded-full px-7 py-3 hover:bg-black hover:text-white transition">
            <Instagram size={18} strokeWidth={1.8} />

            <span>مشاهده اینستاگرام</span>

            <ArrowUpRight
              size={18}
              className="group-hover:rotate-45 transition"
            />
          </button>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-[180px]">
          {gallery.map((image, index) => {
            const large =
              index === 0
                ? "lg:col-span-5 lg:row-span-2"
                : index === 3
                  ? "lg:col-span-4 lg:row-span-2"
                  : "lg:col-span-3";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className={`relative overflow-hidden rounded-[28px] bg-neutral-100 group cursor-pointer ${large}`}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                    <Instagram size={24} className="text-black" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-neutral-100 rounded-[36px] p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-3xl font-light text-neutral-900">
              شما هم بخشی از این گالری باشید
            </h3>

            <p className="mt-4 text-neutral-500 leading-8">
              پس از دریافت سفارش، استایل خود را با ما به اشتراک بگذارید تا در
              گالری مشتریان نمایش داده شود.
            </p>
          </div>

          <button className="group flex items-center gap-3 bg-black text-white rounded-full px-8 py-4">
            اشتراک‌گذاری عکس
            <ArrowUpRight
              size={18}
              className="group-hover:rotate-45 transition"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
