import React from "react";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function CollectionBanner() {
  return (
    <div
      className="
        group
        bg-[#F1EDE6]
        rounded-[18px]
        min-h-[240px]
        flex
        items-stretch
        justify-between
        overflow-hidden
        border
        border-[#E5DED2]
      "
    >
      <div
        className="
          flex
          flex-col
          justify-center
          p-8
          lg:p-10
          shrink-0
        "
      >
        <p
          className="
            text-[9px]
            tracking-[4px]
            uppercase
            text-[#1F2240]/45
            mb-4
          "
        >
          NEW COLLECTION
        </p>

        <h2
          className="
            text-2xl
            lg:text-3xl
            font-medium
            tracking-tight
            text-[#1F2240]
            mb-6
          "
        >
          کالکشن تابستانه
        </h2>

        <NavLink
          to="/Store"
          className="
            group/button
            w-fit
            min-w-[145px]
            h-11
            px-5
            rounded-full
            border
            border-[#1F2240]/25
            flex
            items-center
            justify-center
            gap-2
            text-[11px]
            font-medium
            text-[#1F2240]
            transition-all
            duration-500
            hover:bg-[#1F2240]
            hover:text-[#F7F3EB]
            hover:border-[#1F2240]
          "
        >
          <span>مشاهده و خرید</span>

          <ArrowLeft
            size={15}
            strokeWidth={1.5}
            className="
              transition-transform
              duration-300
              group-hover/button:-translate-x-1
            "
          />
        </NavLink>
      </div>

      <div
        className="
          relative
          w-[42%]
          min-h-[240px]
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-l
            from-transparent
            to-[#1F2240]/[0.04]
            pointer-events-none
          "
        />
      </div>
    </div>
  );
}
