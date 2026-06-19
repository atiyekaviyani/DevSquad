import React from "react";
import { ArrowLeft } from "lucide-react";

export default function CollectionBanner() {
  return (
    <div
      className="
      bg-[#f7f4f1]
      rounded-[28px]
      min-h-[260px]
      flex
      items-center
      justify-between
      overflow-hidden
    "
    >
      <div className="p-10">
        <p
          className="
          text-xs
          tracking-[4px]
          text-zinc-500
          mb-4
        "
        >
          NEW COLLECTION
        </p>

        <h2
          className="
          text-4xl
          font-bold
          mb-6
        "
        >
          کالکشن تابستانه
        </h2>

        <button
          className="
          rounded-full
          border
          px-6
          py-3
          flex
          items-center
          gap-2
          hover:bg-black
          hover:text-white
          transition-all
        "
        >
          مشاهده و خرید

          <ArrowLeft size={16} />
        </button>
      </div>

      <img
        src="/images/banner-fashion.jpg"
        alt=""
        className="
        w-[40%]
        h-full
        object-cover
      "
      />
    </div>
  );
}