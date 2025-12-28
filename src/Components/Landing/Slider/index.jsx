import React, { useEffect, useRef, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heart } from "lucide-react";
import { MdOutlineChevronLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { GoCheck } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";
import { CartContext } from "../../../../src/context/CartContext";

export default function ProductSlider() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [cartStatus, setCartStatus] = useState({});
  const [favorites, setFavorites] = useState([]);
  const timeoutsRef = useRef({});

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach((t) => clearTimeout(t));
      timeoutsRef.current = {};
    };
  }, []);

  // اضافه / حذف محصول به سبد با کانتکست
  const toggleCart = (product) => {
    if (timeoutsRef.current[product.id]) {
      clearTimeout(timeoutsRef.current[product.id]);
      delete timeoutsRef.current[product.id];
    }

    const inCart = cartItems.find((item) => item.id === product.id);

    if (inCart) {
      // حذف از سبد برداشته شد تا امکان حذف از این بخش نباشد
      // removeFromCart(product.id);
      // setCartStatus((s) => ({ ...s, [product.id]: "removed" }));
      return; // از اینجا خارج شو چون حذف برداشته شده
    } else {
      addToCart(product);
      setCartStatus((s) => ({ ...s, [product.id]: "added" }));
    }

    timeoutsRef.current[product.id] = setTimeout(() => {
      setCartStatus((s) => {
        const copy = { ...s };
        delete copy[product.id];
        return copy;
      });
      delete timeoutsRef.current[product.id];
    }, 2200);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((favId) => favId !== id));
    } else {
      setFavorites((prev) => [...prev, id]);
    }
  };

  return (
    <div className="m-auto px-6 mt-20" dir="rtl">
      <div className="flex items-center justify-between mb-6 w-[90%] m-auto">
        <h2 className="text-5xl md:text-2xl font-bold">انواع تیشرت</h2>
        <button
          className="border border-gray-400 px-4 py-1 rounded-full text-sm
             transition duration-300 ease-in-out
             hover:bg-gray-100 hover:text-gray-800 hover:shadow-md 
             flex gap-2 h-10 items-center -ml-10"
          aria-label="مشاهده بیشتر"
          type="button"
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
              <div className="relative w-full h-80 bg-[#ececec] flex flex-col justify-center items-center rounded-xl p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-44 object-contain mb-2"
                />

                <button
                  onClick={() => {
                    if (!cartItems.find((i) => i.id === item.id)) {
                      toggleCart(item);
                    }
                  }}
                  disabled={!!cartItems.find((i) => i.id === item.id)}
                  className={`
                    absolute bottom-4 rounded-md 
                    flex items-center justify-center text-2xl
                    transition-transform duration-300 hover:scale-125
                    ${
                      cartItems.find((i) => i.id === item.id)
                        ? "cursor-not-allowed opacity-60 hover:scale-100"
                        : ""
                    }
                  `}
                  aria-label={
                    cartItems.find((i) => i.id === item.id)
                      ? "محصول در سبد موجود است"
                      : "افزودن به سبد خرید"
                  }
                  type="button"
                >
                  {cartItems.find((i) => i.id === item.id) ? (
                    <span className="text-slate-600 text-3xl">
                      <GoCheck size={20} />
                    </span>
                  ) : (
                    <FiPlus className="text-gray-600 text-2xl" />
                  )}
                </button>
              </div>

              <div className="flex w-[300px] flex-col items-center">
                <h3 className="text-center text-sm text-gray-700 font-semibold mb-4">
                  {item.title}
                </h3>
                {cartStatus[item.id] === "added" && (
                  <p className="text-green-600 text-sm mt-2">اضافه شد</p>
                )}
                {cartStatus[item.id] === "removed" && (
                  <p className="text-red-500 text-sm mt-2">حذف شد</p>
                )}

                <div className="w-full flex justify-end mt-2">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="focus:outline-none"
                    aria-label="علاقه‌مندی"
                  >
                    {/* <Heart
                      size={20}
                      className={`transition-colors duration-300 cursor-pointer ${
                        favorites.includes(item.id)
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    /> */}
                  </button>
                </div>
              </div>

              <div className="flex justify-around gap-40 mt-2 w-full">
                <p className="text-gray-400 text-sm">کد: {item.id}</p>
                <p className="font-bold text-xs">
                  {Math.floor(item.price * 50000).toLocaleString()} تومان
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center gap-6 mt-6">
        <button
          id="prevBtn"
          className="border-2 hover:bg-gray-300 p-3 text-xl transition"
          aria-label="اسلاید قبلی"
          type="button"
        >
          <MdKeyboardArrowRight />
        </button>

        <button
          id="nextBtn"
          className="border-2 hover:bg-gray-300 p-3 text-xl transition"
          aria-label="اسلاید بعدی"
          type="button"
        >
          <MdOutlineChevronLeft />
        </button>
      </div>
    </div>
  );
}
