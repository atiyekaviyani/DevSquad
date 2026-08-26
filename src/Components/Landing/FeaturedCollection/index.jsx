import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedCollection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="
            relative overflow-hidden 
            rounded-[48px]
            h-[520px] sm:h-[620px] lg:h-[720px]
            group
          "
        >
          <img
            src="878.png"
            alt="Premium Collection"
            className="
              absolute inset-0 
              w-full h-full 
              object-cover
              transition-transform duration-[1200ms]
              ease-out
              group-hover:scale-[1.04]
            "
          />

          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-black/75
              via-black/45
              to-black/10
            "
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="relative h-full flex items-center">
            <div
              className="
                max-w-2xl
                px-8 sm:px-14 lg:px-24
                text-white
              "
            >
              <motion.span
                initial={{ opacity: 0, letterSpacing: "20px" }}
                whileInView={{ opacity: 1, letterSpacing: "8px" }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="
                  block
                  uppercase
                  text-[11px]
                  sm:text-xs
                  text-white/70
                "
              >
                WINTER COLLECTION 2026
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="
                  mt-8
                  text-4xl
                  sm:text-6xl
                  lg:text-[78px]
                  font-light
                  leading-[1.15]
                  tracking-tight
                "
              >
                فراتر از مد، همیشه ماندگار
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                viewport={{ once: true }}
                className="
    mt-8
    max-w-md
    text-sm
    sm:text-base
    leading-8
    text-white/70
    font-light
  "
              >
                طراحی مینیمال، متریال ممتاز و کیفیتی ماندگار برای استایل‌های
                بی‌زمان.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="
                  mt-12
                  flex
                  items-center
                  gap-5
                  border-b
                  border-white/40
                  pb-3
                  text-sm
                  tracking-[3px]
                  uppercase
                  transition-all
                  duration-500
                  hover:border-white
                  group/btn
                "
              >
                مشاهده کالکشن
                <ArrowUpRight
                  size={18}
                  className="
                    transition-transform
                    duration-500
                    group-hover/btn:translate-x-1
                    group-hover/btn:-translate-y-1
                  "
                />
              </motion.button>
            </div>
          </div>

          <div
            className="
              absolute
              bottom-10
              right-10
              hidden
              lg:block
              w-24
              h-px
              bg-white/40
            "
          />
        </motion.div>
      </div>
    </section>
  );
}
