// src/components/home/NewArrivals.jsx

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "تیشرت نخ پنبه زارا",
    price: "560000 تومان",
    image: "390.png",
  },
  {
    id: 2,
    name: "پیراهن لینن نخی",
    price: "890000 تومان",
    image: "391.png",
  },
  {
    id: 3,
    name: "شلوار مازراتی مردانه",
    price: "467000 تومان",
    image: "392.png",
  },
  {
    id: 4,
    name: "هودی تو کرک زارا",
    price: "199000 تومان",
    image: "393.png",
  },
];

export default function NewArrivals() {
  return (
    <section className="w-full py-28 bg-white"   dir="rtl">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="uppercase tracking-[5px] text-xs text-neutral-400">
            سبک برندهای لوکس
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-light tracking-tight text-neutral-900">
             جدیدترین ها
            </h2>
          </div>

          <button className="hidden md:flex items-center gap-2 text-sm text-neutral-900 hover:gap-4 transition-all">
           مشاهده همه
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </button>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-neutral-100 aspect-[4/5] rounded-3xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-500" />
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-neutral-900">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-500">
                    {item.price}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <ArrowUpRight size={17} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-14 md:hidden">
          <button className="px-8 py-3 rounded-full border border-neutral-300 hover:bg-black hover:text-white transition">
            View All
          </button>
        </div>
      </div>
    </section>
  );
}