// src/components/home/BestSellers.jsx

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    id: 1,
    title: "هودی اورسایز",
    price: "2790000 تومان",
    image: "515.png",
  },
  {
    id: 2,
    title: "پیراهن مینیمال",
    price: " تومان 1880000",
    image: "516.png",
  },
  {
    id: 3,
    title: "شلوار بگ",
    price: "2700000 تومان",
    image: "392.png",
  },
  {
    id: 4,
    title: "تیشرت بیسیک",
    price: "2500000 تومان",
    image: "517.png",
  },
  {
    id: 5,
    title: "کت کلاسیک",
    price: "5890000 تومان",
    image: "518.png",
  },
];

export default function BestSellers() {
  return (
    <section className="py-28 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <span className="uppercase tracking-[5px] text-xs text-neutral-400">
             محبوب‌ترین‌ها
            </span>

            <h2 className="mt-4 text-5xl font-light tracking-tight">
             پرفروش‌ترین‌ها
            </h2>
          </div>

          <button className="hidden md:flex items-center gap-2 text-sm hover:gap-4 transition-all">
           مشاهده کالکشن
            <ArrowUpRight size={18} strokeWidth={1.5}/>
          </button>
        </motion.div>

        <motion.div
          initial={{opacity:0,y:35}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:.7}}
          className="relative overflow-hidden rounded-[34px] mb-8 group cursor-pointer"
        >
          <div className="aspect-[16/7] bg-neutral-100 overflow-hidden">
            <img
              src={products[0].image}
              alt=""
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"/>

          <div className="absolute left-10 bottom-10 text-white">
            <span className="text-xs tracking-[4px] opacity-70">
             پرفروش‌ترین‌ها
            </span>

            <h3 className="text-4xl font-light mt-3">
              {products[0].title}
            </h3>

            <p className="mt-2 opacity-80">
              {products[0].price}
            </p>
          </div>

          <div className="absolute right-8 bottom-8 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <ArrowUpRight size={22}/>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(1).map((item,index)=>(
            <motion.div
              key={item.id}
              initial={{opacity:0,y:35}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true}}
              transition={{
                duration:.55,
                delay:index*.1
              }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-[26px] overflow-hidden bg-neutral-100 aspect-square">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />

                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] tracking-[2px]">
                پرفروش‌ترین‌ها
                </span>

                <div className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-white flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
                  <ArrowUpRight size={18}/>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-base font-medium text-neutral-900">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm text-neutral-500">
                  {item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}