import React from "react";

export default function ProductCard({ product }) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        p-2
        rounded-xl
        cursor-pointer
        transition-all
        duration-500
        ease-out
        hover:bg-zinc-50
      "
    >
      <div
        className="
          relative
          w-[72px]
          h-[82px]
          shrink-0
          overflow-hidden
          rounded-lg
          bg-zinc-100
        "
      >
        <img
          loading="lazy"
          src={product.image}
          alt={product.title}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-110
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-black/0
            group-hover:bg-black/5
            transition-all
            duration-500
          "
        />
      </div>

      <div className="min-w-0 flex-1">
        <h4
          className="
            text-[13px]
            font-medium
            text-[#1f2240]
            leading-6
            truncate
            transition-colors
            duration-300
            group-hover:text-black
          "
        >
          {product.title}
        </h4>

        <div className="mt-1 flex items-center gap-1">
          <span
            className="
              text-[11px]
              text-zinc-500
              font-light
            "
          >
            {product.price}
          </span>

          <span
            className="
              text-[9px]
              text-zinc-400
            "
          >
            تومان
          </span>
        </div>

        <div
          className="
            mt-2
            w-0
            h-px
            bg-[#1f2240]
            group-hover:w-8
            transition-all
            duration-500
          "
        />
      </div>

      <div
        className="
          w-7
          h-7
          rounded-full
          flex
          items-center
          justify-center
          text-zinc-300
          opacity-0
          translate-x-2
          group-hover:opacity-100
          group-hover:translate-x-0
          group-hover:text-[#1f2240]
          transition-all
          duration-500
        "
      >
        <span className="text-sm">←</span>
      </div>
    </div>
  );
}
