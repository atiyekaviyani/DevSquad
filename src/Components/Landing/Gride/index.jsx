import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import apiClient from "../../../Core/Services/api/apiClient";

// ----------------------------------
// Rating Stars
// ----------------------------------

function RatingStars({ count }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`text-[11px] ${
            i < count ? "text-black" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// ----------------------------------
// Product Grid
// ----------------------------------

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ----------------------------------
  // Get Products From Backend
  // ----------------------------------

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient("/products", {
          method: "GET",
        });

        console.log("PRODUCT GRID RESPONSE:", response);

        const data = Array.isArray(response?.data) ? response.data : [];

        setProducts(data.slice(0, 8));
      } catch (err) {
        console.error("Product Grid Error:", err);

        setError(err?.message || "دریافت محصولات با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // ----------------------------------
  // Loading
  // ----------------------------------

  if (loading) {
    return (
      <section className="mx-auto mt-32 max-w-[1300px] px-5" dir="rtl">
        <div className="mb-12">
          <p className="mb-3 text-xs tracking-[4px] text-gray-400">
            COLLECTION
          </p>

          <h2 className="text-3xl font-semibold">جدیدترین محصولات</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="aspect-[4/5] rounded-[34px] bg-gray-200" />

              <div className="mt-5 h-4 rounded bg-gray-200" />

              <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ----------------------------------
  // Error
  // ----------------------------------

  if (error) {
    return (
      <section className="mx-auto mt-32 max-w-[1300px] px-5" dir="rtl">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-32 max-w-[1300px] px-5" dir="rtl">
      {/* ---------------------------------- */}
      {/* Header */}
      {/* ---------------------------------- */}

      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="mb-3 text-xs tracking-[4px] text-gray-400">
            COLLECTION
          </p>

          <h2 className="text-3xl font-semibold">جدیدترین محصولات</h2>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 border-b border-black pb-1 text-sm transition-all hover:gap-4"
          onClick={() => navigate("/Store")}
        >
          مشاهده همه
          <GoArrowUpRight />
        </button>
      </div>

      {/* ---------------------------------- */}
      {/* Grid */}
      {/* ---------------------------------- */}

      <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((item) => {
          const image =
            item.images?.find((img) => img.is_main === 1)?.path ||
            item.images?.[0]?.path ||
            "/Product2.png";

          const rating = Math.round(Number(item.rating || 0));

          return (
            <div
              key={item.id}
              onClick={() => navigate(`/ProductDetail/${item.id}`)}
              className="group relative cursor-pointer"
            >
              {/* Image */}
              <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[34px] bg-[#faf9f7]">
                <div className="absolute right-5 top-5 z-10 rounded-full bg-white px-3 py-1 text-[11px] shadow-sm">
                  NEW
                </div>

                <img
                  src={image}
                  alt={item.name}
                  className="h-[85%] w-[85%] object-contain transition duration-700 group-hover:scale-105"
                />

                {/* View Product */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate(`/ProductDetail/${item.id}`);
                  }}
                  className="absolute bottom-5 left-5 right-5 h-12 translate-y-4 rounded-full bg-black text-sm text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  مشاهده محصول
                  <GoArrowUpRight className="ml-1 inline" />
                </button>
              </div>

              {/* Info */}
              <div className="mt-5 text-right">
                <div className="mb-2 flex items-center justify-between">
                  <RatingStars count={rating} />

                  <span className="text-[11px] text-gray-400">
                    LN-{item.id}
                  </span>
                </div>

                <h3 className="line-clamp-2 text-sm font-medium leading-6">
                  {item.name}
                </h3>

                {item.category?.name && (
                  <p className="mt-1 text-xs text-gray-400">
                    {item.category.name}
                  </p>
                )}

                <p className="mt-3 font-semibold">
                  {Number(item.price || 0).toLocaleString("fa-IR")} تومان
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
