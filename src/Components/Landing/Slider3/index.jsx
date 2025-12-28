// import React, { useEffect, useState, useRef, useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { GoArrowUpRight } from "react-icons/go";
// import { FaStar, FaRegStar } from "react-icons/fa";
// import { IoChevronForward, IoChevronBack } from "react-icons/io5";
// import { CartContext } from "../../../context/CartContext";

// function RatingStars({ count, onChange }) {
//   const totalStars = 5;
//   return (
//     <div className="flex gap-1 mt-2 select-none">
//       {[...Array(totalStars)].map((_, i) => {
//         const starIndex = i + 1;
//         return (
//           <button
//             key={i}
//             onClick={() => onChange(starIndex)}
//             className="focus:outline-none"
//             aria-label={`${starIndex} ستاره`}
//             type="button"
//           >
//             {starIndex <= count ? (
//               <FaStar className="text-yellow-400" />
//             ) : (
//               <FaRegStar className="text-yellow-400" />
//             )}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// export default function ProductsSlider() {
//   const [products, setProducts] = useState([]);
//   const [ratings, setRatings] = useState({});
//   const [addedStatus, setAddedStatus] = useState({});

//   const nextBtn = useRef(null);
//   const prevBtn = useRef(null);
//   const swiperRef = useRef(null);

//   const { addToCart, cartItems } = useContext(CartContext);

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products?limit=4")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }, []);

//   useEffect(() => {
//     if (swiperRef.current && nextBtn.current && prevBtn.current) {
//       swiperRef.current.params.navigation.nextEl = nextBtn.current;
//       swiperRef.current.params.navigation.prevEl = prevBtn.current;
//       swiperRef.current.navigation.destroy();
//       swiperRef.current.navigation.init();
//       swiperRef.current.navigation.update();
//     }
//   }, [products]);

//   const handleRatingChange = (id, count) => {
//     setRatings((prev) => ({ ...prev, [id]: count }));
//   };

//   const getQuantityInCart = (productId) => {
//     const item = cartItems.find((ci) => ci.id === productId);
//     return item ? item.quantity : 0;
//   };

//   const handleAddToCart = (product) => {
//     const quantityInCart = getQuantityInCart(product.id);
//     if (quantityInCart > 0) {
//       alert("این محصول قبلاً به سبد اضافه شده است.");
//       return;
//     }

//     addToCart({
//       id: product.id,
//       title: product.title,
//       price: Math.floor(product.price * 60000),
//       image: product.image,
//       quantity: 1,
//     });

//     setAddedStatus((prev) => ({ ...prev, [product.id]: true }));

//     setTimeout(() => {
//       setAddedStatus((prev) => ({ ...prev, [product.id]: false }));
//     }, 3000);
//   };

//   return (
//     <div className="relative px-6 md:px-12 lg:px-20 py-10">
//       {/* هدر و دکمه مشاهده بیشتر */}
//       <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between mb-6 m-auto w-full px-4">
//         <button
//           className="border border-gray-400 px-4 py-1 rounded-full text-sm
//            transition duration-300 ease-in-out
//            hover:bg-gray-100 hover:text-gray-800 hover:shadow-md
//            flex gap-2 h-10 items-center
//            mt-4 md:mt-0 self-start md:self-auto"
//           aria-label="مشاهده بیشتر"
//           type="button"
//         >
//           <GoArrowUpRight size={20} />
//           مشاهده بیشتر
//         </button>

//         <div className="text-right w-full md:w-auto">
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             محصولات ویژه
//           </h2>
//           <p className="text-gray-500 mt-1">جدیدترین کالکشن های فروشگاه لونا</p>
//         </div>
//       </div>

//       {/* ناوبری اسلایدر */}
//       <div className="flex justify-between items-center mt-4 px-4">
//         <button
//           ref={prevBtn}
//           className="w-10 h-10 flex items-center justify-center border-2
//                      hover:scale-110 transition text-gray-700"
//           aria-label="اسلاید قبلی"
//           type="button"
//         >
//           <IoChevronBack size={22} />
//         </button>

//         <button
//           ref={nextBtn}
//           className="w-10 h-10 flex items-center justify-center border-2
//                      hover:scale-110 transition text-gray-700"
//           aria-label="اسلاید بعدی"
//           type="button"
//         >
//           <IoChevronForward size={22} />
//         </button>
//       </div>

