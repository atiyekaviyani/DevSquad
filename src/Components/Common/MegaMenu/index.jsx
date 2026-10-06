import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import MenuColumn from "./MenuColumn";
import ProductCard from "./ProductCard";
import CollectionBanner from "./CollectionBanner";

import { women, men, collections, bestSellers } from "./data";

export default function MegaMenu() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 12,
        scale: 0.985,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      dir="rtl"
      className="
        w-[min(1280px,calc(100vw-48px))]
        bg-[#F7F3EB]
        rounded-[22px]
        border
        border-[#E5DED2]
        shadow-[0_30px_80px_rgba(31,34,64,0.16)]
        overflow-hidden
      "
    >
      {/* Header / Top Label */}
      <div
        className="
          px-10
          lg:px-12
          pt-8
          pb-6
          border-b
          border-[#E5DED2]
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <span
              className="
                block
                text-[9px]
                tracking-[4px]
                uppercase
                text-[#1F2240]/45
                mb-2
              "
            >
              LONA SHOP
            </span>

            <h2
              className="
                text-[18px]
                font-medium
                tracking-tight
                text-[#1F2240]
              "
            >
              فروشگاه
            </h2>
          </div>

          <div
            className="
              hidden
              md:flex
              items-center
              gap-3
              text-[10px]
              text-[#1F2240]/50
            "
          >
            <span className="w-8 h-px bg-[#1F2240]/20" />
            <span>EXPLORE THE COLLECTION</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-10 lg:px-12 py-10">
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[1fr_0.8fr_1fr_1.25fr]
            gap-0
          "
        >
          {/* Women */}
          <div
            className="
              md:pl-8
              md:border-l
              border-[#E5DED2]
            "
          >
            <MenuColumn title="دسته‌بندی زنانه" items={women} />
          </div>

          {/* Collections */}
          <div
            className="
              md:px-8
              md:border-l
              border-[#E5DED2]
            "
          >
            <MenuColumn title="کالکشن‌ها" items={collections} />
          </div>

          {/* Men */}
          <div
            className="
              md:px-8
              md:border-l
              border-[#E5DED2]
            "
          >
            <MenuColumn title="دسته‌بندی مردانه" items={men} />
          </div>

          {/* Best Sellers */}
          <div className="md:pr-8 mt-8 md:mt-0">
            <div
              className="
                flex
                items-end
                justify-between
                mb-6
              "
            >
              <div>
                <span
                  className="
                    block
                    text-[9px]
                    tracking-[3px]
                    uppercase
                    text-[#1F2240]/40
                    mb-2
                  "
                >
                  LONA SELECTION
                </span>

                <h3
                  className="
                    text-[15px]
                    font-semibold
                    text-[#1F2240]
                  "
                >
                  پرفروش‌ترین‌ها
                </h3>
              </div>

              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-[#EDE6D9]
                  flex
                  items-center
                  justify-center
                  text-[#1F2240]
                "
              >
                <span className="text-[11px]">04</span>
              </div>
            </div>

            {/* Products */}
            <div
              className="
                space-y-1
                bg-white/55
                rounded-[16px]
                p-2
                border
                border-white/80
              "
            >
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* All Products Button */}
            <button
              type="button"
              className="
                group
                mt-6
                w-full
                h-11
                rounded-full
                border
                border-[#1F2240]/25
                bg-transparent
                flex
                items-center
                justify-center
                gap-2
                text-[12px]
                font-medium
                text-[#1F2240]
                hover:bg-[#1F2240]
                hover:text-[#F7F3EB]
                hover:border-[#1F2240]
                transition-all
                duration-500
              "
            >
              <span>مشاهده همه محصولات</span>

              <ArrowLeft
                size={15}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-x-1
                "
              />
            </button>
          </div>
        </div>
      </div>

      {/* Collection Banner */}
      <div
        className="
          px-10
          lg:px-12
          pb-10
        "
      >
        <div
          className="
            border-t
            border-[#E5DED2]
            pt-8
          "
        >
          <CollectionBanner />
        </div>
      </div>
    </motion.div>
  );
}
