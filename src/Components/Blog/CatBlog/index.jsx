import React from "react";
import { motion } from "framer-motion";

export default function ArticleSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className=""
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <img
          src="Blog.png"
          alt="blog banner"
          className="w-full h-40 object-cover"
        />
      </div>

      <section className="px-4 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ml-14">
          <motion.div
            className="relative bg-white shadow rounded-2xl overflow-hidden h-[490px]"
            variants={itemVariants}
          >
            <img
              src="01.svg"
              alt="article 1"
              className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm text-white px-5 py-4 rounded-2xl transition-all duration-300 hover:bg-black/50">
              <span className="text-[11px] tracking-wide opacity-80">
                مد و فشن
              </span>

              <h3 className="mt-1 text-sm font-medium leading-relaxed">
                از پاریس تا لندن؛ بهترین‌های کالکشن بهار و تابستان ۲۰۲۵
              </h3>

              <button
                className="mt-3 inline-flex items-center gap-2 text-xs border border-white/70 px-4 py-1.5 rounded-full
    hover:bg-white hover:text-black transition-all duration-300"
              >
                مشاهده مقاله
                <span className="text-base leading-none">←</span>
              </button>
            </div>
          </motion.div>

          <motion.div className="flex flex-col gap-6" variants={itemVariants}>
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                className="relative bg-white shadow rounded-2xl overflow-hidden h-52"
                variants={itemVariants}
              >
                <img
                  src="Frame 5.png"
                  alt="article 2"
                  className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
                />

                <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm text-white px-4 py-3 rounded-2xl transition-all duration-300">
                  <span className="text-[11px] tracking-wide opacity-80">
                    مد و پوشاک
                  </span>

                  <button
                    className="mt-3 text-xs border border-white/70 px-4 py-1.5 rounded-full
    hover:bg-white hover:text-black transition-all duration-300"
                  >
                    مشاهده مقالات
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="relative bg-white shadow rounded-2xl overflow-hidden h-52"
                variants={itemVariants}
              >
                <img
                  src="Frame 6.png"
                  alt="article 3"
                  className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm text-white px-4 py-3 rounded-2xl transition-all duration-300">
                  <span className="text-[11px] tracking-wide opacity-80">
                    راهنمای خرید
                  </span>

                  <button
                    className="mt-3 text-xs border border-white/70 px-4 py-1.5 rounded-full
    hover:bg-white hover:text-black transition-all duration-300"
                  >
                    مشاهده مقالات
                  </button>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative bg-white shadow rounded-2xl overflow-hidden h-64"
              variants={itemVariants}
            >
              <img
                src="Frame 8.png"
                alt="article 4"
                className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
              />
              <div
                className="
    absolute bottom-4 left-4 right-4
    bg-black/30 backdrop-blur-sm
    text-white
    px-4 py-3
    rounded-2xl
    transition-all duration-300
  "
              >
                <span className="text-[11px] tracking-wide opacity-80">
                  طراحی و دوخت لباس
                </span>

                <h3 className="mt-1 text-sm font-semibold leading-snug">
                  تحولات طراحی دوخت
                </h3>

                <button
                  className="
      mt-3
      text-xs
      border border-white/70
      px-4 py-1.5
      rounded-full
      hover:bg-white hover:text-black
      transition-all duration-300
    "
                >
                  مشاهده مقالات
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="flex flex-col gap-6" variants={itemVariants}>
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                className="relative bg-white shadow rounded-2xl overflow-hidden h-52 w-96"
                variants={itemVariants}
              >
                <img
                  src="Frame 6.png"
                  alt="article 3"
                  className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
                />
                <div
                  className="
    absolute bottom-4 left-4 right-4
    bg-black/30 backdrop-blur-sm
    text-white
    px-4 py-3
    rounded-2xl
    transition-all duration-300
  "
                >
                  <span className="text-[11px] tracking-wide opacity-80">
                    راهنمای خرید
                  </span>

                  <button
                    className="
      mt-3
      text-xs
      border border-white/70
      px-4 py-1.5
      rounded-full
      hover:bg-white hover:text-black
      transition-all duration-300
      flex items-center gap-1
    "
                    type="button"
                    aria-label="مشاهده مقالات راهنمای خرید"
                  >
                    مشاهده مقالات
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative bg-white shadow rounded-2xl overflow-hidden h-64 w-96"
              variants={itemVariants}
            >
              <img
                src="Frame 8.png"
                alt="article 4"
                className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
              />

              <div
                className="
    absolute bottom-4 left-4 right-4
    bg-black/30 backdrop-blur-sm
    text-white
    px-4 py-3
    rounded-2xl
    transition-all duration-300
  "
              >
                <span className="text-[11px] tracking-wide opacity-80">
                  طراحی و دوخت لباس
                </span>

                <h3 className="mt-1 text-sm font-semibold leading-snug">
                  تحولات طراحی دوخت
                </h3>

                <button
                  className="
      mt-3
      text-xs
      border border-white/70
      px-4 py-1.5
      rounded-full
      hover:bg-white hover:text-black
      transition-all duration-300
    "
                >
                  مشاهده مقالات
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