//       {/* اسلایدر */}
//       <Swiper
//         modules={[Navigation]}
//         spaceBetween={20}
//         slidesPerView={1.2}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 4 },
//         }}
//         onSwiper={(swiper) => (swiperRef.current = swiper)}
//         className="pb-8 mt-4"
//       >
//         {products.map((product) => {
//           const currentRating =
//             ratings[product.id] ?? Math.floor(product.rating?.rate || 0);
//           const quantityInCart = getQuantityInCart(product.id);
//           const isAdded = quantityInCart > 0;

//           return (
//             <SwiperSlide
//               key={product.id}
//               className="group bg-[#ececec] rounded-lg shadow-sm p-4 cursor-pointer transition hover:shadow-md flex flex-col relative"
//             >
//               <div className="mt-3">
//                 <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-e-md">
//                   جدید
//                 </span>
//               </div>

//               <div className="w-full h-60 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={product.image}
//                   className="object-contain w-full h-full"
//                   alt={product.title}
//                 />
//               </div>

//               <div className="flex flex-col items-end flex-1 mt-2">
//                 {/* <RatingStars
//                   count={currentRating}
//                   onChange={(c) => handleRatingChange(product.id, c)}
//                 /> */}

//                 <p className="mt-2 text-gray-600 text-sm text-right">
//                   {product.title.length > 35
//                     ? product.title.slice(0, 32) + "..."
//                     : product.title}
//                 </p>

//                 <p className="font-bold text-sm mt-1 text-gray-900">
//                   {(product.price * 60000).toLocaleString()} تومان
//                 </p>

//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   disabled={isAdded}
//                   aria-label={
//                     isAdded ? "محصول در سبد موجود است" : "افزودن به سبد خرید"
//                   }
//                   type="button"
//                   className={`
//                     w-full mt-3 py-2 rounded-lg text-sm font-semibold
//                     flex items-center justify-center gap-2
//                     transition-all duration-300
//                     ${
//                       isAdded
//                         ? "bg-blue-600 text-white cursor-not-allowed shadow-lg opacity-100 pointer-events-auto"
//                         : `bg-gray-900 text-white
//                            opacity-0 pointer-events-none
//                            group-hover:opacity-100 group-hover:pointer-events-auto
//                            hover:bg-indigo-600 hover:shadow-xl hover:scale-[1.05] active:scale-95`
//                     }
//                   `}
//                 >
//                   {addedStatus[product.id] ? (
//                     <>
//                       به سبد اضافه شد{" "}
//                       <span className="sm:hidden mt-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
//                         {quantityInCart}
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       افزودن به سبد خرید <GoArrowUpRight size={18} />
//                     </>
//                   )}
//                 </button>
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );
// }

import React, { useEffect, useState, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GoArrowUpRight } from "react-icons/go";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { CartContext } from "../../../context/CartContext";

