import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heart } from "lucide-react";
import { MdOutlineChevronLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { GoCheck } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";

export default function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]); // محصولات در سبد
  const [cartStatus, setCartStatus] = useState({}); // پیام موقتی سبد
  const [favorites, setFavorites] = useState([]); // محصولات علاقه‌مندی
  const timeoutsRef = useRef({});

  // دریافت محصولات
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // پاک کردن timeoutها هنگام unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach((t) => clearTimeout(t));
      timeoutsRef.current = {};
    };
  }, []);

  // توگل افزودن/حذف سبد خرید
  const toggleCart = (id) => {
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }

    if (addedToCart.includes(id)) {
      setAddedToCart((prev) => prev.filter((itemId) => itemId !== id));
      setCartStatus((s) => ({ ...s, [id]: "removed" }));
      timeoutsRef.current[id] = setTimeout(() => {
        setCartStatus((s) => {
          const copy = { ...s };
          delete copy[id];
          return copy;
        });
        delete timeoutsRef.current[id];
      }, 2200);
    } else {
      setAddedToCart((prev) => [...prev, id]);
      setCartStatus((s) => ({ ...s, [id]: "added" }));
      timeoutsRef.current[id] = setTimeout(() => {
        setCartStatus((s) => {
          const copy = { ...s };
          delete copy[id];
          return copy;
        });
        delete timeoutsRef.current[id];
      }, 2200);
    }
  };

  // توگل علاقه‌مندی‌ها
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((favId) => favId !== id));
    } else {
      setFavorites((prev) => [...prev, id]);
    }
  };

  return (
    <div className=" m-auto px-6 mt-20" dir="rtl">
      {/* سر تیتر */}
      <div className="flex items-center justify-between mb-6 w-[90%] m-auto">
        <h2 className="text-5xl md:text-2xl font-bold">انواع تیشرت</h2>
        <button
          className="border border-gray-400 px-4 py-1 rounded-full text-sm
             transition duration-300 ease-in-out
             hover:bg-gray-100 hover:text-gray-800 hover:shadow-md 
             flex gap-2 h-10 items-center -ml-10"
        >
          <GoArrowUpRight size={20} />
          مشاهده بیشتر
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: "#prevBtn",
          nextEl: "#nextBtn",
        }}
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="p-4 flex flex-col items-center">
              {/* عکس محصول + تیتر */}
              <div className="relative w-full h-80 bg-[#ececec] flex flex-col justify-center items-center rounded-xl p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-44 object-contain mb-2"
                />

                {/* تیتر اسم محصول */}

                {/* دکمه + / تیک */}
                <button
                  onClick={() => toggleCart(item.id)}
                  className="absolute bottom-4 rounded-md 
                             flex items-center justify-center text-2xl
                             transition-transform duration-300 hover:scale-125"
                >
                  {addedToCart.includes(item.id) ? (
                    <span className="text-slate-600 text-3xl">
                      {" "}
                      <GoCheck size={20} />
                    </span>
                  ) : (
                    <FiPlus className="text-gray-600 text-2xl" />
                  )}
                </button>
              </div>

              <div className="flex w-[300px]">
                <h3 className="text-center text-sm text-gray-700 font-semibold mb-4">
                  {item.title}
                </h3>
                {/* پیام موقتی */}
                {cartStatus[item.id] === "added" && (
                  <p className="text-green-600 text-sm mt-2">اضافه شد</p>
                )}
                {cartStatus[item.id] === "removed" && (
                  <p className="text-red-500 text-sm mt-2">حذف شد</p>
                )}

                {/* آیکون قلب */}
                <div className="w-full flex justify-end mt-2">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="focus:outline-none"
                    aria-label="علاقه‌مندی"
                  >
                    <Heart
                      size={20}
                      className={`transition-colors duration-300 cursor-pointer ${
                        favorites.includes(item.id)
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex justify-around gap-40">
                {/* کد محصول */}
                <p className="text-gray-400 text-sm">کد: {item.id}</p>
                {/* قیمت */}
                <p className=" font-bold text-xs">
                  {Math.floor(item.price * 50000).toLocaleString()} تومان
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* دکمه‌های اسلایدر */}
      <div className="flex justify-center gap-6 mt-6">
        <button
          id="prevBtn"
          className="border-2 hover:bg-gray-300 p-3 text-xl transition"
        >
          <MdKeyboardArrowRight />
        </button>

        <button
          id="nextBtn"
          className="border-2 hover:bg-gray-300 p-3 text-xl transition"
        >
          <MdOutlineChevronLeft />
        </button>
      </div>
    </div>
  );
}
