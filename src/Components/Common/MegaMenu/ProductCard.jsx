import React from "react";
import { ChevronLeft, Star } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  const productId = product?.id;

  const productName = product?.name || product?.title || "محصول بدون نام";

  const productPrice = (() => {
    if (Array.isArray(product?.variants) && product.variants.length > 0) {
      const availableVariant = product.variants.find(
        (variant) => Number(variant?.stock || 0) > 0,
      );

      const price = availableVariant?.price ?? product.variants[0]?.price;

      if (price != null) {
        return Number(String(price).replace(/,/g, ""));
      }
    }

    return Number(String(product?.price ?? "0").replace(/,/g, "")) || 0;
  })();

  const formattedPrice =
    productPrice > 0
      ? new Intl.NumberFormat("fa-IR").format(productPrice)
      : "تماس بگیرید";

  const rating = Number(product?.rating || 0);

  const productImage = (() => {
    if (Array.isArray(product?.images) && product.images.length > 0) {
      const mainImage = product.images.find(
        (image) => Number(image?.is_main) === 1,
      );

      return mainImage?.path || product.images[0]?.path || "/Product2.png";
    }

    return "/Product2.png";
  })();

  const productUrl = productId ? `/ProductDetail/${productId}` : "/Store";

  return (
    <NavLink
      to={productUrl}
      className="
        group
        relative
        flex
        items-center
        gap-3
        p-2
        rounded-[10px]
        bg-transparent
        hover:bg-white/80
        transition-all
        duration-400
      "
    >
      <div
        className="
          relative
          shrink-0
          w-[62px]
          h-[72px]
          overflow-hidden
          rounded-[7px]
          bg-[#EDE8DF]
        "
      >
        <img
          src={productImage}
          alt={productName}
          loading="lazy"
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.06]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-black/0
            group-hover:bg-black/[0.03]
            transition-colors
            duration-500
          "
        />
      </div>

      <div
        className="
          min-w-0
          flex-1
          flex
          flex-col
          justify-center
          py-1
        "
      >
        <div className="flex items-start justify-between gap-2">
          <h4
            className="
              min-w-0
              text-[11.5px]
              font-medium
              text-[#1F2240]
              leading-6
              truncate
              transition-colors
              duration-300
              group-hover:text-[#111326]
            "
          >
            {productName}
          </h4>

          <ChevronLeft
            size={14}
            strokeWidth={1.4}
            className="
              shrink-0
              mt-1
              text-[#1F2240]/20
              translate-x-1
              opacity-0
              transition-all
              duration-300
              group-hover:translate-x-0
              group-hover:opacity-100
              group-hover:text-[#1F2240]/70
            "
          />
        </div>

        {rating > 0 && (
          <div
            className="
              flex
              items-center
              gap-1
              mt-1
            "
          >
            <Star
              size={10}
              strokeWidth={1.5}
              className="fill-current text-[#1F2240]/55"
            />

            <span
              className="
                text-[9px]
                text-[#1F2240]/45
              "
            >
              {rating.toFixed(1)}
            </span>
          </div>
        )}

        <div
          className="
            mt-1.5
            flex
            items-center
            gap-1
          "
        >
          <span
            className="
              text-[11px]
              font-semibold
              text-[#1F2240]
              tracking-tight
            "
          >
            {formattedPrice}
          </span>

          {productPrice > 0 && (
            <span
              className="
                text-[8px]
                text-[#1F2240]/40
              "
            >
              تومان
            </span>
          )}
        </div>
      </div>
    </NavLink>
  );
}
