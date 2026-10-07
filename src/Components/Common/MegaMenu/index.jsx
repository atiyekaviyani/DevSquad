import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

import MenuColumn from "./MenuColumn";
import ProductCard from "./ProductCard";
import CollectionBanner from "./CollectionBanner";

import { getProducts } from "../../../Core/Services/api/productApi";
import { getCategories } from "../../../Core/Services/api/categoryApi";

export default function MegaMenu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadMegaMenuData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);

        if (!isMounted) return;

        setCategories(Array.isArray(categoriesData) ? categoriesData : []);

        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (error) {
        console.error("MegaMenu API Error:", error);

        if (!isMounted) return;

        setCategories([]);
        setProducts([]);
      } finally {
        if (isMounted) {
          setLoadingCategories(false);
          setLoadingProducts(false);
        }
      }
    };

    loadMegaMenuData();

    return () => {
      isMounted = false;
    };
  }, []);

  const findMainCategory = (keywords) => {
    return categories.find((category) => {
      const name = String(
        category?.name || category?.title || category?.label || "",
      ).trim();

      return keywords.some((keyword) => name.includes(keyword));
    });
  };

  const getCategoryItems = (category) => {
    if (!category) return [];

    if (Array.isArray(category.children) && category.children.length > 0) {
      return category.children.map((child) => ({
        label: child?.name || child?.title || child?.label || "",
        slug: child?.slug || "",
      }));
    }

    return [];
  };

  const womenCategory = useMemo(
    () => findMainCategory(["زنانه", "زنان"]),
    [categories],
  );

  const menCategory = useMemo(
    () => findMainCategory(["مردانه", "مردان"]),
    [categories],
  );

  const kidsCategory = useMemo(
    () => findMainCategory(["بچگانه", "کودک", "کودکان"]),
    [categories],
  );

  const womenItems = useMemo(
    () => getCategoryItems(womenCategory),
    [womenCategory],
  );

  const menItems = useMemo(() => getCategoryItems(menCategory), [menCategory]);

  const kidsItems = useMemo(
    () => getCategoryItems(kidsCategory),
    [kidsCategory],
  );

  const popularProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return [...products]
      .sort((a, b) => Number(b?.rating || 0) - Number(a?.rating || 0))
      .slice(0, 3);
  }, [products]);

  const categoryLoading = loadingCategories && categories.length === 0;

  const productLoading = loadingProducts && products.length === 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 12,
        scale: 0.985,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      dir="rtl"
      className="
        w-[min(1280px,calc(100vw-48px))]
        bg-[#F7F3EB]
        rounded-[22px]
        border
        border-[#E5DED2]
        shadow-[0_30px_80px_rgba(31,34,64,0.16)]
        overflow-hidden
      "
    >
      <div
        className="
          px-10
          lg:px-12
          pt-8
          pb-6
          border-b
          border-[#E5DED2]
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <span
              className="
                block
                text-[9px]
                tracking-[4px]
                uppercase
                text-[#1F2240]/45
                mb-2
              "
            >
              LONA SHOP
            </span>

            <h2
              className="
                text-[18px]
                font-medium
                tracking-tight
                text-[#1F2240]
              "
            >
              فروشگاه
            </h2>
          </div>

          <div
            className="
              hidden
              md:flex
              items-center
              gap-3
              text-[10px]
              text-[#1F2240]/50
            "
          >
            <span className="w-8 h-px bg-[#1F2240]/20" />

            <span>EXPLORE THE COLLECTION</span>
          </div>
        </div>
      </div>

      <div className="px-10 lg:px-12 py-10">
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[1fr_1fr_1fr_1.25fr]
            gap-0
          "
        >
          <div
            className="
              md:pl-8
              md:border-l
              border-[#E5DED2]
            "
          >
            {categoryLoading ? (
              <div className="space-y-3">
                <div className="h-4 w-24 bg-[#E5DED2]/70 animate-pulse rounded" />
                <div className="h-3 w-20 bg-[#E5DED2]/50 animate-pulse rounded" />
                <div className="h-3 w-24 bg-[#E5DED2]/50 animate-pulse rounded" />
                <div className="h-3 w-16 bg-[#E5DED2]/50 animate-pulse rounded" />
              </div>
            ) : (
              <MenuColumn title="دسته‌بندی زنانه" items={womenItems} />
            )}
          </div>

          <div
            className="
              md:px-8
              md:border-l
              border-[#E5DED2]
            "
          >
            {categoryLoading ? (
              <div className="space-y-3">
                <div className="h-4 w-24 bg-[#E5DED2]/70 animate-pulse rounded" />
                <div className="h-3 w-20 bg-[#E5DED2]/50 animate-pulse rounded" />
                <div className="h-3 w-24 bg-[#E5DED2]/50 animate-pulse rounded" />
                <div className="h-3 w-16 bg-[#E5DED2]/50 animate-pulse rounded" />
              </div>
            ) : (
              <MenuColumn title="دسته‌بندی مردانه" items={menItems} />
            )}
          </div>

          <div
            className="
              md:px-8
              md:border-l
              border-[#E5DED2]
            "
          >
            {categoryLoading ? (
              <div className="space-y-3">
                <div className="h-4 w-24 bg-[#E5DED2]/70 animate-pulse rounded" />
                <div className="h-3 w-20 bg-[#E5DED2]/50 animate-pulse rounded" />
                <div className="h-3 w-24 bg-[#E5DED2]/50 animate-pulse rounded" />
                <div className="h-3 w-16 bg-[#E5DED2]/50 animate-pulse rounded" />
              </div>
            ) : (
              <MenuColumn title="دسته‌بندی بچگانه" items={kidsItems} />
            )}
          </div>

          <div
            className="
              md:pr-8
              mt-10
              md:mt-0
            "
          >
            <div
              className="
                flex
                items-end
                justify-between
                mb-6
              "
            >
              <div>
                <span
                  className="
                    block
                    text-[9px]
                    tracking-[3px]
                    uppercase
                    text-[#1F2240]/40
                    mb-2
                  "
                >
                  LONA SELECTION
                </span>

                <h3
                  className="
                    text-[15px]
                    font-semibold
                    text-[#1F2240]
                  "
                >
                  محبوب‌ترین‌ها
                </h3>
              </div>

              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-[#EDE6D9]
                  flex
                  items-center
                  justify-center
                  text-[#1F2240]
                "
              >
                <span className="text-[11px]">
                  {productLoading
                    ? "—"
                    : String(popularProducts.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div
              className="
                space-y-1
                bg-white/55
                rounded-[16px]
                p-2
                border
                border-white/80
              "
            >
              {productLoading ? (
                <>
                  <div className="h-16 bg-[#E5DED2]/50 animate-pulse rounded-[10px]" />
                  <div className="h-16 bg-[#E5DED2]/50 animate-pulse rounded-[10px]" />
                  <div className="h-16 bg-[#E5DED2]/50 animate-pulse rounded-[10px]" />
                </>
              ) : popularProducts.length > 0 ? (
                popularProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="py-8 text-center text-[11px] text-[#1F2240]/45">
                  محصول محبوبی پیدا نشد.
                </div>
              )}
            </div>

            <NavLink
              to="/Store?sort=popular"
              className="
                group
                mt-6
                w-full
                h-11
                rounded-full
                border
                border-[#1F2240]/25
                bg-transparent
                flex
                items-center
                justify-center
                gap-2
                text-[12px]
                font-medium
                text-[#1F2240]
                hover:bg-[#1F2240]
                hover:text-[#F7F3EB]
                hover:border-[#1F2240]
                transition-all
                duration-500
              "
            >
              <span>مشاهده همه محبوب‌ترین‌ها</span>

              <ArrowLeft
                size={15}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-x-1
                "
              />
            </NavLink>
          </div>
        </div>
      </div>

      <div
        className="
          px-10
          lg:px-12
          pb-10
        "
      >
        <div
          className="
            border-t
            border-[#E5DED2]
            pt-8
          "
        >
          <CollectionBanner />
        </div>
      </div>
    </motion.div>
  );
}
