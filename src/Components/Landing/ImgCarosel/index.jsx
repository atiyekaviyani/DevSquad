import React from "react";

export default function GallerySection() {
  const images = [
    "public/img4.png",
    "public/img3.png",
    "public/img2.png",
    "public/img1.png",
  ];

  return (
    <section className="w-full py-10 mt-28">
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center gap-10">
        {/* کارت مشترک: استفاده از group برای کنترل هاور داخلی */}
        {/* عکس 1 */}
        <div
          className="
            group
            w-full sm:w-[280px] md:w-[300px] lg:w-[317px] 
            h-[340px] sm:h-[360px] md:h-[380px] lg:h-[389px]
            overflow-hidden shadow-md bg-gray-100
            transition-transform duration-500 ease-out
            hover:-translate-y-3 hover:shadow-2xl
          "
        >
          <div className="relative w-full h-full">
            <img
              src={images[0]}
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              alt=""
            />
            {/* overlay gradient */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>

        {/* عکس 2 - بالاتر فقط در دسکتاپ */}
        <div
          className="
            group
            w-full sm:w-[280px] md:w-[300px] lg:w-[317px] 
            h-[340px] sm:h-[360px] md:h-[380px] lg:h-[389px]
            overflow-hidden shadow-md bg-gray-100
            relative lg:-top-16
            transition-transform duration-500 ease-out
            hover:-translate-y-3 hover:shadow-2xl
          "
        >
          <div className="relative w-full h-full">
            <img
              src={images[1]}
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              alt=""
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>

        {/* عکس 3 */}
        <div
          className="
            group
            w-full sm:w-[280px] md:w-[300px] lg:w-[317px] 
            h-[340px] sm:h-[360px] md:h-[380px] lg:h-[389px]
            overflow-hidden shadow-md bg-gray-100
            transition-transform duration-500 ease-out
            hover:-translate-y-3 hover:shadow-2xl
          "
        >
          <div className="relative w-full h-full">
            <img
              src={images[2]}
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              alt=""
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>

        {/* عکس 4 - بالاتر فقط در دسکتاپ */}
        <div
          className="
            group
            w-full sm:w-[280px] md:w-[300px] lg:w-[317px] 
            h-[340px] sm:h-[360px] md:h-[380px] lg:h-[389px]
            overflow-hidden shadow-md bg-gray-100
            relative lg:-top-16
            transition-transform duration-500 ease-out
            hover:-translate-y-3 hover:shadow-2xl
          "
        >
          <div className="relative w-full h-full">
            <img
              src={images[3]}
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              alt=""
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
