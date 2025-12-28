import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const slidesData = [
  {
    text: "گارانتی یک ساله",
    icon: "/Vector1.svg",
  },
  {
    text: "۱۰٪ تخفیف ویژه",
    icon: "/vector2.svg",
  },
  {
    text: "امکان مرجوع کالا",
    icon: "/vector3.svg",
  },
  {
    text: "ارسال سریع و رایگان",
    icon: "/vector4.svg",
  },
];

export default function FeaturesMarquee() {
  return (
    <Swiper
      modules={[Autoplay]}
      dir="rtl"
      rtlTranslate
      loop
      slidesPerView="auto"
      spaceBetween={16}
      speed={6000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      className="mt-16 py-4"
    >
      {[...slidesData, ...slidesData].map((item, index) => (
        <SwiperSlide key={index} className="!w-auto select-none">
          <div className="flex items-center  text-gray-700 text-lg font-medium shadow-sm hover:shadow-md transition">
            <img
              src={item.icon}
              className="w-36 h-10 object-contain "
              draggable={false}
            />
            <span className="whitespace-nowrap">{item.text}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
