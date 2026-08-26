import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const images = [
  {
    src: "/7.png",
    title: "کالکشن جدید روز",
    subtitle: "استایل مینیمال جدید",
  },
  {
    src: "/10.png",
    title: "استایل بیسیک",
    subtitle: "کالکشن استایل خیابانی",
  },
  {
    src: "/8.png",
    title: "استایل اسپرت",
    subtitle: "پوشاک روزمره لوکس",
  },
  {
    src: "/9.png",
    title: "استایل کلاسیک",
    subtitle: "سبک پوشش مدرن",
  },
];

function ImageCard({ item, elevated }) {
  return (
    <div
      className={`
        group
        relative
        w-full
        sm:w-[280px]
        md:w-[300px]
        lg:w-[320px]
        h-[380px]
        md:h-[460px]
        overflow-hidden
        rounded-3xl
        bg-neutral-100
        transition-all
        duration-700
        mb-10
        hover:-translate-y-3
        ${elevated ? "lg:-translate-y-14" : ""}
      `}
    >
      <img
        src={item.src}
        alt={item.title}
        className="
          w-full
          h-full
          object-cover
          transition-transform
          duration-[1200ms]
          ease-out
          group-hover:scale-[1.05]
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/65
          via-black/20
          to-transparent
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          left-0
          p-8
          text-white
          translate-y-4
          group-hover:translate-y-0
          transition-all
          duration-700
        "
      >
        <span
          className="
            block
            text-[10px]
            tracking-[5px]
            uppercase
            text-white/60
            mb-4
          "
        >
          COLLECTION
        </span>

        <h3
          className="
            text-3xl
            font-light
            tracking-tight
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-3
            text-sm
            text-white/75
            font-light
          "
        >
          {item.subtitle}
        </p>

        <div
          className="
            mt-6
            w-11
            h-11
            rounded-full
            border
            border-white/30
            flex
            items-center
            justify-center
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
          "
        >
          <GoArrowUpRight size={20} />
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section
      dir="rtl"
      className="
        w-full
        mt-36
        px-5
        bg-white
      "
    >
      <div
        className="
          max-w-[1400px]
          mx-auto
        "
      >
        <div
          className="
            text-right
            mb-16
          "
        >
          <span
            className="
              text-[11px]
              tracking-[6px]
              text-neutral-400
            "
          >
            STYLE GALLERY
          </span>

          <h2
            className="
              mt-5
              text-2xl
              md:text-3xl
             
              text-neutral-900
            "
          >
            الهام از سبک زندگی
          </h2>
        </div>

        <div
          className="
            flex
            flex-wrap
            justify-center
            items-start
            gap-8
            lg:gap-10
          "
        >
          {images.map((item, index) => (
            <ImageCard
              key={index}
              item={item}
              elevated={index === 1 || index === 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
