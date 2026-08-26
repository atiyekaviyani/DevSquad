// src/components/home/EditorialBanner.jsx

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function EditorialBanner() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[42px] overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 min-h-[630px]">
            <div className="relative overflow-hidden">
              <img
                src="568.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition duration-1000 hover:scale-105"
              />
            </div>

            <div className="relative overflow-hidden">
              <img
                src="569.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition duration-1000 hover:scale-105"
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/50" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl px-8 md:px-16 text-white">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="tracking-[5px] text-xs uppercase text-white/70"
              >
                کالکشن ویژه
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-5xl md:text-7xl font-light leading-tight"
              >
                سادگی،
                <br />
                امضای
                <br />
                استایل شما
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-white/75 leading-8 max-w-md"
              >
                 برای
                کسانی که کیفیت، جزئیات و سادگی را انتخاب می‌کنند
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="
    group
    mt-12
    flex
    items-center
    gap-4
    text-sm
    tracking-[2px]
    text-white
    border-b
    border-white/40
    pb-3
    transition-all
    duration-500
    hover:border-white
  "
              >
                مشاهده کالکشن
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.3}
                  className="
      transition-transform
      duration-500
      group-hover:translate-x-1
      group-hover:-translate-y-1
    "
                />
              </motion.button>
            </div>
          </div>

          <div className="absolute bottom-10 right-10 hidden lg:flex gap-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-7 py-5">
              <p className="text-4xl font-light text-white">+1200</p>
              <span className="text-sm text-white/70">سفارش موفق</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-7 py-5">
              <p className="text-4xl font-light text-white">98%</p>
              <span className="text-sm text-white/70">رضایت مشتریان</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
