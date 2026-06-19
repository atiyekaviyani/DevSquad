import React from "react";
import { motion } from "framer-motion";

import MenuColumn from "./MenuColumn";
import ProductCard from "./ProductCard";
import CollectionBanner from "./CollectionBanner";

import { women, men, collections, bestSellers } from "./data";

export default function MegaMenu() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.25,
      }}
      dir="rtl"
      className="
      absolute
      left-40
      top-full
      border-2
      mt-4
      w-[1300px]
      bg-white/95
      backdrop-blur-xl
      rounded-[20px]
      border-zinc-100
      shadow-[10_80px_120px_rgba(0,0,0,0.08)]
      overflow-hidden
      z-50
      "
    >
      <div className="flex p-12">
        <div className="w-[25%]">
          <MenuColumn title="دسته‌بندی زنانه" items={women} />
        </div>

        <div className="w-[20%] px-8">
          <MenuColumn title="کالکشن‌ها" items={collections} />
        </div>

        <div className="w-[25%]">
          <MenuColumn title="دسته‌بندی مردانه" items={men} />
        </div>

        <div className="w-[30%] pr-8">
          <h3 className="text-lg font-bold mb-8">پرفروش‌ترین‌ها</h3>

          <div className="space-y-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <button
            className="
            mt-8
            w-full
            py-3
            rounded-full
            border
            border-zinc-500
            hover:bg-black
            hover:text-white
            transition-all
          "
          >
            مشاهده همه
          </button>
        </div>
      </div>

      <div className="px-12 pb-12">
        <CollectionBanner />
      </div>
    </motion.div>
  );
}
