import React from "react";

const images = [
  { src: "/img4.png", alt: "تصویر شماره 4" },
  { src: "/img3.png", alt: "تصویر شماره 3" },
  { src: "/img2.png", alt: "تصویر شماره 2" },
  { src: "/img1.png", alt: "تصویر شماره 1" },
];

const baseCardClasses =
  "group w-full sm:w-[280px] md:w-[300px] lg:w-[317px] h-[340px] sm:h-[360px] md:h-[380px] lg:h-[389px] overflow-hidden shadow-md bg-gray-100 transition-transform duration-500 ease-out hover:-translate-y-3 hover:shadow-2xl";

const elevatedClasses = "relative lg:-top-16";

function ImageCard({ src, alt, elevated }) {
  return (
    <div className={`${baseCardClasses} ${elevated ? elevatedClasses : ""}`}>
      <div className="relative w-full h-full">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section className="w-full py-10 mt-28">
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center gap-10">
        <ImageCard src={images[0].src} alt={images[0].alt} />
        <ImageCard src={images[1].src} alt={images[1].alt} elevated />
        <ImageCard src={images[2].src} alt={images[2].alt} />
        <ImageCard src={images[3].src} alt={images[3].alt} elevated />
      </div>
    </section>
  );
}