function RatingStars({ count, onChange }) {
  const totalStars = 5;
  return (
    <div className="flex gap-1 mt-2 select-none">
      {[...Array(totalStars)].map((_, i) => {
        const starIndex = i + 1;
        return (
          <button
            key={i}
            onClick={() => onChange(starIndex)}
            className="focus:outline-none"
            aria-label={`${starIndex} ستاره`}
            type="button"
          >
            {starIndex <= count ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar className="text-yellow-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function ProductsSlider() {
  const [products, setProducts] = useState([]);
  const [ratings, setRatings] = useState({});
  const [addedStatus, setAddedStatus] = useState({});

  const nextBtn = useRef(null);
  const prevBtn = useRef(null);
  const swiperRef = useRef(null);

  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    if (swiperRef.current && nextBtn.current && prevBtn.current) {
      swiperRef.current.params.navigation.nextEl = nextBtn.current;
      swiperRef.current.params.navigation.prevEl = prevBtn.current;
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [products]);

  const handleRatingChange = (id, count) => {
    setRatings((prev) => ({ ...prev, [id]: count }));
  };

  const getQuantityInCart = (productId) => {
    const item = cartItems.find((ci) => ci.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product) => {
    const quantityInCart = getQuantityInCart(product.id);
    if (quantityInCart > 0) {
      alert("این محصول قبلاً به سبد اضافه شده است.");
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: Math.floor(product.price * 60000),
      image: product.image,
      quantity: 1,
    });

    setAddedStatus((prev) => ({ ...prev, [product.id]: true }));

    setTimeout(() => {
      setAddedStatus((prev) => ({ ...prev, [product.id]: false }));
    }, 3000);
  };

  return (
    <div className="relative px-6 md:px-12 lg:px-20 py-10">
      {/* هدر و دکمه مشاهده بیشتر */}
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between mb-6 m-auto w-full px-4">
        <button
          className="border border-gray-400 px-4 py-1 rounded-full text-sm
           transition duration-300 ease-in-out
           hover:bg-gray-100 hover:text-gray-800 hover:shadow-md 
           flex gap-2 h-10 items-center 
           mt-4 md:mt-0 self-start md:self-auto"
          aria-label="مشاهده بیشتر"
          type="button"
        >
          <GoArrowUpRight size={20} />
          مشاهده بیشتر
        </button>

        <div className="text-right w-full md:w-auto">
          <h2 className="text-3xl font-extrabold text-gray-900">
            محصولات ویژه
          </h2>
          <p className="text-gray-500 mt-1">جدیدترین کالکشن های فروشگاه لونا</p>
        </div>
      </div>

      {/* ناوبری اسلایدر */}
      <div className="flex justify-between items-center mt-4 px-4">
        <button
          ref={prevBtn}
          className="w-10 h-10 flex items-center justify-center border-2
                     hover:scale-110 transition text-gray-700"
          aria-label="اسلاید قبلی"
          type="button"
        >
          <IoChevronBack size={22} />
        </button>

        <button
          ref={nextBtn}
          className="w-10 h-10 flex items-center justify-center border-2
                     hover:scale-110 transition text-gray-700"
          aria-label="اسلاید بعدی"
          type="button"
        >
          <IoChevronForward size={22} />
        </button>
      </div>

      {/* اسلایدر */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="pb-8 mt-4"
      >
        {products.map((product) => {
          const currentRating =
            ratings[product.id] ?? Math.floor(product.rating?.rate || 0);
          const quantityInCart = getQuantityInCart(product.id);
          const isAdded = quantityInCart > 0;
          const justAdded = addedStatus[product.id];

          return (
            <SwiperSlide
              key={product.id}
              className="group bg-[#ececec] rounded-lg shadow-sm p-4 cursor-pointer transition hover:shadow-md flex flex-col relative"
            >
              <div className="mt-3">
                <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-e-md">
                  جدید
                </span>
              </div>

              <div className="w-full h-60 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  className="object-contain w-full h-full"
                  alt={product.title}
                />
              </div>

              <div className="flex flex-col items-end flex-1 mt-2">
                {/* <RatingStars
                  count={currentRating}
                  onChange={(c) => handleRatingChange(product.id, c)}
                /> */}

                <p className="mt-2 text-gray-600 text-sm text-right">
                  {product.title.length > 35
                    ? product.title.slice(0, 32) + "..."
                    : product.title}
                </p>

                <p className="font-bold text-sm mt-1 text-gray-900">
                  {(product.price * 60000).toLocaleString()} تومان
                </p>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={isAdded}
                  aria-label={
                    isAdded
                      ? "محصول در سبد موجود است"
                      : " به سبد خرید اضافه شد "
                  }
                  type="button"
                  className={`
                    w-full mt-3 py-2 rounded-lg text-sm font-semibold
                    flex items-center justify-center gap-2
                    transition-all duration-300
                    ${
                      isAdded
                        ? justAdded
                          ? "bg-gray-900 text-white cursor-not-allowed shadow-lg opacity-100 pointer-events-auto"
                          : "bg-gray-900 text-white cursor-not-allowed shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto hover:bg-indigo-600 hover:shadow-xl hover:scale-[1.05] active:scale-95"
                        : `bg-gray-900 text-white
                           opacity-0 pointer-events-none
                           group-hover:opacity-100 group-hover:pointer-events-auto
                           hover:hover:shadow-xl hover:scale-[1.05] active:scale-95`
                    }
                  `}
                >
                  {justAdded ? (
                    <>
                      به سبد اضافه شد{" "}
                      <span className="sm:hidden mt-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                        {quantityInCart}
                      </span>
                    </>
                  ) : (
                    <>
                      افزودن به سبد خرید <GoArrowUpRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
