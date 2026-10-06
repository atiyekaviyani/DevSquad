import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Feature({ icon, title, desc }) {
  return (
    <div className="group flex items-center gap-4 px-8 py-7 transition-all duration-500 hover:bg-white/[0.03]">
      <div className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div>
        <h4 className="text-[15px] font-medium text-white">{title}</h4>
        <p className="mt-1 text-[13px] leading-7 text-white/60">{desc}</p>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/40 to-black/60" />

      <div className="absolute -top-60 -right-52 w-[700px] h-[700px] rounded-full bg-white/10 blur-[180px]" />

      <div className="relative z-20 max-w-[1450px] mx-auto px-6 lg:px-14 pt-[150px]">
        <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-[640px] mx-auto text-center flex flex-col items-center"
          >
            <div dir="rtl" className="max-w-[500px] mx-auto text-center">
              <h1
                className="
    text-white
    leading-[1.08]
    tracking-[-3px]
    text-[20px]
    sm:text-[64px]
    lg:text-[50px]
    font-normal
    "
              >
                <span className="block font-normal">
                  جایی که کیفیت، استایل را معنا می‌کند
                </span>
              </h1>

              <div className="w-16 h-[1px] bg-white/30 mt-10 mb-8 mx-auto" />

              <p
                className="
    max-w-[430px]
    mx-auto
    text-[15px]
    sm:text-[17px]
    leading-[2.2]
    text-white/80
    font-normal
    tracking-[0.1px]
    "
              >
                پارچه‌های منتخب، دوخت حرفه‌ای و طراحی ماندگار؛ برای کسانی که به
                جزئیات اهمیت می‌دهند.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <motion.button
                onClick={() => navigate("/Store")}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="
    group
    relative
    h-14
    px-9
    bg-white
    text-gray-950
    flex
    items-center
    gap-5
    text-[14px]
    font-light
    overflow-hidden
    transition-all
    duration-500
    rounded-md
    "
              >
                <span
                  className="
      absolute
      inset-0
      bg-gray-950/5
      translate-x-[-100%]
      group-hover:translate-x-0
      transition-transform
      duration-500
      "
                />

                <span className="relative z-10">مشاهده محصولات</span>

                <ArrowLeft
                  size={18}
                  strokeWidth={1.5}
                  className="
      relative
      z-10
      transition-transform
      duration-500
      group-hover:-translate-x-2
      "
                />
              </motion.button>

              <motion.button
                onClick={() => navigate("/Store?sort=latest")}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="
    h-14
    px-9
    border
    border-white/30
    text-white
    bg-transparent
    flex
    items-center
    gap-4
    text-[14px]
    font-light
    transition-all
    duration-500
    hover:border-white
    rounded-md
  "
              >
                کالکشن جدید
                <span
                  className="
      w-1.5
      h-1.5
      rounded-full
      bg-white
    "
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="
  hidden
  lg:flex
  absolute
  bottom-16
  left-1/2
  -translate-x-1/2
  flex-col
  items-center
  gap-4
  text-white/80
  "
      ></motion.div>
    </section>
  );
}
