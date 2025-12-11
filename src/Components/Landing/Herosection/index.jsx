import React from "react";
import { ArrowUpRight, Dot } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-[90%] mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-24">
      {/* Left Images */}
      <div className="relative lg:w-1/2 flex justify-center ">
        <img
          src="/imgHer1.png"
          alt="model"
          className="hidden sm:block sm:w-96 h-auto border border-black object-cover"
        />

        <img
          src="/imgher2.png"
          alt="small"
          className="hidden sm:block sm:w-56 h-auto object-cover absolute -bottom-6 -right-4 shadow-lg"
        />
      </div>

      {/* Right Content */}
      <div className="lg:w-1/2 flex flex-col items- text-right">
        <button className="w-56 flex items-center gap-2 border-2 bg-gray-200 px-4 py-2 rounded-full text-sm">
          <Dot className="w-4 h-4" />! مد را هدفمندانه کشف کن
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold mt-4 leading-snug">
          کالکشن ویژه لباس مردانه و <br /> زنانه ترند روز
        </h1>

        <p className="text-gray-500 mt-4 leading-relaxed text-sm sm:text-base">
          از انتخاب های خاص ما برای استایل برتر و خوش پوشی بی نهایت بهره مند
          شوید. خریدی آسان با ارسال سریع و تضمین رضایت شما. با ما همیشه بدرخشید
          و خوشتیپ بمانید!
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 w-full mt-10 text-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">3000+</h3>
            <p className="text-xs sm:text-sm text-gray-500">رضایت مشتریان</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">500+</h3>
            <p className="text-xs sm:text-sm text-gray-500">محصولات جدید</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">5000</h3>
            <p className="text-xs sm:text-sm text-gray-500">کاربران فروشگاه</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-10 justify-start lg:justify-end w-full">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm hover:opacity-80 transition">
            فروشگاه <ArrowUpRight className="w-4 h-4" />
          </button>

          <button className="flex items-center gap-2 border border-black px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition">
            کالکشن جدید <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

