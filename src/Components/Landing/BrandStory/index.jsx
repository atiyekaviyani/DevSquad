import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_.92fr] xl:gap-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -70, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="overflow-hidden rounded-[34px]">
              <img
                src="880.webp"
                alt="Brand Story"
                className="h-[620px] w-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
              />
            </div>

            {/* soft gradient */}
            <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="
                absolute
                bottom-8
                left-8
                rounded-3xl
                border
                border-white/40
                bg-white/55
                px-6
                py-5
                backdrop-blur-2xl
              "
            >
              <span className="text-[11px] tracking-[5px] uppercase text-neutral-500">
                Since 2026
              </span>

              <h3 className="mt-2 text-2xl font-light text-neutral-900">
                Crafted for Everyday
              </h3>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div dir="rtl" className="text-right">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block text-xs tracking-[6px] text-neutral-400"
            >
              داستان برند
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="
                mt-5
                max-w-xl
                text-[42px]
                leading-[1.35]
                text-neutral-900
                lg:text-[56px]
              "
            >
              لونا؛ کیفیتی که هر روز همراه توست.
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 52 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 h-[2px] bg-neutral-900"
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="mt-10 max-w-xl space-y-6"
            >
              {[
                "در لونا، لباس فقط یک محصول نیست؛ بخشی از تجربه روزانه شماست. هر طراحی با تمرکز بر سادگی، کیفیت و دوام شکل می‌گیرد تا بدون وابستگی به ترندهای زودگذر، همیشه قابل استفاده باشد.",

                "از انتخاب پارچه تا آخرین دوخت، هر جزئیات با دقت بررسی می‌شود تا محصولی خلق شود که در کنار زیبایی، احساس راحتی و اعتمادبه‌نفس را نیز منتقل کند.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 20,
                    },
                    show: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  className="
                    text-[17px]
                    leading-[2.15]
                    text-neutral-600
                   
                  "
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            {/* Bottom Row */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-14 flex flex-wrap items-center justify-between gap-8"
            >
              {/* Stats */}
              {/* <div className="flex gap-10">
                <div>
                  <h4 className="text-3xl ">+12K</h4>
                  <p className="mt-2 text-sm text-neutral-500">
                    مشتری وفادار
                  </p>
                </div>

                <div>
                  <h4 className="text-3xl">100%</h4>
                  <p className="mt-2 text-sm text-neutral-500">
                    طراحی اختصاصی
                  </p>
                </div>
              </div> */}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/about"
                  className="
      group
      inline-flex
      items-center
      gap-3
      text-[15px]
      tracking-[0.3px]
      text-neutral-900
    "
                >
                  <span className="relative">
                    با داستان ما آشنا شوید
                    <span className="absolute -bottom-2 right-0 h-[1px] w-0 bg-neutral-900 transition-all duration-500 group-hover:w-full" />
                  </span>

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.8}
                    className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
