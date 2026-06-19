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
      rounded-2xl
      hover:bg-zinc-50
      transition-all
      duration-300
      cursor-pointer
    "
    >
      <img
        loading="lazy"
        src={product.image}
        alt={product.title}
        className="
        w-16
        h-16
        rounded-xl
        object-cover
        group-hover:scale-105
        transition
        duration-300
      "
      />

      <div>
        <h4 className="text-sm font-medium">{product.title}</h4>

        <p className="text-xs text-zinc-500 mt-1">{product.price} تومان</p>
      </div>
    </div>
  );
}
